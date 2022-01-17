import { useEffect, useState } from "react";
import { getAllGames as getAllGamesAPI } from "../../api/games/gamesApi";
import GameResult from "../gameProfile/GameResult";
import Paging from "../Paging";
import SeasonSelect from "../seasonProfile/SeasonSelect";

const Seasons = () => {
    const [gameResults, setGameResults] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for pagination
    const [page, setPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState(0);

    //state for seasonSelect
    const [seasonValue, setSeasonValue] = useState('');

    useEffect(() => {
        fetchData(`${seasonValue}page=${page}`);
    }, [page, seasonValue]);

    const fetchData = (query) => {
        setIsFetching(true);
        getAllGamesAPI(query).then(response => {
            console.log(response);
            setGameResults(response.data);
            setNumberOfPages(response.pagination.totalPages);
            setIsFetching(false);
        });
    }

      //get games by season -> select
      const seasonSelect = (season) => {
        setSeasonValue(`term=${season}&`);
        setPage(1);
     }

    //page change function
    const pageChange = (value) => {
        setPage(value);
    }

    return (
        <>
            <SeasonSelect seasonSelect={seasonSelect} />
            {!isFetching && 
                gameResults.map(game => {
                    return <GameResult key={game._id} game={game} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </>
    )
}

export default Seasons;
