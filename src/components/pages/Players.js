import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllPlayers as getAllPlayersAPI } from "../../api/players/playersApi";
// import SearchResult from "../search/SearchResult";
import PlayerCard from '../FightCard/PlayerCard';
import Paging from "../Paging";

const useStyles = makeStyles((theme) => ({

}));

const Players = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [playerResults, setPlayerResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //handle page change
    const pageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        setIsFetching(true);
        getAllPlayersAPI(page).then(data => {
            setPlayerResults(data.data);
            console.log(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        })
    }, [page]);

    return (
        <Grid container>
            {!isFetching && 
                playerResults.map((result) => {
                    return <PlayerCard key={result._id} player={result} id={result._id} />
                })
            }
            <Paging pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Players;
