import { Container, makeStyles } from "@material-ui/core"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FightCard from "./FightCard/FightCard";
import SearchResults from "./search/SearchResults";
import Home from "./Home";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        justifyContent: 'center',
        backgroundColor: 'blue'
    }
}));


const Feed = ({ searchQuery }) => {
    const classes = useStyles();
    return (
        
            <Container className={classes.container}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/fights/:fightID' element={<FightCard />} />
                    <Route path='/search' element={<SearchResults searchQuery={searchQuery} />} />  
                </Routes>
            </Container>
        
        
    )
}

export default Feed
