import { makeStyles, Paper, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
        height: '200px',
        width: '350px',
        padding: '15px',
        margin: '15px'
    }
}));

const FeaturedFight = () => {
    const classes = useStyles();

    return (
        <Paper elevation={8} className={classes.container}>
            <Typography>Featured Fight</Typography>
        </Paper>
    )
}

export default FeaturedFight
