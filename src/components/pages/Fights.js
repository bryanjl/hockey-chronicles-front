import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import SearchResult from "../search/SearchResult";
import Paging from "../Paging";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import Search from "../search/Search";


const Fights = () => {
    //search params
    const [searchParams, setSearchParams] = useSearchParams();

    //fight data state
    const [isFetching, setIsFetching] = useState(true);
    const [fightResults, setFightResults] = useState([]);

    // state for current page for pagination
    const [page, setPage] = useState(1);

    //state for total number of pages 
    const [numberOfPages, setNumberOfPages] = useState(0);

    //Get all fights
    useEffect(() => {
        //get params
        let searchTerm = searchParams.get('term');
        let query = '';
        if(searchTerm) {
            query = `term=${searchTerm}&`;
        }
        
        let pageParam = parseInt(searchParams.get('page')) || 1;
        setPage(pageParam);

        fetchData(`${query}page=${pageParam}`);
    }, [searchParams]);
    
    //fetch data
    //api route /fights?term=&page
    const fetchData = (query) => {
        setIsFetching(true);
        getAllFightsAPI(query).then(data => {
            // console.log(data);
            setFightResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    //get fights by season -> select
    const seasonSelect = (season) => {
        if(season) {
            setSearchParams(`?term=${season}&page=1`);      
        } else {
            setSearchParams(`?page=1`);
        }
    }

    //fight search
    const fightSearch = (query) => {
        setSearchParams(`?term=${query}&page=1`);
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
            <Grid item sm={12}>
                <Search handleSearch={fightSearch} />
                <SeasonSelect seasonSelect={seasonSelect} />
            </Grid>
            
            {!isFetching && 
                fightResults.map((result) => {
                    return <SearchResult key={result._id} result={result} id={result._id} />
                })
            }
            {numberOfPages !== 0 && 
                <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
            }
            
        </Grid>
    )
}

export default Fights;
