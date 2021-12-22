import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { 
    getGame as getGameAPI 
} from "../../api/games/gamesApi";

const GameProfile = () => {
    let { gameID } = useParams();

    //state for game data
    const [game, setGame] = useState({});

    //state for fetching from API
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getGameAPI(gameID).then(data => {
            console.log(data);
            setGame(data.data);
            setIsFetching(false);
        });
    }, [gameID]);

    return (
        <div>
            <h1>Game Profile Page</h1>
            {!isFetching &&
                <div>
                    <p>{game.date}</p>
                    <p>{game.league.name}</p>
                    <p>{game.season.season}</p>
                    <p>{game.gameType}</p>
                    <p>{game.teams[0].city} {game.teams[0].name}</p>
                    <p>{game.teams[1].city} {game.teams[1].name}</p>
                    <p>{game.teams[0].city} {game.teams[0].name}</p>
                    <p>{game.fights}</p>
                </div>
            }     
        </div>
    )
}

export default GameProfile
