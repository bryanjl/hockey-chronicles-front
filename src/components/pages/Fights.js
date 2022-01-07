import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import SearchResult from "../search/SearchResult";
import Paging from "../Paging";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import Search from "../search/Search";

const useStyles = makeStyles((theme) => ({

}));

const Fights = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [fightResults, setFightResults] = useState([]);

    // state for current page for pagination
    const [page, setPage] = useState(1);
    //state for seasonSelect
    const [seasonValue, setSeasonValue] = useState('');
    //state for search query
    const [searchQuery, setSearchQuery] = useState('');
    //state for total number of pages 
    const [numberOfPages, setNumberOfPages] = useState(0);

    //Get all fights
    useEffect(() => {
        fetchData(`${seasonValue}${searchQuery}page=${page}`);
    }, [page, seasonValue, searchQuery]);
    
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
       setSeasonValue(`term=${season}&`);
       setSearchQuery('');
       setPage(1);
    }

    //fight search
    const fightSearch = (query) => {
        setSearchQuery(`term=${query}&`);
        setSeasonValue('');
        setPage(1);
    }

    //page change function
    const pageChange = (value) => {
        // fetchData(value);
        setPage(value);
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
