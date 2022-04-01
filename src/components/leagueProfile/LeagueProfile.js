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
} from "../../api/leagues/leaguesApi";

import {
    getAllFights as getAllFightsAPI
} from '../../api/fights/fightApi';

import {
    getAllGames as getAllGamesAPI
} from '../../api/games/gamesApi';


const LeagueProfile = () => {
    
    let { leagueID } = useParams();

    //state for league data
    const [league, setLeague] = useState(0);
    const [seasonSelect, setSeasonSelect] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);

    //state for isfetching from server
    const [isFetching, setIsFetching] = useState(false);

    const [gameData, setGameData] = useState([]);
    const [fightData, setFightData] =useState([]);

    //game table states
    const [gamePage, setGamePage] = useState(0);
    const [totalGameDocuments, setTotalGameDocuments] = useState(0);

    //fight table states
    const [fightPage, setFightPage] = useState(0);
    const [totalFightDocuments, setTotalFightDocuments] = useState(0);

    useEffect(() => {
        setIsFetching(true);
        getLeagueAPI(leagueID).then(response => {
            console.log(response);
            setLeague(response.data);
            setGamePage(1);
            setFightPage(1);
            setIsFetching(false);
        });
        //eslint-disable-next-line
    }, [leagueID]);

    //fetch the game data
    useEffect(() => {
        if(league && selectedTab === 0){
            fetchGameData();
        }
        //eslint-disable-next-line
    }, [gamePage, selectedTab, seasonSelect]);

    //game page change function
    const gamePageChange = (value) => {
        setGamePage(value);
    }

    const fetchGameData = () => {
        setIsFetching(true);
        getAllGamesAPI(`league=${league.name}&season=${seasonSelect}&page=${gamePage}`).then(response => {
            setGameData(response.data);
            setTotalGameDocuments(response.pagination.totalDocuments);
            setIsFetching(false);
        });
    }

    //fetch the fight data
    useEffect(() => {
        if(league && selectedTab === 1){
            fetchFightData();
        }
        // eslint-disable-next-line
    }, [fightPage, selectedTab, seasonSelect]);

    //fight page change function
    const fightPageChange = (value) => {
        setFightPage(value);
    }

    const fetchFightData = () => {
        setIsFetching(true);
        getAllFightsAPI(`league=${league.name}&season=${seasonSelect}&page=${fightPage}`).then(response => {
            setFightData(response.data);
            setTotalFightDocuments(response.pagination.totalDocuments);
            setIsFetching(false);
        });
    }

    const handleSeasonSelect = (seasonValue) => {
        console.log(seasonValue);
        setSeasonSelect(seasonValue);
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
                        <LeagueGameTable seasonData={gameData} pageChange={gamePageChange} totalDocuments={totalGameDocuments} currPage={gamePage} />
                    } 
                    {selectedTab === 1 &&
                        <LeagueFightTable seasonData={fightData} pageChange={fightPageChange} totalDocuments={totalFightDocuments} currPage={fightPage} />
                    }
                </>                      
            }
        </>
    )
}

export default LeagueProfile;