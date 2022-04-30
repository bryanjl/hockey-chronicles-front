import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import TeamCard from "../FightCard/TeamCard";
import DateDisplay from "../FightCard/DateDisplay";
import GameEvent from "./GameEvent";
import Comments from "../comments/Comments";
//api
import { getGame as getGameAPI } from "../../api/games/gamesApi";
//user context
import { UserContext } from "../../contexts/UserContext";
//admin tool components
import CreateFightDialog from "../create/createFight/CreateFightDialog";
import EditGameDialog from "../adminTools/edit/EditGameDialog";

const useStyles = makeStyles((theme) => ({
    dateSeasonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '15px',
        marginTop: '15px',
        borderLeft: '3px solid black',
        borderBottom: '3px solid black',
        borderTop: '3px solid #F74902',
        borderRight: '3px solid #F74902',
    },
    gameDetailsTitle: {
        margin: '15px',
        fontSize: '2em'
    },
    gameDescriptionText: {
        marginLeft: '15px',

    },
    eventContainer: {
        marginBottom: '5px'
    },
    adminBtns: {
        marginTop: '10px'
    }
}));

const GameProfile = () => {
    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

    let { gameID } = useParams();

    const classes = useStyles();

    //state for game data
    const [game, setGame] = useState({});
    //state for fights/events in game
    const [fights, setFights] = useState([]);

    //state for fetching from API
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getGameAPI(gameID).then(data => {
            console.log(data)
            setGame(data.data);
            setFights(data.data.fights);
            // console.log(data.data);
            setIsFetching(false);
        });
    }, [gameID]);

    

    //admin tools event handlers and states

    //create fight/event dialog state and open/close functions
    const [openCreateFight, setOpenCreateFight] = useState(false);
    //create fight/event dialog state and open/close functions
    const [openEditGame, setOpenEditGame] = useState(false);
    
    //set game state on update
    const updateGameData = (newGameData) => {
        setGame(newGameData);
    }
    const handleClickOpenCreateFight = () => {
        setOpenCreateFight(true);
    };

    const handleCloseCreateFight = () => {
        setOpenCreateFight(false);
    };

    const handleClickOpenEditGame = () => {
        setOpenEditGame(true);
    };

    const handleCloseEditGame = () => {
        setOpenEditGame(false);
    };

    return ( 
        <>
        {/* <Typography variant="h4" style={{marginTop: '15px', backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px'}}>Game</Typography> */}
            {!isFetching &&
                <>
                    
                    <Paper className={classes.dateSeasonContainer}>
                        <DateDisplay date={new Date(game.date.split('T')[0]).toDateString()} season={game.season.season} />
                        <TeamCard fight={game} showGameLink={false} home={game.homeTeam} />
                        <Typography 
                            variant='body1' 
                            className={classes.gameDescriptionText}
                            style={{ margin: '15px' }}
                        >
                            {game.description}
                        </Typography>
                    </Paper>
     
                    

                    {game.description !== "" &&
                        <>
                            <Typography className={classes.gameDetailsTitle}>Game Description</Typography>
                            <Typography className={classes.gameDescriptionText}>{game.description}</Typography>
                        </>
                    }

                    <Typography variant='h5' style={{marginBottom: '15px', marginTop: '15px', backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px'}}>Game Details</Typography>
                    
                    {fights.map(fight => {
                        return (
                            <Paper 
                                className={classes.eventContainer} 
                                key={fight._id}
                                style={{ border: '1px solid black', boxShadow: 'none' }}
                            >
                                <GameEvent key={fight._id} event={fight} />
                            </Paper>
                        )
                    })}
                    {(user.role === 'admin' || user.role ==='super') &&
                        <>
                            <Typography>Administration Tools:</Typography>
                            <Button className={classes.adminBtns} onClick={handleClickOpenCreateFight} fullWidth variant='contained'>Add Fight/Event</Button>
                            <Button className={classes.adminBtns} onClick={handleClickOpenEditGame} fullWidth variant="contained">Edit Game</Button>    
                        </>
                    }
                    

                    <CreateFightDialog gameFights={fights} setGameFights={setFights} game={game} open={openCreateFight} handleClose={handleCloseCreateFight} />
                    <EditGameDialog updateGameData={updateGameData} fights={fights} setFights={setFights} game={game} open={openEditGame} handleClose={handleCloseEditGame} />

                    <Comments className={classes.comments} model='games' recordId={game._id} comments={game.comments} />
                </>
            }
        </>
    )
}

export default GameProfile;
