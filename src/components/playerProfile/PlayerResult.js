import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: '100%',
        marginTop: '15px',
    },
    gridContainer: {
        height: '100%'
    },
    cardButton: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
    }
}));

const PlayerResult = ({ player, id }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    const getPlayer = () => {
        // console.log(id)
        navigate(`/players/${id}`)
    }

    return (
        <Card  
            className={classes.cardContainer}
            style={{ border: 'none', boxShadow: 'none', cursor: 'pointer' }}
            onClick={getPlayer}
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={10}>
                    <Typography variant='h5' style={{ padding: '5px' }}>{player.firstName} {player.lastName}</Typography>
                    <Typography variant='body1' style={{ padding: '5px' }}>{player.position}</Typography>
                </Grid>
                <Grid item xs={2} >
                    <CardActions className={classes.cardButton}>
                        <Button onClick={getPlayer} size="small">View Player</Button>
                    </CardActions>
                </Grid>
            </Grid>
        </Card>
    )
}

export default PlayerResult;