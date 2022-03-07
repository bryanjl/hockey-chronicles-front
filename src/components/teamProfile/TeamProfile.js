import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamRow from "./TeamRow";
import TeamGameRow from "./TeamGameRow";
import TeamTabs from "./TeamTabs";
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import LeagueDisplay from "../leagueProfile/LeagueDisplay";
// import SeasonSelect from "../seasonProfile/SeasonSelect";

//Team API
import { 
    getTeam as getTeamAPI
} from "../../api/teams/teamsApi";

const useStyles = makeStyles((theme) => ({
    teamImg: {
        maxHeight: '150px'
    }
}));



const TeamProfile = () => {

    //teamId from URL params
    let { teamID } = useParams();

    //styles
    const classes = useStyles();

    //teamProfile State for team DATA
    const [team, setTeam] = useState({});
    //state for rivals
    const [teamRivals, setTeamRivals] = useState({});
    //state fro sorted fights
    const [sortedFights, setSortedFights] = useState([]);
    //state for sorted games
    const [sortedGames, setSortedGames] = useState([]);

    //state for tabs
    const [selectedTab, setSelectedTab] = useState(0);

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(data => {
            console.log(data);
            
            data.data.games.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            data.data.fights = data.data.fights.filter((fight) => {
                return fight.players.length !== 0;
            })
            data.data.fights.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            setTeam(data.data);
            
            sortFights(data.data.fights);
            sortGames(data.data.games);
            
            getRivals(data.data.games);
            setIsFetching(false);
        });
        //eslint-disable-next-line
    }, [teamID]);

    const setTab = (value) => {
        setSelectedTab(value);
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
                    // console.log(fight.actionRating.average, typeof fight.actionRating.average)
                    actionAccum.average += Number.parseFloat(fight.actionRating.average, 10);
                    actionAccum.votes += 1;
                }
            } else {
                // console.log(actionAccum);
                let action = 0;
                if(actionAccum.average !== 0){
                    action = (actionAccum.average / actionAccum.votes)
                }
                // console.log(action);
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
        // console.log(fightArr);
        setSortedFights(fightArr);
    }

    const sortGames = (allGames) => {        
        //organize games into seasons by array [[1994-1995], [1995-1996], [etc]]
        //must be a sorted array
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

    const getRivals = (allGames) => {
        let unsortedRivals = {};
        allGames.forEach(game => {
            // console.log(game.fights.length)
            if(game.teams[0].city !== team.city){
                if(!unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`]){
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] = game.fights.length;    
                } else {
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] += game.fights.length;
                }
                
            } else if(game.teams[1].city !== team.city) {
                if(!unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`]){
                    unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`] = game.fights.length;    
                } else {
                    unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`] += game.fights.length;
                }
            }
        });
        let sortedRivals = [];
        for(let item in unsortedRivals) {
            sortedRivals.push([item, unsortedRivals[item]]);
        }
        sortedRivals.sort((a, b) => {
            return b[1] - a[1];
        });
        setTeamRivals(sortedRivals);
    }

    return (
        <>
            {!isFetching && 
            <>
                <Grid container>
                    <Grid item xs={12}>
                        
                        <Typography variant='h3'>{team.fullName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img className={classes.teamImg} src={`/images/teams/${team.city}${team.name}.png`} alt={`${team.fullName}`} />
                    </Grid>
                    <Grid item xs={6}>
                        <LeagueDisplay league={team.league} />
                    </Grid>
                </Grid>
                
                <TeamTabs setTab={setTab} currTab={selectedTab} />
{/* 
                {selectedTab !== 2 && 
                    <SeasonSelect seasonSelect={getSeason} />
                } */}


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
                                
                                <TeamGameRow key={game._id} row={game} team={team} />
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
                            {sortedFights.map((fight) => (
                                
                                <TeamRow key={fight._id} row={fight} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                }

                {selectedTab === 2 && 
                    <TableContainer sx={{maxHeight: 440, overflow: 'hidden'}} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Team</TableCell>
                                <TableCell align="right">Fights</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { 
                                teamRivals.map((rival) => (
                                <TableRow
                                    key={rival[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {rival[0]}
                                    </TableCell>
                                    <TableCell align="right">{rival[1]}</TableCell>
                                </TableRow>
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

export default TeamProfile;
