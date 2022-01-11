import { Grid, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getAllPlayers as getAllPlayersAPI } from "../../api/players/playersApi";
// import SearchResult from "../search/SearchResult";
import PlayerCard from '../FightCard/PlayerCard';
import Paging from "../Paging";
import PositionSelect from "../playerProfile/PositionSelect";
import Search from "../search/Search";

const useStyles = makeStyles((theme) => ({

}));

const Players = () => {
    const classes = useStyles();

    const [isFetching, setIsFetching] = useState(true);
    const [playerResults, setPlayerResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(0);

    //state for position select
    const [positionValue, setPositionValue] = useState('');

    //state for search query
    const [searchQuery, setSearchQuery] = useState('');

    //handle page change
    const pageChange = (value) => {
        setPage(value);
    }

    useEffect(() => {
        fetchData(`${positionValue}${searchQuery}page=${page}`);
    }, [page, positionValue, searchQuery]);

    const fetchData = (query) => {
        setIsFetching(true);
        getAllPlayersAPI(query).then(data => {
            setPlayerResults(data.data);
            // console.log(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    const positionSelect = (position) => {
        setPositionValue(`term=${position}&`);
        setSearchQuery('');
        setPage(1);
    }

    const playerSearch = (inputQuery) => {
        setSearchQuery(`term=${inputQuery}&`);
        setPositionValue('');
        setPage(1);
    }

    return (
        <Grid container>
            <Grid item sm={12}>
                <Search handleSearch={playerSearch} />
                <PositionSelect positionSelect={positionSelect} />
            </Grid>
            
            {!isFetching && 
                playerResults.map((result) => {
                    return <PlayerCard key={result._id} player={result} id={result._id} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </Grid>
    )
}

export default Players;
