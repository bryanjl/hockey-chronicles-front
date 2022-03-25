import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamTabs from "./TeamTabs";
import TeamGameTable from "./TeamGameTable";
import TeamFightTable from "./TeamFightTable";
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import LeagueDisplay from "../leagueProfile/LeagueDisplay";
import SeasonSelect from "../seasonProfile/SeasonSelect";


//Team API
import { 
    getTeam as getTeamAPI,
    getTeamSeasonData as getTeamSeasonDataAPI
} from "../../api/teams/teamsApi";

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
    //state for rivals
    const [teamRivals, setTeamRivals] = useState({});

    //state for tabs
    const [selectedTab, setSelectedTab] = useState(0);

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(response => {
            setTeam(response.data);
            
            setIsFetching(false);
            
        });
    }, [teamID]);

    const setTab = (value) => {
        setSelectedTab(value);
        getRivals(teamSeasonGameData);
    }

    const getRivals = (allGames) => {
        let unsortedRivals = {};
        allGames.forEach(game => {
            if(game.teams[0].city !== team.city){
                if(!unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`]){
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] = game.fights.length;    
                } else {
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] += game.fights.length;
                }
                
            } else if(game.teams[1].city !== team.city) {
                if(!unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`]){
                    unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`] = game.fights.length;    
                } else {
                    unsortedRivals[`${game.teams[1].city} ${game.teams[1].name}`] += game.fights.length;
                }
            }
        });
        let sortedRivals = [];
        for(let item in unsortedRivals) {
            sortedRivals.push([item, unsortedRivals[item]]);
        }
        sortedRivals.sort((a, b) => {
            return b[1] - a[1];
        });
        setTeamRivals(sortedRivals);
    }

    const [teamSeasonGameData, setTeamSeasonGameData] = useState([]);
    const [teamSeasonFightData, setTeamSeasonFightData] = useState([]);

    const fetchData = (seasonValue) => {
        getTeamSeasonDataAPI(teamID, seasonValue).then(response => {
            setTeamSeasonGameData(response.data.games);
            setTeamSeasonFightData(response.data.fights);
        })
    }

    const handleSeasonChange = (seasonValue) => {
        console.log(seasonValue);
        fetchData(seasonValue);
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

                <SeasonSelect seasonSelect={handleSeasonChange} />

                {selectedTab === 0 && 
                    <TeamGameTable seasonData={teamSeasonGameData} />
                }

                {selectedTab === 1 &&
                    <TeamFightTable seasonData={teamSeasonFightData} />
                }

                {selectedTab === 2 && 
                    <TableContainer sx={{maxHeight: 440, overflow: 'hidden'}} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Team</TableCell>
                                <TableCell align="right">Fights</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { 
                                teamRivals.map((rival) => (
                                <TableRow
                                    key={rival[0]}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {rival[0]}
                                    </TableCell>
                                    <TableCell align="right">{rival[1]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </>
            }
        </>
    )
}

export default TeamProfile;
