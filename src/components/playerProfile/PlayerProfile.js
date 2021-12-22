import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    getPlayer as getPlayerAPI 
} from "../../api/players/playersApi";

const PlayerProfile = () => {
    let { playerID } = useParams();

    //state for player data
    const [player, setPlayer] = useState({});

    //state for isfetchng from API
    const [isFetching, setIsFetching] = useState(true); 

    useEffect(() => {
        setIsFetching(true);
        getPlayerAPI(playerID).then(data => {
            console.log(data);
            setPlayer(data.data);
            setIsFetching(false);
        });
    }, [playerID]);

    return (
        <div>
            <h1>Player Profile Page</h1>
            {!isFetching && 
                <div>
                    <p>{player.firstName} {player.lastName}</p>
                    <p>Position: {player.position} Shoots: {player.shoots}</p>
                    <p>Height: {player.height} Weight: {player.weight}</p>
                    <p>W-L-D: {player.wins}-{player.losses}-{player.draws}</p>
                    <p>Action Rating: {player.actionRating.average} {player.actionRating.votes}</p>
                    <p>Unfair: {player.unfairTally}</p>
                    {player.fights.map(fight => {
                        return <p>Fight Date: {fight.date} Fight Type: {fight.fightType}</p>
                    })}
                </div>
            }
        </div>
    )
}

export default PlayerProfile;
