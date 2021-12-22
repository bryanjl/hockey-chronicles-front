import { Container, makeStyles } from "@material-ui/core"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FightCard from "./FightCard/FightCard";
import SearchResults from "./search/SearchResults";
import Home from "./Home";
import PlayerProfile from "./playerProfile/PlayerProfile";
import GameProfile from "./gameProfile/GameProfile";
import LeagueProfile from "./leagueProfile/LeagueProfile";
import SeasonProfile from "./seasonProfile/SeasonProfile";
import TeamProfile from "./teamProfile/TeamProfile";


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
                <Route path='/players/:playerID' element={<PlayerProfile />} />
                <Route path='/games/:gameID' element={<GameProfile />} />
                <Route path='/leagues/:leagueID' element={<LeagueProfile />} />
                <Route path='/seasons/:seasonID' element={<SeasonProfile />} />
                <Route path='/teams/:teamID' element={<TeamProfile />} />
                <Route path='/search' element={<SearchResults searchQuery={searchQuery} />} />  
            </Routes>
        </Container>
        
    )
}

export default Feed
