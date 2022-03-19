import { makeStyles } from "@material-ui/core";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueFightRow from "./LeagueFightRow";
import LeagueGameRow from "./LeagueGameRow";
import LeagueDisplay from "./LeagueDisplay";
import LeagueTabs from "./LeagueTabs";

// api
import { getLeague as getLeagueAPI } from "../../api/leagues/leaguesApi";


const useStyles = makeStyles((theme) => ({

}));


const LeagueProfile = () => {
    const classes = useStyles();
    let { leagueID } = useParams();

    //state for league data
    const [league, setLeague] = useState({});
    const [sortedGames, setSortedGames] = useState([]);
    const [sortedFights, setSortedFights] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetching from server
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getLeagueAPI(leagueID).then(data => {
            console.log(data);
            setLeague(data.data);
            sortGames(data.data.games);
            sortFights(data.data.fights);
            setIsFetching(false);
        });
    }, [leagueID]);

    const sortGames = (allGames) => {        
        //organize games into seasons by array [[1994-1995], [1995-1996], [etc]]
        //must be a sorted array
        console.log(allGames);
        if(allGames.length > 0){
            let gameArr = [];
            let currSeason = allGames[0].season.season;
            let seasonArr = [];

            allGames.forEach(game => {
                if (game.season.season === currSeason) {
                    seasonArr.push(game);

                } else {

                    gameArr.push(seasonArr);
                    seasonArr = [];
        
                    currSeason = game.season.season;
                    seasonArr.push(game);
                }
            });

            gameArr.push(seasonArr);
    
            setSortedGames(gameArr);
        }
    }

    const sortFights = (allFights) => {        
        //organize fights into seasons by array [[1994-1995], [1995-1996], [etc]]
        //must be a sorted array
        let fightArr = [];
        let currSeason = allFights[0].season.season;
        let seasonArr = [];
        let actionAccum = {
            average: 0,
            votes: 0
        }
        allFights.forEach(fight => {
            if (fight.season.season === currSeason) {
                seasonArr.push(fight);
                if(fight.actionRating.average !== 0){
                    actionAccum.average += Number.parseFloat(fight.actionRating.average, 10);
                    actionAccum.votes += 1;
                }
            } else {
                let action = 0;
                if(actionAccum.average !== 0){
                    action = (actionAccum.average / actionAccum.votes)
                }
                seasonArr.push(action);
                fightArr.push(seasonArr);
                seasonArr = [];
                actionAccum = {
                    average: 0,
                    votes: 0
                }       
                currSeason = fight.season.season;
                seasonArr.push(fight);
            }
        });
        let action = 0;
        if(actionAccum.average !== 0){
            action = (actionAccum.average / actionAccum.votes)
        }
        seasonArr.push(action);
        fightArr.push(seasonArr);
        setSortedFights(fightArr);
    }

    return (
        <>
            { !isFetching &&
                <>
                    <LeagueDisplay league={league} />
                    <LeagueTabs currTab={selectedTab} setTab={setSelectedTab} />
                    {selectedTab === 0 &&
                        <TableContainer className={classes.tableContainer} component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align='left'>Season</TableCell>
                                    {/* <TableCell align="right">Overall  Action</TableCell> */}
                                    
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedGames.map((game) => (
                                        
                                        <LeagueGameRow key={game._id} row={game} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    {selectedTab === 1 &&
                        <TableContainer className={classes.tableContainer} component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align='left'>Season</TableCell>
                                    {/* <TableCell align="right">Overall  Action</TableCell> */}
                                    
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedFights.map((game) => (
                                        
                                        <LeagueFightRow key={game._id} row={game} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                    
                </>
            }
        </>
    )
}

export default LeagueProfile;
