import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import FighterRow from "./FighterRow";
import TeamTabs from "./TeamTabs";
import TeamGameTable from "./TeamGameTable";
import TeamFightTable from "./TeamFightTable";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import CircularLoadingAnimation from "../feedback/CircularLoadingAnimation";
//admin
    //user context
import { UserContext } from "../../contexts/UserContext";  
    //edit team
import EditTeamDialog from "../adminTools/edit/EditTeamDialog";
// import LeagueDisplay from "../leagueProfile/LeagueDisplay";

//Team API
import { 
    getTeam as getTeamAPI,
    getTeamSeasonData as getTeamSeasonDataAPI
} from "../../api/teams/teamsApi";

//url for images based on envrinoment
let imgUrl;
if(process.env.NODE_ENV === 'development'){
    imgUrl = 'http://localhost:5000';
} else {
    imgUrl = 'https://hockey-chronicles-api.herokuapp.com';
}

const useStyles = makeStyles((theme) => ({
    teamImg: {
        maxHeight: '150px'
    },
    leagueImg: { 
        maxHeight: '50px'
    },
    imgContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paperContainer: {
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px',
        borderBottom: '3px solid black',
        borderLeft: '3px solid black',
        borderTop: '3px solid #F74902',
        borderRight: '3px solid #F74902',
    },
    teamNameContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    tableContainer: {
        marginBottom: '25px'
    }
}));

const TeamProfile = () => {

    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

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
        // organizeFighters(teamSeasonFightData);
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
        fetchData(seasonValue);
    }

    //fighters tab
    const organizeFighters = (fights) => {
        console.log(fights)
        let playersObj = {};
        for( let i = 0; i < fights.length; i++ ){
            if(fights[i].players[0].teamId === team._id){
                if(!playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`]){
                    playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`] = [fights[i]];
                } else {
                    playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`].push(fights[i]);
                }
            } else if(fights[i].players[1].teamId === team._id) {
                if(!playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`]){
                    playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`] = [fights[i]];
                } else {
                    playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`].push(fights[i]);
                }
            } else {
                continue;
            }
        }
        console.log(playersObj);
        let playerNameArray = Object.keys(playersObj);
        console.log(playerNameArray);

        return (
            <TableContainer className={classes.tableContainer} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        {/* <TableCell /> */}
                        <TableCell align='left' style={{fontSize: '1.2rem'}}>Fighter</TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {playerNameArray.map((name) => (
                        <FighterRow key={name} playerName={name} row={playersObj[name]} />
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        )
    }

    //administration tools
    const [openEditTeam, setOpenEditPlayer] = useState(false);

    const handleEditTeamOpen = () => {
        setOpenEditPlayer(true);
    }

    const handleEditTeamClose = () => {
        setOpenEditPlayer(false);
    }

    return (
        <>
            {isFetching &&
                <CircularLoadingAnimation />
            }

            {!isFetching && 
            <>
                <Paper className={classes.paperContainer}>
                    <Grid container>
                        <Grid item xs={4}>
                            <img className={classes.teamImg} src={team.teamImageFile ? `${imgUrl}/uploads/teams/${team.teamImageFile}` : `/images/teams/${team.city}${team.name}.png`} alt={`${team.fullName}`} />
                            
                        </Grid>
                        <Grid item xs={6}>
                            <div className={classes.teamNameContainer}>
                                <Typography variant='h3'>{team.fullName}</Typography>
                                {team.yearsActive.length > 0 &&
                                    <Typography variant='body1'>Active Years: {team.yearsActive}</Typography>
                                }
                                
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.imgContainer}>
                                <img className={classes.leagueImg} src={`/images/leagues/${team.league.name}.png`} alt={`${team.league.name}`} />
                            </div>
                            
                        </Grid>
                    </Grid>
                </Paper>

                {(user.role === 'admin' || user.role === 'super') &&
                    <>
                        <Typography>Administration Tools:</Typography>
                        <Button 
                            onClick={handleEditTeamOpen} 
                            fullWidth 
                            variant='contained'
                            style={{ marginBottom: '10px' }}
                        >
                            Edit Team Details
                        </Button>
                        <EditTeamDialog team={team} setTeam={setTeam} open={openEditTeam} handleClose={handleEditTeamClose} />    
                    </>
                }

                
                <SeasonSelect seasonSelect={handleSeasonChange} />
                <TeamTabs setTab={setTab} currTab={selectedTab} /> 

                

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

                {selectedTab === 3 &&
                    organizeFighters(teamSeasonFightData)
                }

                
            </>
            }
        </>
    )
}

export default TeamProfile;


// {selectedTab === 3 &&
//     <TableContainer className={classes.tableContainer} component={Paper}>
//         <Table aria-label="collapsible table">
//             <TableHead>
//             <TableRow>
//                 <TableCell />
//                 <TableCell align='left'>Fighter</TableCell>
//                 {/* <TableCell align="right">Overall  Action</TableCell> */}
                
//             </TableRow>
//             </TableHead>
//             <TableBody>
//             {sortedFights.map((fight) => (
                
//                 <Row key={fight._id} row={fight} player={player} outcomeValue={outcomeValue} />
//             ))}
//             </TableBody>
//         </Table>
//     </TableContainer> 
// }