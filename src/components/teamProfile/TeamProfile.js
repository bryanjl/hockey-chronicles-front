import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import FighterRow from "./FighterRow";
import RivalRow from "./RivalRow";
import TeamStats from "./TeamStats";
import TeamTabs from "./TeamTabs";
import TeamGameTable from "./TeamGameTable";
import TeamFightTable from "./TeamFightTable";
import IntraFightTable from "./IntraFightTable";
import SeasonSelect from "../seasonProfile/SeasonSelect";
import CircularLoadingAnimation from "../feedback/CircularLoadingAnimation";
//admin
    //user context
import { UserContext } from "../../contexts/UserContext";  
    //edit team
import EditTeamDialog from "../adminTools/edit/EditTeamDialog";
import CreateIntraSquadFightDialog from "../create/createFight/CreateIntraSquadFightDialog";
//utils
import { getFightCount, getHighestAction, getMostRecent } from '../../utils/stats';

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
    const [teamRivals, setTeamRivals] = useState([]);

    //state for tabs
    const [selectedTab, setSelectedTab] = useState(0);

    //state for fetching
    const [isFetching, setIsFetching] = useState(true);

    //current season
    const [season, setSeason] = useState('')

    useEffect(() => {
        setIsFetching(true);
        getTeamAPI(teamID).then(response => {
            setTeam(response.data);
            
            setIsFetching(false);
            
        });
    }, [teamID]);

    const setTab = (value) => {
        setSelectedTab(value);
        // getRivals(teamSeasonGameData);
        // organizeFighters(teamSeasonFightData);
    }

    const getRivals = (allFights) => {
        let unsortedRivals = {};
        allFights.forEach(fight => {
            if(fight.teams.length === 1){
                return;
            }
            if(fight.teams[0].city !== team.city){
                if(!unsortedRivals[`${fight.teams[0].city} ${fight.teams[0].name}`]){
                    unsortedRivals[`${fight.teams[0].city} ${fight.teams[0].name}`] = {
                        count: 1,
                        fights: [fight],
                        id: fight.teams[0].id
                    };    
                } else {
                    unsortedRivals[`${fight.teams[0].city} ${fight.teams[0].name}`].count += 1;
                    unsortedRivals[`${fight.teams[0].city} ${fight.teams[0].name}`].fights.push(fight);
                }
                
            } else if(fight.teams[1].city !== team.city) {
                if(!unsortedRivals[`${fight.teams[1].city} ${fight.teams[1].name}`]){
                    unsortedRivals[`${fight.teams[1].city} ${fight.teams[1].name}`] = {
                        count: 1,
                        fights: [fight],
                        id: fight.teams[1].id
                    };    
                } else {
                    unsortedRivals[`${fight.teams[1].city} ${fight.teams[1].name}`].count += 1;
                    unsortedRivals[`${fight.teams[1].city} ${fight.teams[1].name}`].fights.push(fight);
                }
            }
        });
        let sortedRivals = [];
        for(let item in unsortedRivals) {
            sortedRivals.push([item, unsortedRivals[item]]);
        }
        sortedRivals.sort((a, b) => {
            return b[1].count - a[1].count;
        });
        setTeamRivals(sortedRivals);
    }

    const [teamSeasonGameData, setTeamSeasonGameData] = useState([]);
    const [teamSeasonFightData, setTeamSeasonFightData] = useState([]);

    const fetchData = (seasonValue) => {
        getTeamSeasonDataAPI(teamID, seasonValue).then(response => {
            console.log(response)
            setTeamSeasonGameData(response.data.games);
            setTeamSeasonFightData(response.data.fights);
            getRivals(response.data.fights);
        })
    }

    const handleSeasonChange = (seasonValue) => {
        fetchData(seasonValue);
        setSeason(seasonValue);
    }

    //fighters tab
    const organizeFighters = (fights) => {
        let playersObj = {};
        for( let i = 0; i < fights.length; i++ ){
            if(fights[i].players.length === 0){
                continue;
            }
            if(!('teamId' in fights[i].players[0]) && !('teamId' in fights[i].players[1])){
                continue;
            }
            if(('teamId' in fights[i].players[0]) && fights[i].players[0].teamId === team._id){
                if(!playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`]){
                    playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`] = [fights[i]];
                } else {
                    playersObj[`${fights[i].players[0].firstName} ${fights[i].players[0].lastName}`].push(fights[i]);
                }
            } else if(('teamId' in fights[i].players[0]) && fights[i].players[1].teamId === team._id) {
                if(!playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`]){
                    playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`] = [fights[i]];
                } else {
                    playersObj[`${fights[i].players[1].firstName} ${fights[i].players[1].lastName}`].push(fights[i]);
                }
            } else {
                continue;
            }
        }
        let playerNameArray = Object.keys(playersObj);

        if(playerNameArray.length === 0){
            return
        }else{
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
    }

    const intraSquadFights = () => {
        let intraFights = [];

        teamSeasonFightData.forEach(fight => {
            if(fight.teams.length === 1){
                intraFights.push(fight);
            }
        })

        return (
            <IntraFightTable seasonData={intraFights} />
        )
    }

    //administration tools
    const [openEditTeam, setOpenEditPlayer] = useState(false);
    const [openAddIntraSquadFight, setOpenAddIntraSquadFight] = useState(false);

    const handleEditTeamOpen = () => {
        setOpenEditPlayer(true);
    }

    const handleEditTeamClose = () => {
        setOpenEditPlayer(false);
    }

    const handleIntraSquadFightOpen = () => {
        setOpenAddIntraSquadFight(true);
    }

    const handleIntraSquadFightClose = () => {
        setOpenAddIntraSquadFight(false);
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
                        <div style={{ width: '50%', margin: 'auto', padding: '25px' }}>
                            <Typography>Administration Tools:</Typography>
                            <Button
                                onClick={handleEditTeamOpen}
                                fullWidth
                                variant='contained'
                                style={{ marginBottom: '10px' }}
                            >
                                Edit Team Details
                            </Button>
                            <Button
                                onClick={handleIntraSquadFightOpen}
                                fullWidth
                                variant='contained'
                                style={{ marginBottom: '10px' }}
                            >
                                Add an Intra-Squad Fight 
                            </Button>
                            <EditTeamDialog team={team} setTeam={setTeam} open={openEditTeam} handleClose={handleEditTeamClose} />
                            <CreateIntraSquadFightDialog team={team} open={openAddIntraSquadFight} handleClose={handleIntraSquadFightClose} />
                        </div>
                    </>
                    }

                    <Typography style={{paddingLeft: '5px', marginBottom: '10px'}}>Select A Season:</Typography>
                    <SeasonSelect seasonSelect={handleSeasonChange} />

                    <Typography align='center' variant="h6" style={{backgroundColor: 'black', color: '#F74902', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>{season === '' ? `Select a Season to see Fights and Games` : `Stats for ${season} Season`}</Typography>

                    {
                        teamSeasonFightData.length !== 0 &&
                        <TeamStats fightCount={getFightCount(teamSeasonFightData)} highestAction={getHighestAction(teamSeasonFightData)} mostRecent={getMostRecent(teamSeasonFightData)} />
                    }

                    <TeamTabs setTab={setTab} currTab={selectedTab} />

                    {selectedTab === 0 &&
                        <TeamGameTable seasonData={teamSeasonGameData} />
                    }

                    {selectedTab === 1 &&
                        <TeamFightTable seasonData={teamSeasonFightData} />
                    }

                    {selectedTab === 2 &&
                        intraSquadFights()
                    }

                    {selectedTab === 3 &&
                    <>
                    <TableContainer className={classes.tableContainer} component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell align='left'>Team</TableCell>
                                <TableCell align='center'>Fights</TableCell>
                                <TableCell />                                  
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {teamRivals.length !== 0 &&
                            teamRivals.map((fight) => (
                                
                                <RivalRow key={fight[0]} row={fight} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> 
                </>
                    }

                    {selectedTab === 4 &&
                        organizeFighters(teamSeasonFightData)
                    }
                </>
            }
        </>
    )
}

export default TeamProfile;