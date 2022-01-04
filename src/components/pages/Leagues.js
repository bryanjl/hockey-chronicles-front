import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllLeagues as getAllLeaguesAPI } from "../../api/leagues/leaguesApi";
// import SearchResult from "../search/SearchResult";
import LeagueResult from '../leagueProfile/LeagueResult';
import Paging from "../Paging";

const useStyles = makeStyles((theme) => ({

}));


const Leagues = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [leagueResults, setLeagueResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //handle page change
    const pageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        setIsFetching(true);
        getAllLeaguesAPI(page).then(data => {
            setLeagueResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }, [page]);

    return (
        <Grid container>
            {!isFetching && 
                leagueResults.map((result) => {
                    return <LeagueResult key={result._id} league={result} id={result._id} />
                })
            }
            <Paging pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Leagues
