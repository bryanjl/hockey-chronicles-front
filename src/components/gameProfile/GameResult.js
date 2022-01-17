import { Button, Card, CardActions, Grid, makeStyles, Typography } from "@material-ui/core";
import TeamCard from "../teamProfile/TeamCard";
import DateDisplay from "../date/DateDisplay";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    gameResultContainer: {
        margin: '10px'
    },
    teamContainer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    btnContainer: {
        height: '100%',
        display: 'flex',
        alignContent: 'flex-end',
        justifyContent: 'center'
    }
}));

const GameResult = ({ game }) => {
    const classes = useStyles();
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/games/${game._id}`)
    }

    return (
        <Card variant="elevation" className={classes.gameResultContainer}>
            <Grid container>
                <Grid item xs={10}>
                    <Grid item sm={12} >
                        <DateDisplay date={game.date} />
                    </Grid>
                    <Grid item sm={12} className={classes.teamContainer} >
                        <TeamCard team={game.teams[0]} />
                        <TeamCard team={game.teams[1]} />
                    </Grid>
                    
                    <Grid item sm={12} >
                        <Typography></Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2} >
                    <CardActions className={classes.btnContainer} >
                        <Button onClick={handleClick} size="small">View Game</Button>
                    </CardActions>
                </Grid>    
            </Grid>
        </Card>
    )
}

export default GameResult;
