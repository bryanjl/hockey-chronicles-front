import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@material-ui/core";
import { useSearchParams } from 'react-router-dom';
import Stats from "./Stats";
import SeasonTable from "../seasonProfile/SeasonTable";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueSelect from "../leagueProfile/LeagueSelect";
import Search from "../search/Search";
import LinearLoadingAnimation from "../feedback/LinearLoadingAnimation";

//APIs
import { getAllGames as getAllGamesAPI } from "../../api/games/gamesApi";
import { getSeasonAndLeagueStats as getSeasonAndLeagueStatsAPI } from '../../api/stats/statsApi';



const Seasons = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    //state for API data
    const [gameResults, setGameResults] = useState([]);

    const [isFetching, setIsFetching] = useState(false);

    //pagination
    const [page, setPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);

    //state for season and league selects
    const [season, setSeason] = useState('');
    const [league, setLeague] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [statsData, setStatsData] = useState(null);

    useEffect(() => {
        let query = '';
        let searchTerm = searchParams.get('term');
        let seasonTerm = searchParams.get('season');
        let leagueTerm = searchParams.get('league');
        let pageTerm = parseInt(searchParams.get('page') || 1);
        if(searchTerm) {
            query = `term=${searchTerm}&`;
        }
        if(seasonTerm){
            query += `season=${seasonTerm}&`;
        }
        if(leagueTerm){
            query += `league=${leagueTerm}&`;
        }
        query += `page=${pageTerm}`;

        // let pageParam = parseInt(searchParams.get('page') || 1);
        // setPage(pageTerm);
        fetchData(`${query}`);
        
    }, [searchParams]);

    useEffect(() => {
        setParams();
        //eslint-disable-next-line
    }, [season, league, page, searchQuery]);

    const fetchData = (query) => {
        setIsFetching(true);
        setGameResults([]);

        getSeasonAndLeagueStatsAPI(query).then(response => {
            setStatsData(response.data);
        });

        getAllGamesAPI(query).then(response => {
            setGameResults(response.data);
            setTotalDocuments(response.pagination.totalDocuments);
            setIsFetching(false);
        });

        
    }

    const setParams = () => {
        let urlParams = '?';
        if(searchQuery !== ''){
            urlParams += `${searchQuery}&`;
        } else {
            if(season !== ''){
                urlParams += `season=${season}&`;
            }
            if(league !== '') {
                urlParams += `league=${league}&`;
            }
        }

        urlParams += `page=${page}`;
        
        setSearchParams(`${urlParams}`);
    }

    //get games by season -> select
    const seasonChange = (seasonValue) => {
        setSeason(seasonValue);
        setPage(1);
    }

    const leagueChange = (leagueValue) => {
        setLeague(leagueValue);
        setPage(1);
    }

    const gameSearch = (queryValue) => {
        setSeason('');
        setLeague('');
        setSearchQuery(queryValue);
        setPage(1);
    }

    //page change function
    const pageChange = (value) => {
        setPage(value);
    }

    return (
        <>
        
            <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px'}}>View Games by Season</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Search handleSearch={gameSearch} />
                </Grid>
                <Grid item xs={6}>
                    <SeasonSelect seasonSelect={seasonChange} />     
                </Grid>
                <Grid item xs={6}>
                    <LeagueSelect leagueSelect={leagueChange} />
                </Grid>
            </Grid>
            {isFetching &&
                <LinearLoadingAnimation />
            }
            {statsData &&
                <Stats data={statsData} />
            }
            {!isFetching && 
                <>
                
                <Typography align='center' variant="h6" style={{backgroundColor: 'black', color: '#F74902', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>
                    {(season === '' && league === '') && 'Games for all leagues and seasons' }
                    {(season === '' && league !== '') && `Games in the ${league} for all seasons`}
                    {(season !== '' && league === '') && `Games for the ${season} in all leagues`}
                    {(season !== '' && league !== '') && `Games in the ${league} for the ${season} season`}
                </Typography>
                </>
            }
            
            <SeasonTable seasonData={gameResults} pageChange={pageChange} totalDocuments={totalDocuments} currPage={page} />
        </>
    )
}

export default Seasons;
