import { useEffect, useState } from "react";
import SeasonTable from "../seasonProfile/SeasonTable";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueSelect from "../leagueProfile/LeagueSelect";

//APIs
import { getAllGames as getAllGamesAPI } from "../../api/games/gamesApi";
import { Grid } from "@mui/material";

const Seasons = () => {
    //state for API data
    const [gameResults, setGameResults] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for season and league selects
    const [season, setSeason] = useState('');
    const [league, setLeague] = useState('');

    useEffect(() => {
        fetchData();
        //eslint-disable-next-line
    }, [season, league]);

    const fetchData = () => {
        setIsFetching(true);

        let query = '';
        if(season !== ''){
            query = `season=${season}`;
        }
        if(league !== ''){
            query += `&league=${league}`;
        }

        getAllGamesAPI(query).then(response => {
            console.log(response)
            setGameResults(response.data);
            setIsFetching(false);
        });
    }

    //get games by season -> select
    const seasonChange = (seasonValue) => {
        console.log(seasonValue);
        setSeason(seasonValue);
    }

    const leagueChange = (leagueValue) => {
        console.log(leagueValue);
        setLeague(leagueValue);
    }

    return (
        <>
            <Grid container>
                <Grid item xs={6}>
                    <SeasonSelect seasonSelect={seasonChange} />     
                </Grid>
                <Grid item xs={6}>
                    <LeagueSelect leagueSelect={leagueChange} />
                </Grid>
            </Grid>
            
            {!isFetching && 
                <SeasonTable seasonData={gameResults} />
            }
        </>
    )
}

export default Seasons;
