import { Container, makeStyles } from "@material-ui/core"

import FightCard from "./FightCard/FightCard";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        justifyContent: 'center',
        backgroundColor: 'blue'
    }
}));


const Feed = () => {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <FightCard />
        </Container>
    )
}

export default Feed
