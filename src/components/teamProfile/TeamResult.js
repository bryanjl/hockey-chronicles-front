import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core"
import { Link, useNavigate } from 'react-router-dom';

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
    },
    teamNameContainer: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const TeamResult = ({ team, id }) => {
    const classes = useStyles();

    const navigate = useNavigate();

    const getTeam = () => {
        navigate(`/teams/${id}`)
    }

    return (
        <Card  
            className={classes.cardContainer}
            style={{ border: 'none', boxShadow: 'none', cursor: 'pointer' }}
            onClick={getTeam}
        >
            <Grid container className={classes.gridContainer}>
                <Grid item xs={2}>
                    <Link to={`/teams/${id}`}>
                        <img className={classes.teamImg} src={`/images/teams/${team.city}${team.name}.png`} alt={`${team.fullName}`} />
                    </Link>
                </Grid>
                <Grid item xs={8}>
                    <div className={classes.teamNameContainer}>
                        <Typography variant='h5' style={{ padding: '5px' }}>{team.city} {team.name}</Typography>
                    </div>
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
