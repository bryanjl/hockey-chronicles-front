import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllLeagues as getAllLeaguesAPI } from "../../api/leagues/leaguesApi";
import LeagueResult from '../leagueProfile/LeagueResult';
import Paging from "../Paging";
import LinearLoadingAnimation from "../feedback/LinearLoadingAnimation";

const Leagues = () => {
    //use searchparams for browser history
    const [searchParams, setSearchParams] = useSearchParams();

    //state for API data
    const [isFetching, setIsFetching] = useState(true);
    const [leagueResults, setLeagueResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    useEffect(() => {
        //get params 
        let searchTerm = searchParams.get('term') || '';
        let query = '';
        if(searchTerm){
            query = `term=${searchTerm}&`;
        }
        
        let pageParam = parseInt(searchParams.get('page')) || 1;

        //set page number
        setPage(pageParam);        

        //fetch data
        fetchData(`${query}page=${pageParam}`);  

        fetchData();
    }, [searchParams]);

    const fetchData = (query = '') => {
        setIsFetching(true);
        getAllLeaguesAPI(query).then(data => {
            setLeagueResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    //page change function
    const pageChange = (value) => {
        //before changing page check to see if there is a search
        //query and add to the searchParams
        let searchTerm = `term=${searchParams.get('term')}&`;
        if(!searchParams.get('term')) {
            searchTerm = '';
        }
        setSearchParams(`?${searchTerm}page=${value}`);
    }

    return (
        <Grid container>
            {isFetching &&
                <LinearLoadingAnimation />
            }
            {!isFetching && 
                leagueResults.map((result) => {
                    return <LeagueResult key={result._id} league={result} id={result._id} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Leagues;
