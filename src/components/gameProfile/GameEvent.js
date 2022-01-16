import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PlayerThumb from "../playerProfile/PlayerThumb";

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
    }
}));

const GameEvent = ({ event }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/fights/${event._id}`)
    }

    // console.log(event.players);
    
    return (
        <Card className={classes.gameCard} >
            <Grid container>
                <Grid item xs={10}>
                    <Grid item xs={12}>
                        <Typography>{event.fightType}</Typography>
                    </Grid>
                    
                        {event.players.length === 2 &&
                            <Grid container>
                                <Grid item className={classes.gridItem} sm={5}>
                                    <PlayerThumb player={event.players[0]} />
                                </Grid>
                                <Grid item className={classes.gridItem} sm={2}>
                                    <Typography>VS</Typography>
                                </Grid>
                                <Grid item className={classes.gridItem} sm={5}>
                                    <PlayerThumb player={event.players[1]} />
                                </Grid>
                            </Grid>
                        }
                        {event.players.length === 0 &&
                            <Grid container>
                                <Grid item>
                                    <Typography>{event.description}</Typography>
                                </Grid>
                            </Grid>
                        }
                    
                    
                </Grid>
                <Grid item xs={2}>
                    <CardActions className={classes.cardButton}>
                        <Button onClick={handleClick} size="small">View Fight</Button>
                    </CardActions>
                </Grid>
            </Grid>

        </Card>
    )
}


export default GameEvent;
