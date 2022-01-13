import { Button, Card, CardActions, makeStyles, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    playerThumbCard: {

    },
    playerName: {
        padding: '5px',
        fontSize: '2em',
        textAlign: 'center'
    }
}));

const PlayerThumb = ({ player }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/players/${player.id}`);
    }
    
    return (
        <Card className={classes.playerThumbCard}>
            <Typography className={classes.playerName}>{`${player.firstName} ${player.lastName}`}</Typography>
            <CardActions>
                <Button onClick={handleClick} size='small'>View PLayer</Button>
            </CardActions>
        </Card>
    )
}

export default PlayerThumb;
