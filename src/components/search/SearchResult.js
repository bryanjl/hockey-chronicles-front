import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core"
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: '100%',
        height: '100%',
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

const SearchResult = ({ result, id }) => {
    console.log(result);
    const classes = useStyles();

    const navigate = useNavigate();

    const getFight = () => {
        // console.log(id)
        navigate(`/fights/${id}`)
    }

    let date = new Date(result.date.split('T')[0]).toDateString();

    return (
        <Card  
            className={classes.cardContainer}
            variant="elevation"
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={10}>
                    {/* <Grid item sm={12} className={classes.gridItem}>
                        <Typography>{result.teams[0].city} {result.teams[0].name} VS {result.teams[1].city} {result.teams[1].name}</Typography>
                    </Grid> */}
                    <Grid item sm={12} className={classes.gridItem}>
                        <Typography>{date}</Typography>
                    </Grid>
                    <Grid item sm={12} className={classes.gridItem}>
                        <Typography>{result.players[0].lastName ? result.players[0].lastName : 'unknown'} VS {result.players[1].lastName ? result.players[1].lastName : 'unknown'}</Typography>
                    </Grid>
                    {/* <Grid item sm={12} className={classes.gridItem}>
                        <Typography>{result.league.name}</Typography>
                    </Grid> */}
                    
                </Grid>
                <Grid item xs={2} >
                    <CardActions className={classes.cardButton}>
                        <Button onClick={getFight} size="small">View Fight</Button>
                    </CardActions>
                </Grid>
                
            </Grid>
            
        </Card>
    )
}

export default SearchResult
