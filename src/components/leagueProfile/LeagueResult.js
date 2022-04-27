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
    gridItem: {
        paddingLeft: '10px',
        paddingTop: '3px',
        display: 'flex',
        alignItems: 'center'
    },
    cardButton: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
    },
    imgContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: '15px',
        alignItems: 'center'
    },
    image: {
        maxHeight: '100px'
    }
}));

const LeagueResult = ({ league, id }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    const getLeague = () => {
        // console.log(id)
        navigate(`/leagues/${id}`)
    }

    return (
        <Card  
            className={classes.cardContainer}
            style={{ border: 'none', boxShadow: 'none', cursor: 'pointer' }}
            onClick={getLeague}
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={4}>
                    <div className={classes.imgContainer}>
                        <img className={classes.image} src={`/images/leagues/${league.name}.png`} alt={`${league.name}`}></img>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Grid item sm={12} className={classes.gridItem}>
                        <Typography variant='h5' style={{ padding: '5px' }}>{league.name}</Typography>
                        <Typography variant='body1'>{league.description}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2} >
                    <CardActions className={classes.cardButton}>
                        <Button onClick={getLeague} size="small">View League</Button>
                    </CardActions>
                </Grid>
                
            </Grid>
            
        </Card>
    )
}

export default LeagueResult;
