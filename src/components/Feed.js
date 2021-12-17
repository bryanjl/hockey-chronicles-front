import { Container, makeStyles } from "@material-ui/core"

import FightCard from "./FightCard/FightCard";
import SearchResults from "./search/SearchResults";


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
            {/* <FightCard /> */}
            <SearchResults />
        </Container>
    )
}

export default Feed
