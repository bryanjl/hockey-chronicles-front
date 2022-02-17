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
    
}));

const EditGameDialog = ({ fights, setFights, game, open, handleClose }) => {
    console.log(fights)
    const classes = useStyles();

    //states for form
    const [season, setSeason] = useState('');

    const updateGame = () => {

    }

    const handleDeleteFight = (e) => {
        

        //!!!!need to do alert before deleting game
        deleteFightAPI(e.target.parentElement.id).then(response => {
            if(response.success){
                let newFights = fights.filter(elem => {
                    return elem._id !== e.target.parentElement.id;
                });
        
                setFights(newFights);
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
                    <DatePickerDesktop gameDate={game.date} />    
                </Grid>
                
                <Grid className={classes.datePicker} align='right' item sm={6} xs={12}>
                    <SeasonSelect seasonSelect={setSeason} allSeasons={false} currSeason={game.season.season} />   
                </Grid>

                <Grid item sm={5} xs={12}>
                    <TeamSearch team={game.teams[0]} />
                </Grid>
                <Grid className={classes.vsTitle} item sm={2} xs={12}>
                    <Typography>VS</Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                    <TeamSearch team={game.teams[1]} />
                </Grid>
                <Grid className={classes.homeTeamRadio} align='center' item xs={12}>
                    <HomeTeamRadio teams={game.teams} />
                </Grid>
            
                <Grid item xs={12}>
                    <TextField 
                        className={classes.gameTypeTextField}
                        defaultValue={game.gameType}
                        fullWidth
                        id='game-type' 
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
                        label='Enter a description of the game...' 
                        // onChange={handleFightDescriptionChange}
                        variant='outlined' 
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5'>Delete a fight or event</Typography>
                </Grid>
                {fights.map(fight => {
                    console.log(fight);
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