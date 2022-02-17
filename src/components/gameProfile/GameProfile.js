import { Button, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { 
    getGame as getGameAPI 
} from "../../api/games/gamesApi";

import TeamCard from "../FightCard/TeamCard";
import DateDisplay from "../FightCard/DateDisplay";
import GameEvent from "./GameEvent";
import Comments from "../comments/Comments";
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
        margin: '5px'
    },
    gameDetailsTitle: {
        margin: '15px',
        fontSize: '2em'
    },
    eventContainer: {
        marginBottom: '5px'
    },
    adminBtns: {
        marginTop: '10px'
    }
}));

const GameProfile = () => {
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
            setGame(data.data);
            setFights(data.data.fights);
            console.log(data.data);
            setIsFetching(false);
        });
    }, [gameID]);

    

    //admin tools event handlers and states

    //create fight/event dialog state and open/close functions
    const [openCreateFight, setOpenCreateFight] = useState(false);
    //create fight/event dialog state and open/close functions
    const [openEditGame, setOpenEditGame] = useState(false);

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
            {!isFetching &&
                <>
                    
                    <Paper className={classes.dateSeasonContainer}>
                        <DateDisplay date={new Date(game.date.split('T')[0]).toDateString()} season={game.season.season} />
                    </Paper>
     
                    <TeamCard fight={game} showGameLink={false} />

                    {game.description !== "" &&
                        <Typography>{game.description}</Typography>
                    }

                    <Typography className={classes.gameDetailsTitle} align='center'>Game Details</Typography>
                    
                    {fights.map(fight => {
                        return (
                            <Paper className={classes.eventContainer} key={fight._id}>
                                <GameEvent key={fight._id} event={fight} />
                            </Paper>
                        )
                    })}
                    <Typography>Administration Tools:</Typography>
                    <Button className={classes.adminBtns} onClick={handleClickOpenCreateFight} fullWidth variant='contained'>Add Fight/Event</Button>
                    <Button className={classes.adminBtns} onClick={handleClickOpenEditGame} fullWidth variant="contained">Edit Game</Button>
                    <CreateFightDialog gameFights={fights} setGameFights={setFights} game={game} open={openCreateFight} handleClose={handleCloseCreateFight} />
                    <EditGameDialog fights={fights} setFights={setFights} game={game} open={openEditGame} handleClose={handleCloseEditGame} />
                    <Comments className={classes.comments} model='games' recordId={game._id} comments={game.comments} />
                </>
            }
        </>
    )
}

export default GameProfile;
