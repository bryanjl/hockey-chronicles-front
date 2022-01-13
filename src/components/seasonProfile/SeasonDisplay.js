import { Card, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    seasonCard: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        margin: '10px'
    }
}));

const SeasonDisplay = ({ season }) => {
    const classes = useStyles();
    
    // season = '1960-1961'

    return (
        <Card className={classes.seasonCard}>
            <Typography>{season}</Typography>
        </Card>
    )
}

export default SeasonDisplay;
