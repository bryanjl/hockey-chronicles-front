import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import { getSeason as getSeasonAPI } from "../../api/seasons/seasonsApi";
import { fightSearch as fightSearchAPI } from "../../api/search/searchApi";
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
    //state for total number of pages 
    const [numberOfPages, setNumberOfPages] = useState(0);

    //Get all fights
    useEffect(() => {
        setIsFetching(true);
        getAllFightsAPI(page).then(data => {
            setFightResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
            // console.log(fightResults);
        });
    }, [page]);

    //get fights by season -> select
    const seasonSelect = (id) => {
        setIsFetching(true);
        getSeasonAPI(id).then(data => {
            console.log(data.data.fights);
            setFightResults(data.data.fights);
            setNumberOfPages(0);
            setIsFetching(false);
        });
    }

    //fight search
    const fightSearch = (query) => {
        setIsFetching(true);
        fightSearchAPI(query).then(data => {
            setFightResults(data.data);
            setNumberOfPages(0);
            setIsFetching(false);
        });
    }

    //page change function
    const pageChange = (value) => {
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
            {numberOfPages != 0 && 
                <Paging pageChange={pageChange} totalPages={numberOfPages} />
            }
            
        </Grid>
    )
}

export default Fights;
