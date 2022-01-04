import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi"
import SearchResult from "../search/SearchResult";
import Paging from "../Paging";

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

    useEffect(() => {
        setIsFetching(true);
        getAllFightsAPI(page).then(data => {
            setFightResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
            // console.log(fightResults);
        });
    }, [page]);

    //page change function
    const pageChange = (value) => {
        setPage(value);
    }

    return (
        <Grid container>
            {!isFetching && 
                fightResults.map((result) => {
                    return <SearchResult key={result._id} result={result} id={result._id} />
                })
            }
            <Paging pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Fights
