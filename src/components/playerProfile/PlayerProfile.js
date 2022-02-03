import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlayerTabs from "./PlayerTabs";
// import GameEvent from "../gameProfile/GameEvent";
import WinLossDrawChart from "../charts/WinLossDrawChart";
import { 
    getPlayer as getPlayerAPI 
} from "../../api/players/playersApi";
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

//utils
import { checkIfInitialOutcome, checkIfDrawOutcome, checkOutcomeWinner } from "../../utils/checkFightOutcome";

const useStyles = makeStyles((theme) => ({
    headshotImg: {
        maxHeight: '100px',
        width: 'auto'
    },
    paperContainer: {
        padding: '15px'
    }
}));

const PlayerProfile = () => {
    let { playerID } = useParams();

    const classes = useStyles();

    //state for player data
    const [player, setPlayer] = useState({});

    //state for current tab
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetchng from API
    const [isFetching, setIsFetching] = useState(true); 

    useEffect(() => {
        setIsFetching(true);
        getPlayerAPI(playerID).then(data => {
            console.log(data);
            data.data.fights.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            console.log(checkIfInitialOutcome(data.data.fights[0].outcome))
            // console.log(data.data.fights);
            setPlayer(data.data);
            setIsFetching(false);
        });
    }, [playerID]);

    const setTab = (value) => {
        setSelectedTab(value);
    }

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

                
                <TableContainer sx={{maxHeight: 440, overflow: 'hidden'}} component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">League</TableCell>
                            <TableCell align="right">Game</TableCell>
                            <TableCell align="right">Opponent</TableCell>
                            <TableCell align="right">Outcome</TableCell>
                            <TableCell align="right">Action</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {selectedTab === 0 && 
                            player.fights.map((fight) => (
                            <TableRow
                                key={fight._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {new Date(fight.date.split('T')[0]).toLocaleString().split(',')[0]}
                                </TableCell>
                                <TableCell align="right"><Link to={`/leagues/${fight.league.id}`}>{fight.league.league}</Link></TableCell>
                                <TableCell align="right"><Link to={`/games/${fight.game}`} >{fight.teams[0].city}-{fight.teams[1].city}</Link></TableCell>
                                <TableCell align="right">{player.lastName === fight.players[0].lastName ? <Link to={`/players/${fight.players[1].id}`} >{`${fight.players[1].firstName} ${fight.players[1].lastName}`}</Link> : <Link to={fight.players[0].id}>{`${fight.players[0].firstName} ${fight.players[0].lastName}`}</Link>}</TableCell>
                                <TableCell align="right">
                                    {
                                        outcomeValue(fight.outcome, player._id)
                                    }
                                </TableCell>
                                <TableCell align="right">{fight.actionRating.average === 0 ? `` : fight.actionRating.average}</TableCell>
                                <TableCell align="right"><Link to={`/fights/${fight._id}`} >View Fight</Link></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </>
            }            
        </>
    )
}

export default PlayerProfile;
