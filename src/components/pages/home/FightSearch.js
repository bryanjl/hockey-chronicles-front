import { InputBase, makeStyles, Paper, Typography } from "@material-ui/core"
import LeagueSelect from "../../leagueProfile/LeagueSelect";

const useStyles = makeStyles((theme) => ({
    container: {
        height: '150px',
        width: '350px',
        padding: '15px'
    },
    inputRoot: {
        backgroundColor: 'gray',
        color: 'white'
    }
}));

const FightSearch = () => {
    const classes = useStyles();

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography variant="h5">Search Fights</Typography>
            <InputBase
                placeholder="Search fights"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                fullWidth
                inputProps={{ 'aria-label': 'search ' }}
            ></InputBase>
            <LeagueSelect />
        </Paper>
    )
}

export default FightSearch
