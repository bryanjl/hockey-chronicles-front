import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getFight as getFightAPI } from "../../api/fights/fightApi"
import SearchResult from "../search/SearchResult";
import Paging from "../Paging";

const useStyles = makeStyles((theme) => ({

}));

const Fights = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [fightResults, setFightResults] = useState([]);

    // !!!
    // const [page, setPage] = useState(1);

    useEffect(() => {
        getFightAPI().then(data => {
            setFightResults(data.data);
            setIsFetching(false);
            // console.log(fightResults);
        });
    }, []);

    return (
        <Grid container>
            {!isFetching && 
                fightResults.map((result) => {
                    return <SearchResult key={result._id} result={result} id={result._id} />
                })
            }
            <Paging />
        </Grid>
    )
}

export default Fights
