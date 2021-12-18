import { Container, makeStyles } from "@material-ui/core"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                <Routes>
                    <Route path='/fights/:id' element={<FightCard />} />
                    <Route path='/search/:searchParams' element={<SearchResults />} />  
                </Routes>
            </Container>
        
        
    )
}

export default Feed
