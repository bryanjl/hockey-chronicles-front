import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllPlayers as getAllPlayersAPI } from "../../api/players/playersApi";
import PlayerResult from '../playerProfile/PlayerResult';
import Paging from "../Paging";
import PositionSelect from "../playerProfile/PositionSelect";
import Search from "../search/Search";
import LinearLoadingAnimation from "../feedback/LinearLoadingAnimation";
import { Typography } from "@material-ui/core";

const Players = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [isFetching, setIsFetching] = useState(true);
    const [playerResults, setPlayerResults] = useState([]);

    //state for pagination
    const [page, setPage] = useState(1);
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

    const fetchData = (query) => {
        setIsFetching(true);
        getAllPlayersAPI(query).then(data => {
            setPlayerResults(data.data);
            setNumberOfPages(data.pagination.totalPages);
            setIsFetching(false);
        });
    }

    const positionSelect = (position) => {
        if(position) {
            setSearchParams(`?term=${position}&page=1`);      
        } else {
            setSearchParams(`?page=1`);
        }
    }

    const playerSearch = (inputQuery) => {
        setSearchParams(`?term=${inputQuery}&page=1`);
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
            <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px'}}>Players</Typography>
            <Search handleSearch={playerSearch} />
            <PositionSelect positionSelect={positionSelect} />
            
            {isFetching &&
                <LinearLoadingAnimation />
            }
            
            {!isFetching && 
                playerResults.map((result) => {
                    return <PlayerResult key={result._id} player={result} id={result._id} />
                })
            }
            <Paging currPage={page} pageChange={pageChange} totalPages={numberOfPages} />
        </>
    )
}

export default Players;
