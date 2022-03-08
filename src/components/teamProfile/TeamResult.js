import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core"
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        width: '100%',
        // height: '150px',
        marginTop: '15px',

    },
    gridContainer: {
        height: '100%'
    },
    gridItem: {
        paddingLeft: '10px',
        paddingTop: '3px',
        
    },
    cardButton: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
    },
    teamImg: {
        maxHeight: '100px',
        margin: '10px'
    }
}));

const TeamResult = ({ team, id }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    const getTeam = () => {
        // console.log(id)
        navigate(`/teams/${id}`)
    }

    return (
        <Card  
            className={classes.cardContainer}
            variant="elevation"
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={5}>
                    <Link to={`/teams/${id}`}>
                        <img className={classes.teamImg} src={`/images/teams/${team.city}${team.name}.png`} alt={`${team.fullName}`} />
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <Grid item sm={2} className={classes.gridItem}>
                        {/* <Typography>{result.teams[0].city} {result.teams[0].name} VS {result.teams[1].city} {result.teams[1].name}</Typography> */}
                    </Grid>
                    <Grid align='center' item sm={5} className={classes.gridItem}>
                        <Typography>{team.city}</Typography>
                    </Grid>
                    <Grid align='center' item sm={5} className={classes.gridItem}>
                        <Typography>{team.name}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2} >
                    <CardActions className={classes.cardButton}>
                        <Button onClick={getTeam} size="small">View Team</Button>
                    </CardActions>
                </Grid>
                
            </Grid>
            
        </Card>
    )

}

export default TeamResult;
