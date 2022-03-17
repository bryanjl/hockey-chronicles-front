import { Container, makeStyles } from "@material-ui/core";
import TopFive from "./pages/home/TopFive";
import FightStats from "./pages/home/FightStats";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        // backgroundColor: 'red',
        height: '100%',
        borderLeft: '1px solid #ece7e7'
    }
}));

const RightBar = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <TopFive />
            <FightStats />
        </Container>
    )
}

export default RightBar
