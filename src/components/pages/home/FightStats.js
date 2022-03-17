import { makeStyles, Paper, Typography } from "@material-ui/core";
import SeasonSelect from "../../seasonProfile/SeasonSelect";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '200px',
        // width: '350px',
        padding: '15px',
        margin: '15px'
    }
}));

const FightStats = () => {
    const classes = useStyles();

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography>Stats by Season</Typography>
            <SeasonSelect />
        </Paper>
    )
}

export default FightStats;
