import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: '100%',
        height: '150px',
        marginTop: '15px',

    },
    gridContainer: {
        height: '100%'
    },
    gridItem: {
        paddingLeft: '10px',
        paddingTop: '3px'
    },
    cardButton: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
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
            variant="elevation"
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={10}>
                    <Grid item sm={2} className={classes.gridItem}>
                        {/* <Typography>{result.teams[0].city} {result.teams[0].name} VS {result.teams[1].city} {result.teams[1].name}</Typography> */}
                    </Grid>
                    <Grid item sm={10} className={classes.gridItem}>
                        <Typography>{league.name}</Typography>
                    </Grid>
                    {/* <Grid item sm={5} className={classes.gridItem}>
                        <Typography>{team.name}</Typography>
                    </Grid> */}
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
