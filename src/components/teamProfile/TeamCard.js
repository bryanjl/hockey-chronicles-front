import { Button, Card, CardActions, makeStyles, Paper, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    teamCard: {
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px'
    },
    teamName: {

    },
    teamLogoContainer: {},
    teamLogo: {
        maxHeight: '100px',
        width: 'auto'
    }
}));

const TeamCard = ({ team }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/teams/${team.id}`);
    }

    return (
        <Card className={classes.teamCard}>
            <Typography className={classes.teamName}>{`${team.city} ${team.name}`}</Typography>
            <Paper className={classes.teamLogoContainer}>
                <img className={classes.teamLogo} src={`/images/teams/${team.city}${team.name}.png`} alt='img' />
            </Paper>
            <CardActions>
                <Button onClick={handleClick} size="small">View Team</Button>
          </CardActions>
        </Card>
    )
}

export default TeamCard;
