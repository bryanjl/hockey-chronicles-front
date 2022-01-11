import { InputBase, makeStyles, Paper, Typography } from "@material-ui/core"

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

const PlayerSearch = () => {
    const classes = useStyles();

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography variant="h5">Search Players</Typography>
            <InputBase
                placeholder="Type Player's Name"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                }}
                fullWidth
                inputProps={{ 'aria-label': 'search ' }}
            ></InputBase>
        </Paper>
    )
}

export default PlayerSearch
