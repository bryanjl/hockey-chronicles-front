import { Button, CardActions, Grid, makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

// import PlayerCard from "../FightCard/PlayerCard";
import GamePlayer from "./GamePlayer";

const useStyles = makeStyles((theme) => ({
    gameCard: {
        padding: '10px',
        display: 'flex',
        margin: '10px'
    },
    cardButton: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventContainer: {
        display: 'flex',
        padding: '15px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'        
    },
    // eventDescription: {
    //     fontSize: '1.3em'
    // }
}));

const GameEvent = ({ event }) => {
    console.log(event)
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/fights/${event._id}`)
    }
    
    return (
        <>
            <Grid container>
                <Grid item xs={10}>                    
                        {event.players.length === 2 &&
                            <Grid container>
                                <Grid item className={classes.gridItem} xs={5}>
                                    <GamePlayer player={event.players[0]} />
                                </Grid>
                                <Grid item className={classes.gridItem} xs={2}>
                                    <Typography variant='h5'>VS</Typography>
                                </Grid>
                                <Grid item className={classes.gridItem} xs={5}>
                                    <GamePlayer player={event.players[1]} />
                                </Grid>
                            </Grid>
                        }
                        
                </Grid>
                {event.players.length === 0 &&
                            
                                <Grid item xs={10} >
                                    <div className={classes.eventContainer}>
                                    <Typography variant='h5'>{event.eventDescription}</Typography>
                                    </div>
                                </Grid>
                            
                        }
                <Grid item xs={2}>
                    <CardActions className={classes.cardButton}>
                        <Button onClick={handleClick} size="small">View {event.fightType === 'Fight' ? 'Fight' : 'Event'}</Button>
                    </CardActions>
                </Grid>
            </Grid>

        </>
    )
}


export default GameEvent;
