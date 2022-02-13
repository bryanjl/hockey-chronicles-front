import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerTabs from "./PlayerTabs";
// import GameEvent from "../gameProfile/GameEvent";
import WinLossDrawChart from "../charts/WinLossDrawChart";
import { 
    getPlayer as getPlayerAPI 
} from "../../api/players/playersApi";
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import Row from "./Row";

//utils
import { checkIfInitialOutcome, checkIfDrawOutcome, checkOutcomeWinner } from "../../utils/checkFightOutcome";


const useStyles = makeStyles((theme) => ({
    headshotImg: {
        maxHeight: '100px',
        width: 'auto'
    },
    paperContainer: {
        padding: '15px'
    },
    tableContainer: {
        overflow: 'auto'
    }
}));

const PlayerProfile = () => {
    let { playerID } = useParams();

    const classes = useStyles();

    //state for player data
    const [player, setPlayer] = useState({});

    //fights organized by season [[1994-1995], [1995-1996], [etc]]
    const [sortedFights, setSortedFights] = useState([]);

    //state for current tab
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetchng from API
    const [isFetching, setIsFetching] = useState(true);
    
    //state for player rivals
    const [playerRivals, setPlayerRivals] = useState([]);

    useEffect(() => {
        setIsFetching(true);
        getPlayerAPI(playerID).then(data => {
            // console.log(data);
            data.data.fights.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            // console.log(checkIfInitialOutcome(data.data.fights[0].outcome))
            // console.log(data.data.fights);
            setPlayer(data.data);
            getRivals(data.data.fights);
            sortFights(data.data.fights);
            setIsFetching(false);    
        });
        
        //eslint-disable-next-line
    }, []);

    const setTab = (value) => {
        setSelectedTab(value);
    }

    //check to see if player had won lost, drawed or if there is no votes for outcome chart
    const outcomeValue = (outcomeObj, playerId) => {
        if(checkIfInitialOutcome(outcomeObj)){
            return '';
        } else if (checkIfDrawOutcome(outcomeObj)) {
            return 'Draw';
        } else {
            if(checkOutcomeWinner(outcomeObj, playerId)){
                return 'Win';
            }         
            return 'Loss';
        }
    }

    //organize fights into seasons
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


    //this could be a custom hook
    const getRivals = (allFights) => {
        let unsortedRivals = {};
        allFights.forEach(fight => {
            if(fight.players[0].lastName !== player.lastName){
                // console.log('here');
                if(!unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`]){
                    unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`] = 1;    
                } else {
                    unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`] += 1;
                }
                
            } else {
                if(!unsortedRivals[`${fight.players[1].firstName} ${fight.players[1].lastName}`]){
                    unsortedRivals[`${fight.players[1].firstName} ${fight.players[1].lastName}`] = 1;    
                } else {
                    unsortedRivals[`${fight.players[1].firstName} ${fight.players[1].lastName}`] += 1;
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
        // console.log(sortedRivals);
        setPlayerRivals(sortedRivals);
    }

    return (
        <>
            {!isFetching && 
                <>
                    <Paper className={classes.paperContainer}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant='h3'>{player.firstName} {player.lastName}</Typography>
                            </Grid>
                            <Grid align='left' item xs={8}>
                                <Typography>
                                    Position: {player.position}
                                </Typography>
                                <Typography>
                                    Shoots: {player.shoots === 'L' ? 'Left' : 'Right'}
                                </Typography>
                                <Typography>
                                    Height: {player.height}
                                </Typography>
                                <Typography>
                                    Weight: {player.weight}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <img className={classes.headshotImg} src='/no-headshot.jpg' alt='no-headshot' />
                            </Grid>
                            
                            <Grid align='center' item xs={12}>
                                <WinLossDrawChart wins={player.wins} draws={player.draws} losses={player.losses} />
                            </Grid>
                        </Grid>
                    </Paper>

                <PlayerTabs setTab={setTab} currTab={selectedTab} />

                {selectedTab === 0 &&
                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell align='left'>Season</TableCell>
                                <TableCell align="right">Overall  Action</TableCell>
                                
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {sortedFights.map((fight) => (
                                
                                <Row key={fight._id} row={fight} player={player} outcomeValue={outcomeValue} />
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
                                <TableCell>Player</TableCell>
                                <TableCell align="right">Fights</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { 
                                playerRivals.map((rival) => (
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

export default PlayerProfile;
