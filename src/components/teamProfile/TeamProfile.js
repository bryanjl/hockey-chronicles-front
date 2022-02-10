import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TeamTabs from "./TeamTabs";
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import LeagueDisplay from "../leagueProfile/LeagueDisplay";
import SeasonSelect from "../seasonProfile/SeasonSelect";

//Team API
import { 
    getTeam as getTeamAPI
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
    //state for games in teams
    const [teamGames, setTeamGames] = useState([]);
    //state for fights for teams
    const [teamFights, setTeamFights] = useState([]);
    //state for rivals
    const [teamRivals, setTeamRivals] = useState({});

    //state for tabs
    const [selectedTab, setSelectedTab] = useState(0);

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(data => {
            console.log(data);
            
            data.data.games.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            data.data.fights = data.data.fights.filter((fight) => {
                return fight.players.length !== 0;
            })
            data.data.fights.sort((a, b) => {
                return new Date(a.date) - new Date(b.date)
            });
            setTeam(data.data);
            setTeamGames(data.data.games);
            setTeamFights(data.data.fights);
            getRivals(data.data.games);
            setIsFetching(false);
        });
        //eslint-disable-next-line
    }, [teamID]);

    const setTab = (value) => {
        setSelectedTab(value);
    }

    const getSeason = (seasonValue) => {
        // console.log(seasonValue);
        // setSelectedSeason(seasonValue);
        if(seasonValue === ''){
            setTeamGames(team.games);
            setTeamFights(team.fights);
        } else {
            let filteredGames = team.games.filter((game) => {
                return game.season.season === seasonValue;
            });
            setTeamGames(filteredGames);
    
            let filteredFights = team.fights.filter((fight) => {
                return fight.season.season === seasonValue;
            });
            setTeamFights(filteredFights);
        }
    }

    const getRivals = (allGames) => {
        let unsortedRivals = {};
        allGames.forEach(game => {
            // console.log(game.fights.length)
            if(game.teams[0].city !== team.city){
                if(!unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`]){
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] = game.fights.length;    
                } else {
                    unsortedRivals[`${game.teams[0].city} ${game.teams[0].name}`] += game.fights.length;
                }
                
            } else {
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

                {selectedTab !== 2 && 
                    <SeasonSelect seasonSelect={getSeason} />
                }


                
                {selectedTab === 0 &&
                   <TableContainer sx={{maxHeight: 440, overflow: 'hidden'}} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                
                    
                                <TableCell align="right">Opponent</TableCell>
                                <TableCell align="right">No. of Events</TableCell>
                                
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                {teamGames.map((game) => (
                                <TableRow
                                    key={game._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {new Date(game.date.split('T')[0]).toLocaleString().split(',')[0]}
                                    </TableCell>
                                    <TableCell align="right">{game.teams[0].city === team.city ? <Link to={`/teams/${game.teams[1].id}`} >{`${game.teams[1].city} ${game.teams[1].name}`}</Link> : <Link to={game.teams[0].id}>{`${game.teams[0].city} ${game.teams[0].name}`}</Link>}</TableCell>
                                    <TableCell align='right'>{game.fights.length}</TableCell>
                                    
                                    <TableCell align="right"><Link to={`/games/${game._id}`} >View Game</Link></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                }
                {selectedTab === 1 && 


                    <TableContainer sx={{maxHeight: 440, overflow: 'hidden'}} component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Opponents</TableCell>
                                <TableCell align="right">Outcome</TableCell>
                                <TableCell align="right">Action</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { 
                                teamFights.map((fight) => (
                                <TableRow
                                    key={fight._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {new Date(fight.date.split('T')[0]).toLocaleString().split(',')[0]}
                                    </TableCell>
                                    <TableCell align="right">{`${fight.players[0].lastName} vs ${fight.players[1].lastName}`}</TableCell>
                                    <TableCell align="right">
                                        
                                    </TableCell>
                                    <TableCell align="right">{fight.actionRating.average === 0 ? `` : fight.actionRating.average}</TableCell>
                                    <TableCell align="right"><Link to={`/fights/${fight._id}`} >View Fight</Link></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
