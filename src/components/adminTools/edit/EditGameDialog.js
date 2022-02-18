import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
//form components
import DatePickerDesktop from '../DatePickerDesktop';
import TeamSearch from "../TeamSearch";
import HomeTeamRadio from "../HomeTeamRadio";
import SeasonSelect from "../../seasonProfile/SeasonSelect";
import { useState } from "react";
//APIs
import { deleteFight as deleteFightAPI } from "../../../api/fights/fightApi";
import { Alert } from "@mui/material";

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

    const updateGame = () => {
        let gameInfo = {
            date: dateOfGame,
            season,
            teams: gameTeams,
            gameType: typeOfGame,
            description: gameDescription
        }
        console.log(gameInfo);
    }

    const updateTeams = (newTeam, oldTeam) => {
        let teams = [...gameTeams];
        let newTeams = teams.filter(team => {
            return team.id !== oldTeam.id;
        });
        newTeam.id = newTeam._id;
        delete newTeam._id;
        newTeams.push(newTeam);

        setGameTeams(newTeams);
    }

    const updateHomeTeam = (teamId) => {
        // console.log(teamId);
        let teams = [...gameTeams];
        if(teams[0].id === teamId){
            teams[0].home = true;
            teams[1].home = false;
        } else {
            teams[1].home = true;
            teams[0].home = false;
        }
        setGameTeams(teams);
    }

    const handleGameTypeChange = (e) => {
        setTypeOfGame(e.target.value);
    }

    const handleGameDescriptionChange = (e) => {
        setGameDescription(e.target.value);
    }

    const handleDeleteFight = (e) => {
        

        //!!!!need to do alert before deleting game
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

    return (
        <Dialog open={open} onClose={handleClose}>
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
                <Grid className={classes.homeTeamRadio} align='center' item xs={12}>
                    <HomeTeamRadio teams={game.teams} updateHomeTeam={updateHomeTeam} />
                </Grid>
            
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
                                            <DeleteIcon id={fight._id} onClick={handleDeleteFight} />
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
                                        <DeleteIcon id={fight._id} onClick={handleDeleteFight} />
                                    </Grid> 
                                    
                                </Paper>
                            </Grid>
                        )
                    })}
                    {deleteSuccessful && 
                        <Alert severity='success'>Game/Event successfully deleted</Alert>
                    }
                    {deleteUnsuccessful && 
                        <Alert severity="error">Unable to delete - Try again later</Alert>
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