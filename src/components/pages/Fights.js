import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueSelect from "../leagueProfile/LeagueSelect";
import Search from "../search/Search";
import FightTable from "./fight/FightTable";
import LinearLoadingAnimation from "../feedback/LinearLoadingAnimation";


const Fights = () => {
    //search params
    const [searchParams, setSearchParams] = useSearchParams();

    const [isFetching, setIsFetching] = useState(false);

    //fight data state
    const [fightResults, setFightResults] = useState([]);
    
    // state for current page for pagination
    const [page, setPage] = useState(1);
    const [totalDocuments, setTotalDocuments] = useState(0);

    //query state
    const [searchQuery, setSearchQuery] = useState('');
    const [seasonQuery, setSeasonQuery] = useState('');
    const [leagueQuery, setLeagueQuery] = useState('');    

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

        fetchData(`${query}`);
        
    }, [searchParams]);

    useEffect(() => {
        setParams();
        //eslint-disable-next-line
    }, [seasonQuery, leagueQuery, page, searchQuery]);
    
    //fetch data
    //api route /fights?term=&page
    const fetchData = (query) => {
        setIsFetching(true);
        setFightResults([]);

        getAllFightsAPI(query).then(data => {
            setFightResults(data.data);
            setTotalDocuments(data.pagination.totalDocuments);
            setIsFetching(false);
        });
    }
    
    const setParams = () => {
        let urlParams = '?';
        if(searchQuery !== ''){
            urlParams += `${searchQuery}&`;
        } else {
            if(seasonQuery !== ''){
                urlParams += `season=${seasonQuery}&`;
            }
            if(leagueQuery !== '') {
                urlParams += `league=${leagueQuery}&`;
            }
        }

        urlParams += `page=${page}`;
        
        setSearchParams(`${urlParams}`);
    }

    // get fights by season -> select
    const seasonSelect = (season) => {
        setSeasonQuery(season);
        setPage(1);
    }

    const leagueSelect = (league) => {
        setLeagueQuery(league);
        setPage(1);
    }

    //fight search
    const fightSearch = (query) => {
        setSeasonQuery('');
        setLeagueQuery('');
        setSearchQuery(query);
        setPage(1);
    }

    //page change function
    const pageChange = (value) => {
        setPage(value);
    }

    return (
        <>
            <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px'}}>Browse Fights</Typography>
            <Grid container>
                <Grid item xs={12}>
                    <Search handleSearch={fightSearch} />
                </Grid>
                <Grid item xs={6}>
                        <SeasonSelect seasonSelect={seasonSelect} />
                    </Grid>
                    <Grid item xs={6}>
                        <LeagueSelect leagueSelect={leagueSelect} />    
                    </Grid> 
            </Grid>
            {isFetching && 
                <LinearLoadingAnimation />
            }
            <FightTable seasonData={fightResults} pageChange={pageChange} totalDocuments={totalDocuments} currPage={page} />
        </>
    )
}

export default Fights;
