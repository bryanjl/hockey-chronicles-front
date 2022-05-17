import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import PlayerTabs from "./PlayerTabs";
// import PlayerFightTable from "./PlayerFightTable";
import Row from "./Row";
import EditPlayerDialog from "../adminTools/edit/EditPlayerDialog";
import WinLossDrawChart from "../charts/WinLossDrawChart";
import ActionRatingChart from "../charts/ActionRatingChart";
import CircularLoadingAnimation from "../feedback/CircularLoadingAnimation";
//api
import { getPlayer as getPlayerAPI } from "../../api/players/playersApi";
//user context
import { UserContext } from "../../contexts/UserContext";
//utils
import { checkIfInitialOutcome, checkIfDrawOutcome, checkOutcomeWinner } from "../../utils/checkFightOutcome";

let imgUrl;
if(process.env.NODE_ENV === 'development'){
    imgUrl = 'http://localhost:5000';
} else {
    imgUrl = 'https://hockey-chronicles-api.herokuapp.com';
}

const useStyles = makeStyles((theme) => ({
    imgContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headshotImg: {
        maxHeight: '100px',
        width: 'auto'
    },
    paperContainer: {
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px',
        borderBottom: '3px solid black',
        borderLeft: '3px solid black',
        borderTop: '3px solid #F74902',
        borderRight: '3px solid #F74902',
    },
    tableContainer: {
        overflow: 'auto',
        marginBottom: '25px',
        maxWidth: '100%'
    },
    chartContainer: {
        marginTop: '15px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    actionRatingContainer: {
        border: '1px solid black'
    }
}));

const PlayerProfile = () => {
    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

    let { playerID } = useParams();

    const classes = useStyles();

    //state for player data
    const [player, setPlayer] = useState({});
    const [playerFights, setPlayerFights] = useState([]);

    //state for current tab
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetchng from API
    const [isFetching, setIsFetching] = useState(true);
    
    //state for player rivals
    const [playerRivals, setPlayerRivals] = useState([]);

    useEffect(() => {
        setIsFetching(true);
        getPlayerAPI(playerID).then(data => {
            setPlayer(data.data.player);
            setPlayerFights(data.data.fights);
            sortFights(data.data.fights);
            setIsFetching(false); 
        });
        //eslint-disable-next-line
    }, [playerID]);

    const setTab = (value) => {
        setSelectedTab(value);
        if(value === 1) {
            getRivals(playerFights);
        }
        // sortFights();
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


    //this could be a custom hook
    const getRivals = (allFights) => {
        let unsortedRivals = {};
        allFights.forEach(fight => {
            if(fight.players[0].lastName !== player.lastName){  
                if(!unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`]){
                    unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`] = 1;    
                } else {
                    unsortedRivals[`${fight.players[0].firstName} ${fight.players[0].lastName}`] += 1;
                }
            }
            
            if(fight.players[1].lastName !== player.lastName){
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

        setPlayerRivals(sortedRivals);
    }

    const [sortedFights, setSortedFights] = useState([]);

    const sortFights = (allFights) => {
        let sortFights = [];
        let seasonArr = [];

        seasonArr[0] = allFights[0];

        for(let i = 1; i < allFights.length; i++){
            if(allFights[i].season.season === seasonArr[0].season.season){
                seasonArr.push(allFights[i]);
            } else {
                sortFights.push(seasonArr);
                seasonArr = [];
                seasonArr[0] = allFights[i];
            }
        }

        sortFights.push(seasonArr);

        setSortedFights(sortFights);
    }

    //administration tools
    const [openEditPlayer, setOpenEditPlayer] = useState(false);

    const handleEditPlayerOpen = () => {
        setOpenEditPlayer(true);
    }

    const handleEditPlayerClose = () => {
        setOpenEditPlayer(false);
    }

    return (
        <>
            {isFetching &&
                <CircularLoadingAnimation />
            }

            {!isFetching && 
                <>
                    <Paper className={classes.paperContainer}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography variant='h3'>{player.firstName} {player.lastName}</Typography>
                            {/* </Grid>
                            <Grid align='left' item xs={8}> */}
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
                                <div className={classes.imgContainer}>
                                    <img className={classes.headshotImg} src={player.playerImageFile ? `${imgUrl}/uploads/players/${player.playerImageFile}` : `/no-headshot.jpg`} alt={`${player.firstName} ${player.lastName}`} />
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    
                    {(user.role === 'admin' || user.role === 'super') &&
                        <>
                            <Typography>Administration Tools:</Typography>
                            <Button onClick={handleEditPlayerOpen} fullWidth variant='contained'>Edit Player Details</Button>
                            <EditPlayerDialog player={player} setPlayer={setPlayer} open={openEditPlayer} handleClose={handleEditPlayerClose} />    
                        </>
                    }

                    <div className={classes.chartContainer}>
                        <WinLossDrawChart wins={player.wins} draws={player.draws} losses={player.losses} />
                        <div>
                            <Typography style={{textAlign: 'center', marginBottom: '25px'}} variant='h5'>Action Rating</Typography>
                            <ActionRatingChart actionRating={player.actionRating.average} />
                        </div> 
                    </div>
                    

                <PlayerTabs setTab={setTab} currTab={selectedTab} />

                {selectedTab === 0 && sortedFights.length !== 0 &&
                    <>
                    
                        
                            <TableContainer className={classes.tableContainer} component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Season</TableCell>
                                        <TableCell />                                  
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {sortedFights.map((fight) => (
                                        
                                        <Row key={fight._id} row={fight} player={player} outcomeValue={outcomeValue} />
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> 
                    {/* {/* // <PlayerFightTable seasonData={playerFights} /> */}
                        

                   
                    </>
                }

                {selectedTab === 1  &&
    
                    <TableContainer sx={{maxHeight: 440, overflow: 'hidden', marginBottom: '25px'}} component={Paper}>
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


