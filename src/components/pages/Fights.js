import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueSelect from "../leagueProfile/LeagueSelect";
import Search from "../search/Search";
import FightTable from "./fight/FightTable";


const Fights = () => {
    //search params
    // const [searchParams, setSearchParams] = useSearchParams();

    //fight data state
    const [isFetching, setIsFetching] = useState(true);
    const [fightResults, setFightResults] = useState([]);

    // state for current page for pagination
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState('');
    const [seasonQuery, setSeasonQuery] = useState('');
    const [leagueQuery, setLeagueQuery] = useState('');

    //state for total number of pages 
    // const [numberOfPages, setNumberOfPages] = useState(0);

    const [totalDocuments, setTotalDocuments] = useState(0);

    //Get all fights
    useEffect(() => {
        // let searchTerm = searchParams.get('search');
        // if(!searchTerm){
        //     setSearchParams(`${searchQuery}${seasonQuery}${leagueQuery}&page=${page}`);
            
        // } else {
        //     setSearchQuery(`term=${searchTerm}`);
        //     setSearchParams(`term=${searchParams}&page=1`);
        // }
        fetchData();
        //eslint-disable-next-line
    }, [page, seasonQuery, leagueQuery, searchQuery]);
    
    //fetch data
    //api route /fights?term=&page
    const fetchData = () => {
        setIsFetching(true);
        setFightResults([]);
        // let searchTerm = searchParams.get('term');
        // if(searchTerm){
        //     getAllFightsAPI(`${searchTerm}&page=${page}`).then(data => {
        //         console.log(data);
        //         setFightResults(data.data);
        //         // setNumberOfPages(data.pagination.totalPages);
        //         setTotalDocuments(data.pagination.totalDocuments);
        //         // setSearchQuery('');
        //         setIsFetching(false);
        //     });
        // }
        // let seasonSearch = searchParams.get('season');
        // let leagueSearch = searchParams.get('league');
        // let termSearch = searchParams.get('term');
        // let query = '';
        // if(seasonSearch){
        //     query = `season=${seasonSearch}`;
        // }
        // if(leagueSearch){
        //     query += `&league=${leagueSearch}`;
        // } 
        // if(termSearch){
        //     query = `term=${termSearch}`
        // }
        getAllFightsAPI(`${searchQuery}${seasonQuery}${leagueQuery}&page=${page}`).then(data => {
            console.log(data);
            setFightResults(data.data);
            // setNumberOfPages(data.pagination.totalPages);
            setTotalDocuments(data.pagination.totalDocuments);
            // setSearchQuery('');
            setIsFetching(false);
        });
    }

    // get fights by season -> select
    const seasonSelect = (season) => {
        setSeasonQuery(`&season=${season}`);
        // setSearchParams(`?season=${season}`);
        setPage(1);
    }

    const leagueSelect = (value) => {
        setLeagueQuery(`&league=${value}`);
    }

    //fight search
    const fightSearch = (query) => {
        setSeasonQuery('');
        setLeagueQuery('');
        setSearchQuery(query);
    }

    //page change function
    const pageChange = (value) => {
        setPage(value);

    }

    return (
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
            <FightTable seasonData={fightResults} pageChange={pageChange} totalDocuments={totalDocuments} currPage={page} />
            {/* {!isFetching && 
                // fightResults.map((result) => {
                //     if(result.fightType === 'Event' || result.players.length === 0) {
                //         return <></>
                //     } else {
                //         return <SearchResult key={result._id} result={result} id={result._id} />
                //     }                    
                // })
                
            } */}
            {/* {numberOfPages !== 0 && 
                <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
            } */}
            
        </Grid>
    )
}

export default Fights;
