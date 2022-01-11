import { Grid, Typography } from "@material-ui/core";
import PlayerSearch from "./pages/home/PlayerSearch";
import FightSearch from "./pages/home/FightSearch";

const Home = () => {;
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">HomePage</Typography>
            </Grid>
            <Grid item xs={12}>
                <PlayerSearch />
            </Grid>
            <Grid item xs={12}>
                <FightSearch />
            </Grid>
        </Grid>
    )
}

export default Home;
