import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueDisplay from "./LeagueDisplay";
import LeagueTabs from "./LeagueTabs";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import LeagueGameTable from "../leagueProfile/LeagueGameTable";
import LeagueFightTable from "./LeagueFightTable";
import CircularLoadingAnimation from "../feedback/CircularLoadingAnimation";

// api
import { 
    getLeague as getLeagueAPI, 
    getLeagueSeasonData as getLeagueSeasonDataAPI 
} from "../../api/leagues/leaguesApi";

const LeagueProfile = () => {
    
    let { leagueID } = useParams();

    //state for league data
    const [league, setLeague] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetching from server
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        getLeagueAPI(leagueID).then(response => {
            setLeague(response.data);
            setIsFetching(false);
        });
    }, [leagueID]);

    const [seasonGameData, setSeasonGameData] = useState([]);
    const [seasonFightData, setSeasonFightData] =useState([]);

    const fetchData = (seasonValue) => {
        getLeagueSeasonDataAPI(leagueID, seasonValue).then(response => {
            console.log(response)
            setSeasonGameData(response.data.games);
            setSeasonFightData(response.data.fights);
        })
    }

    const handleSeasonSelect = (seasonValue) => {
        console.log(seasonValue);
        fetchData(seasonValue);
    }

    return (
        <>
            {isFetching &&
                <CircularLoadingAnimation />
            }
            { !isFetching &&
                <>
                    <LeagueDisplay league={league} />
                    <LeagueTabs currTab={selectedTab} setTab={setSelectedTab} />
                    <SeasonSelect seasonSelect={handleSeasonSelect} allSeasons={false} />

                    {selectedTab === 0 &&
                        <LeagueGameTable seasonData={seasonGameData} />
                    } 
                    {selectedTab === 1 &&
                        <LeagueFightTable seasonData={seasonFightData} />
                    }
                  </>                      
            }
        </>
    )
}

export default LeagueProfile;



