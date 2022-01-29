import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamTabs from "./TeamTabs";

//Team API
import { 
    getTeam as getTeamAPI
} from "../../api/teams/teamsApi";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import LeagueDisplay from "../leagueProfile/LeagueDisplay";
import GameResult from "../gameProfile/GameResult";
import GameEvent from "../gameProfile/GameEvent";
import SeasonSelect from "../seasonProfile/SeasonSelect";

const useStyles = makeStyles((theme) => ({
    teamImg: {
        maxHeight: '150px'
    }
}));

const TeamProfile = () => {
    //teamId from URL params
    let { teamID } = useParams();

    //styles
    const classes = useStyles();

    //teamProfile State for team DATA
    const [team, setTeam] = useState({});

    //state for tabs
    const [selectedTab, setSelectedTab] = useState(0);

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    //season value state
    const [selectedSeason, setSelectedSeason] = useState('');

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(data => {
            console.log(data);
            data.data.teams.games.sort()
            setTeam(data.data);
            setIsFetching(false);
        });
    }, [teamID]);

    const setTab = (value) => {
        setSelectedTab(value);
    }

    const getSeason = (seasonValue) => {
        // console.log(seasonValue);
        setSelectedSeason(seasonValue);
    }

    return (
        <>
            {!isFetching && 
            <>
                <Grid container>
                    <Grid item xs={12}>
                        
                        <Typography variant='h3'>{team.fullName}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <img className={classes.teamImg} src={`/images/teams/${team.city}${team.name}.png`} alt={`${team.fullName}`} />
                    </Grid>
                    <Grid item xs={6}>
                        <LeagueDisplay league={team.league} />
                    </Grid>
                </Grid>
                
                <TeamTabs setTab={setTab} currTab={selectedTab} />
                <SeasonSelect seasonSelect={getSeason} />
                {selectedTab === 0 &&
                     
                    team.games.map(game => {
                        if(selectedSeason === game.season.season){
                            return <GameResult key={game._id} game={game} />
                        } else {
                            return <></>
                        }
                    })
                    
                }
                {selectedTab === 1 && 
                    team.fights.map(fight => {
                        if(fight.fightType === 'Event'){
                            return <></>;
                        } else {
                            return <GameEvent key={fight._id} event={fight} />
                        }
                        
                    })
                }
            </>
            }
            
        </>
    )
}

export default TeamProfile;
