import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
//form components
import DatePickerDesktop from '../DatePickerDesktop';
import TeamSearch from "../TeamSearch";
// import HomeTeamRadio from "../HomeTeamRadio";
import SeasonSelect from "../../seasonProfile/SeasonSelect";
import { useState } from "react";
//APIs
import { deleteFight as deleteFightAPI } from "../../../api/fights/fightApi";
import { updateGame as updateGameAPI } from "../../../api/games/gamesApi";


const useStyles = makeStyles((theme) => ({
    gameTypeTextField: {
        marginTop: '15px'
    },
    gameDescriptionTextField: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    homeTeamRadio: {
        marginTop: '15px'
    },
    datePicker: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    vsTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fightPaper: {
        padding: '10px',
        display: 'flex'
    },
    deleteIcon: {
        cursor: 'pointer'
    }
}));

const EditGameDialog = ({ fights, setFights, game, open, handleClose }) => {
    // console.log(fights)
    const classes = useStyles();

    //states for form
    const [season, setSeason] = useState(game.season.season);
    const [dateOfGame, setDateOfgame] = useState(game.date);
    const [gameTeams, setGameTeams] = useState(game.teams);
    const [typeOfGame, setTypeOfGame] = useState(game.gameType);
    const [gameDescription, setGameDescription] = useState(game.description);


    //successful delete state
    const [deleteSuccessful, setDeleteSuccessful] = useState(false);
    const [deleteUnsuccessful, setDeleteUnsuccessful] = useState(false);

    //succesful updategame
    const[updateSuccessful, setUpdateSuccessful] = useState(false);
    const[updateUnsuccessful, setUpdateUnsuccessful] = useState(false);

    const updateGame = () => {
        let gameInfo = {};

        if(season !== game.season.season){
            gameInfo.season = season;
        }
        if(dateOfGame !== game.date){
            gameInfo.date = dateOfGame;
        }
        if(gameTeams !== game.teams){
            gameInfo.teams = gameTeams;
        }
        if(typeOfGame !== game.gameType){
            gameInfo.gameType = typeOfGame;
        }
        if(gameDescription !== game.description) {
            gameInfo.description = gameDescription;
        }

        console.log(gameInfo);

        updateGameAPI(game._id, gameInfo).then(response => {
            console.log(response);
            if(response.success === true){
                setUpdateSuccessful(true);
                setSeason(response.data.season);
                setDateOfgame(response.data.date);
                setGameTeams(response.data.teams);
                setTypeOfGame(response.data.gameType);
                setGameDescription(response.data.description);

                setTimeout(() => {
                    setUpdateSuccessful(false);
                    handleClose();
                }, 2000);
            } else {
                setUpdateUnsuccessful(true);
                setTimeout(() => {
                    setUpdateUnsuccessful(false);
                    handleClose();
                }, 2000);
            }
        });        
    }

    const updateTeams = (newTeam, oldTeam) => {
        console.log(newTeam, oldTeam)
        let teams = [...gameTeams];
        let newTeams = teams.filter(team => 
            team.id !== oldTeam.id
        );
        newTeam.id = newTeam._id;
        delete newTeam._id;
        newTeams.push(newTeam);
        console.log(newTeams);

        setGameTeams(newTeams);
    }

    // const updateHomeTeam = (teamId) => {
    //     // console.log(teamId);
    //     let teams = [...gameTeams];
    //     if(teams[0].id === teamId){
    //         teams[0].home = true;
    //         teams[1].home = false;
    //     } else {
    //         teams[1].home = true;
    //         teams[0].home = false;
    //     }
    //     setGameTeams(teams);
    // }

    const handleGameTypeChange = (e) => {
        setTypeOfGame(e.target.value);
    }

    const handleGameDescriptionChange = (e) => {
        setGameDescription(e.target.value);
    }

    const handleDeleteFight = (e) => {
        
        let confirmed = window.confirm('Are you sure you want to delete this event? It will be permanently removed from the database')

        if(confirmed){
            deleteFightAPI(e.target.parentElement.id).then(response => {
                if(response.success){
                    let newFights = fights.filter(elem => {
                        return elem._id !== e.target.parentElement.id;
                    });
                    setDeleteSuccessful(true);
                    setFights(newFights);
                    setTimeout(() => {
                        setDeleteSuccessful(false);
                    }, 1500);
                } else {
                    setDeleteUnsuccessful(true);
                    setTimeout(() => {
                        setDeleteSuccessful(false);
                    }, 2500);
                }
            });
        }        
    }

    return (
        <Dialog open={open} onClose={handleClose} disableEnforceFocus>
            <DialogTitle>Edit Game</DialogTitle>
            <DialogContent>
            <DialogContentText >
                Use this form to edit the game details
            </DialogContentText>
            
            <Grid container>
                <Grid className={classes.datePicker} align='left' item sm={6} xs={12}>
                    <DatePickerDesktop gameDate={game.date} setDate={setDateOfgame} />    
                </Grid>
                
                <Grid className={classes.datePicker} align='right' item sm={6} xs={12}>
                    <SeasonSelect seasonSelect={setSeason} allSeasons={false} currSeason={game.season.season} />   
                </Grid>

                <Grid item sm={5} xs={12}>
                    <TeamSearch team={game.teams[0]} updateTeam={updateTeams} />
                </Grid>
                <Grid className={classes.vsTitle} item sm={2} xs={12}>
                    <Typography>VS</Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <TeamSearch team={game.teams[1]} updateTeam={updateTeams} />
                </Grid>
                {/* <Grid className={classes.homeTeamRadio} align='center' item xs={12}>
                    <HomeTeamRadio teams={gameTeams} updateHomeTeam={updateHomeTeam} />
                </Grid> */}
            
                <Grid item xs={12}>
                    <TextField 
                        className={classes.gameTypeTextField}
                        defaultValue={game.gameType}
                        fullWidth
                        id='game-type' 
                        onChange={handleGameTypeChange}
                        label='Enter a game type(Regular, Round 1, Final, etc)...'
                        // onChange={handleYoutubeLinkChange} 
                        variant='outlined' 
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField
                        className={classes.gameDescriptionTextField} 
                        defaultValue={game.description}
                        fullWidth
                        multiline
                        minRows={2}
                        id='game-description' 
                        onChange={handleGameDescriptionChange}
                        label='Enter a description of the game...' 
                        // onChange={handleFightDescriptionChange}
                        variant='outlined' 
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5'>Delete a fight or event</Typography>
                </Grid>
                {fights.length > 0 &&
                    fights.map(fight => {
                        // console.log(fight);
                        if(fight.fightType === 'Event'){
                            return (
                                <Grid item xs={12}>
                                    <Paper key={fight._id} className={classes.fightPaper}>
                                        
                                        <Grid item xs={10}>
                                            <Typography >{fight.eventDescription}</Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <DeleteIcon className={classes.deleteIcon} id={fight._id} onClick={handleDeleteFight} />
                                        </Grid>
                                        
                                    </Paper>
                                </Grid>
                            )
                        }
                        return (
                            <Grid item xs={12}>
                                <Paper key={fight._id} className={classes.fightPaper}>
                                    
                                    <Grid item xs={10}>
                                        <Typography>{fight.players[0].lastName} vs. {fight.players[1].lastName}</Typography>    
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DeleteIcon className={classes.deleteIcon} id={fight._id} onClick={handleDeleteFight} />
                                    </Grid> 
                                    
                                </Paper>
                            </Grid>
                        )
                    })}
                    {deleteSuccessful && 
                        <Alert severity='success'>Fight/Event successfully deleted</Alert>
                    }
                    {deleteUnsuccessful && 
                        <Alert severity="error">Unable to delete - Try again later</Alert>
                    }
                    {updateSuccessful &&
                        <Alert severity="success">Game has been updated</Alert>                        
                    }
                    {updateUnsuccessful &&
                        <Alert severity="error">Game could not be updated at this time - Try again later</Alert>                        
                    }
            </Grid>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={updateGame}>Update Game</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditGameDialog;