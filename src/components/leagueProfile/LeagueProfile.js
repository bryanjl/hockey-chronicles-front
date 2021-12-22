import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { 
    getLeague as getLeagueAPI 
} from "../../api/leagues/leaguesApi";

const LeagueProfile = () => {
    let { leagueID } = useParams();

    //state for league data
    const [league, setLeague] = useState({});

    //state for isfetching from server
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getLeagueAPI(leagueID).then(data => {
            console.log(data);
            setLeague(data.data);
            setIsFetching(false);
        });
    }, [leagueID]);

    return (
        <div>
            <h1>League Profile</h1>
            {!isFetching && 
                <div>
                    <p>{league.name}</p>
                    {league.fights.map(fight => {
                        return (<p>{fight.date} {fight.fightType}</p>)
                    })}
                </div>
            }            
        </div>
    )
}

export default LeagueProfile;
