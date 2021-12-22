import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Team API
import { 
    getTeam as getTeamAPI
} from "../../api/teams/teamsApi";

const TeamProfile = () => {
    //teamId from URL params
    let { teamID } = useParams();

    //teamProfile State for team DATA
    const [team, setTeam] = useState({});

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(data => {
            console.log(data);
            setTeam(data.data);
            setIsFetching(false);
        });
    }, [teamID]);

    return (
        <div>
            <h1>Team Profile</h1>
            {!isFetching && 
            <div>
                <p>{team._id}</p>
                <p>{team.city}</p>            
                <p>{team.name}</p>
                <p>{team.fullName}</p>
                <p>{team.league.name}</p>
                <p>{team.fights}</p>
            </div>
            }
            
        </div>
    )
}

export default TeamProfile;
