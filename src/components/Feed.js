import { Container, makeStyles } from "@material-ui/core"
import { Routes, Route } from "react-router-dom";

import FightCard from "./FightCard/FightCard";
import Home from "./Home";
import PlayerProfile from "./playerProfile/PlayerProfile";
import GameProfile from "./gameProfile/GameProfile";
import LeagueProfile from "./leagueProfile/LeagueProfile";
import SeasonProfile from "./seasonProfile/SeasonProfile";
import TeamProfile from "./teamProfile/TeamProfile";

import Admin from "./pages/admin/Admin";
import Fights from "./pages/Fights";
import Players from "./pages/Players";
import Leagues from "./pages/Leagues";
import Teams from "./pages/Teams";
import Seasons from "./pages/Seasons";
import UserProfile from "./pages/UserProfile";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        justifyContent: 'center',
        // backgroundColor: theme.palette.secondary.dark,
        minHeight: '100vh'
    }
}));


const Feed = ({ searchQuery }) => {
    const classes = useStyles();
    return (
        
        <Container className={classes.container}>
            <Routes>
                <Route path='/' element={<Home />} />
                
                <Route path='/admin' element={<Admin />} />

                <Route path='/fights' element={<Fights />} />
                <Route path='/fights/:fightID' element={<FightCard />} />

                <Route path='/players' element={<Players />} />
                <Route path='/players/:playerID' element={<PlayerProfile />} />

                <Route path='/games/:gameID' element={<GameProfile />} />

                <Route path='/leagues' element={<Leagues />} />
                <Route path='/leagues/:leagueID' element={<LeagueProfile />} />

                <Route path='/seasons' element={<Seasons />} />
                <Route path='/seasons/:seasonID' element={<SeasonProfile />} />

                <Route path='/teams' element={<Teams />} />
                <Route path='/teams/:teamID' element={<TeamProfile />} />

                <Route path='/profile' element={<UserProfile />} />

            </Routes>
        </Container>
        
    )
}

export default Feed
