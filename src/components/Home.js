import { Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PlayerSearch from "./pages/home/PlayerSearch";
import FightSearch from "./pages/home/FightSearch";
import FeaturedFight from "./pages/home/FeaturedFight";
import FightLeader from "./pages/home/FightLeader";
import FightStats from "./pages/home/FightStats";

const Home = () => {
    const navigate = useNavigate();

    const handlePlayerSearch = (searchTerm) => {
        navigate(`/players?term=${searchTerm}`);
    }

    const handleFightSearch = (searchTerm) => {
        navigate(`/fights?term=${searchTerm}`);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">HomePage</Typography>
            </Grid>
            <Grid item xs={12}>
                <PlayerSearch handleClick={handlePlayerSearch} />
            </Grid>
            <Grid item xs={12}>
                <FightSearch handleClick={handleFightSearch} />
            </Grid>
            <Grid item xs={12}>
                <FeaturedFight />
            </Grid>
            <Grid item xs={12}>
                <FightLeader />
            </Grid>
            <Grid item xs={12}>
                <FightStats />
            </Grid>
        </Grid>
    )
}

export default Home;
