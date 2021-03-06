import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PlayerSearch from "./pages/home/PlayerSearch";
import FightSearch from "./pages/home/FightSearch";
import TeamSearch from "./pages/home/TeamSearch";
import FeaturedFight from "./pages/home/FeaturedFight";
// import FightLeader from "./pages/home/FightLeader";
// import FightStats from "./pages/home/FightStats";
// import TopFive from "./pages/home/TopFive";

const Home = () => {
    const navigate = useNavigate();

    const handlePlayerSearch = (searchTerm) => {
        navigate(`/players?term=${searchTerm}`);
    }

    const handleFightSearch = (searchTerm) => {
        navigate(`/fights?search=${searchTerm}`);
    }

    const handleTeamSearch = (searchTerm) => {
        navigate(`/teams?term=${searchTerm}`);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <FeaturedFight />
            </Grid>
            <Grid item xs={12}>
                <PlayerSearch handleClick={handlePlayerSearch} />
            </Grid>
            <Grid item xs={12}>
                <FightSearch handleClick={handleFightSearch} />
            </Grid>
            <Grid item xs={12}>
                <TeamSearch handleClick={handleTeamSearch} />
            </Grid>
            {/* <Grid item xs={12}>
                <TopFive />
            </Grid> */}
            
            
            {/* <Grid item xs={12}>
                <FightStats />
            </Grid> */}
        </Grid>
    )
}

export default Home;
