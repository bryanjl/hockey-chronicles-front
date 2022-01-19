import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllGames as getAllGamesAPI } from "../../api/games/gamesApi";
import GameResult from "../gameProfile/GameResult";
import Paging from "../Paging";
import SeasonSelect from "../seasonProfile/SeasonSelect";

const Seasons = () => {
    //use searchparams for browser history
    const [searchParams, setSearchParams] = useSearchParams();

    //state for API data
    const [gameResults, setGameResults] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

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
    }, [searchParams]);

    const fetchData = (query = '') => {
        setIsFetching(true);
        getAllGamesAPI(query).then(response => {
            setGameResults(response.data);
            setNumberOfPages(response.pagination.totalPages);
            setIsFetching(false);
        });
    }

      //get games by season -> select
      const seasonSelect = (season) => {
          if(season) {
            setSearchParams(`?term=${season}&page=1`);      
          } else {
            setSearchParams(`?page=1`);
          }
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
