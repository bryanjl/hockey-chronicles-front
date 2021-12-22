import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
    getSeason as getSeasonAPI 
} from "../../api/seasons/seasonsApi";

const SeasonProfile = () => {
    let { seasonID } = useParams();

    //state for season data
    const [season, setSeason] = useState({});

    //state for fetching
    const [isFetching, setIsfetching] = useState(true);

    useEffect(() => {
        setIsfetching(true);
        getSeasonAPI(seasonID).then(data => {
            console.log(data);
            setSeason(data.data);
            setIsfetching(false);
        });
    }, [seasonID]);

    return (
        <div>
            <h1>Season Profile</h1>            
            {!isFetching && 
                <div>
                    <p>{season.season}</p>
                    <p>{season.fights.map(fight => {
                        return (<p>{fight.date} {fight.fightType}</p>)
                    })}</p>
                </div>
            }
        </div>
    )
}

export default SeasonProfile
