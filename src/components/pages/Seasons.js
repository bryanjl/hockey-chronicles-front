import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useSearchParams } from 'react-router-dom';
import SeasonTable from "../seasonProfile/SeasonTable";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueSelect from "../leagueProfile/LeagueSelect";
import Search from "../search/Search";

//APIs
import { getAllGames as getAllGamesAPI } from "../../api/games/gamesApi";


const Seasons = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    //state for API data
    const [gameResults, setGameResults] = useState([]);

    //pagination
    const [page, setPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);

    //state for season and league selects
    const [season, setSeason] = useState('');
    const [league, setLeague] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

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
        // setIsFetching(true);
        setGameResults([]);

        getAllGamesAPI(query).then(response => {
            setGameResults(response.data);
            setTotalDocuments(response.pagination.totalDocuments);
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
            
            <SeasonTable seasonData={gameResults} pageChange={pageChange} totalDocuments={totalDocuments} currPage={page} />
        </>
    )
}

export default Seasons;
