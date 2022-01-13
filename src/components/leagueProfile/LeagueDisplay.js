import { Button, Card, makeStyles, Typography } from "@material-ui/core";
import { CardActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    leagueCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leagueLogo: {
        maxHeight: '80px',
        width: 'auto'
    }
}))

const LeagueDisplay = ({ league }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/leagues/${league.id}`);
    }

    return (
        <Card className={classes.leagueCard}>
            <Typography>{league.name}</Typography>
            <img className={classes.leagueLogo} src={`/images/leagues/${league.name}.png`} alt='nhl' />
            <CardActions>
                <Button onClick={handleClick} size='small'>View League</Button>
            </CardActions>
        </Card>
    )
}

export default LeagueDisplay;