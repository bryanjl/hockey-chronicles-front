import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { 
    getGame as getGameAPI 
} from "../../api/games/gamesApi";

import TeamCard from "../teamProfile/TeamCard";
import DateDisplay from "../date/DateDisplay";
import LeagueDisplay from "../leagueProfile/LeagueDisplay";
import SeasonDisplay from "../seasonProfile/SeasonDisplay";
import GameEvent from "./GameEvent";
import Comments from "../comments/Comments";

const useStyles = makeStyles((theme) => ({
    teamContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '15px',
        margin: '5px'
    },
    dateSeasonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '15px',
        margin: '5px'
    },
    gameEventContainer: {
        backgroundColor: 'gray'
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
            // console.log(data);
            setGame(data.data);
            setIsFetching(false);
        });
    }, [gameID]);

    return ( 
        <React.Fragment>
            <h1>Game Profile Page</h1>
            
            {!isFetching &&
                <React.Fragment>
                    <Paper className={classes.dateSeasonContainer}>
                        <Grid container>
                            <Grid item sm={6}>
                                <DateDisplay date={game.date}  />
                                <SeasonDisplay season={game.season.season} />
                            </Grid>
                            <Grid item sm={6}>
                                <LeagueDisplay league={game.league} />
                            </Grid>
                        </Grid>
                    </Paper>
                
                    <Paper className={classes.teamContainer}>
                        <TeamCard team={game.teams[0]} />
                        <Typography>VS</Typography>
                        <TeamCard team={game.teams[1]} />
                    </Paper>

                    <Paper className={classes.gameEventContainer}>
                        <Typography>Game Events</Typography>
                        
                        {game.fights.map(fight => {
                            // console.log(fight);
                            
                            return (
                                <GameEvent key={fight._id} event={fight} />
                            )
                        })}
                    </Paper>

                    <Comments className={classes.comments} model='games' recordId={game._id} comments={game.comments} />
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default GameProfile
