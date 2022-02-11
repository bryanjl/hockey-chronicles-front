import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { 
    getGame as getGameAPI 
} from "../../api/games/gamesApi";

import TeamCard from "../FightCard/TeamCard";
import DateDisplay from "../FightCard/DateDisplay";
import GameEvent from "./GameEvent";
import Comments from "../comments/Comments";

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
    }
}));

const GameProfile = () => {
    let { gameID } = useParams();

    const classes = useStyles();

    //state for game data
    const [game, setGame] = useState({});

    //state for fetching from API
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getGameAPI(gameID).then(data => {
            setGame(data.data);
            setIsFetching(false);
        });
    }, [gameID]);

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
                    
                    {game.fights.map(fight => {
                        return (
                            <Paper className={classes.eventContainer} key={fight._id}>
                                <GameEvent key={fight._id} event={fight} />
                            </Paper>
                        )
                    })}
                    <Comments className={classes.comments} model='games' recordId={game._id} comments={game.comments} />
                </>
            }
        </>
    )
}

export default GameProfile;
