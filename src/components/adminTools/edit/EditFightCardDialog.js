import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import PlayerSearch from "../../create/PlayerSearch";
import GameTimePicker from "../../create/GameTimePicker";
import FightTypeSelect from "../../create/FightTypeSelect";
//APIs
import { updateFight as updateFightAPI } from "../../../api/fights/fightApi";

const EditFightCardDialog = ({ fight, setFight, open, handleClose }) => {
    // console.log('rerender', fight);
    //state for form values
    const [player1, setPlayer1] = useState(fight.players[0] || 'no player');
    const [player2, setPlayer2] = useState(fight.players[1] || 'no player')
    const [fightDescription, setFightDescription] = useState(fight.description);
    const [youtubeLink, setYoutubeLink] = useState(fight.videoLink);
    const [gameTime, setGameTime] = useState(fight.time);
    const [fightType, setFightType] = useState(fight.fightType);
    const [eventDescription, setEventDescription] =useState(fight.eventDescription);

    //state for successful/unsuccessful update
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [unsuccessfulUpdate, setUnsuccessfulUpdate] = useState(false);
    
    
    const handleDescriptionChange = (e) => {
        setFightDescription(e.target.value);        
    }

    const handleYoutubeLinkChange = (e) => {
        setYoutubeLink(e.target.value);
    }

    const submitUpdate = () => {
        let fightInfo = {};
        //set players for fightupdate
        //newPlayer = player to change to
        //oldPlayer = player being removed
        //possible error -> both players changed at the same time
        let players;
        if(fight.players.length > 0 || (player1 !== 'no player' && player2 !== 'no player')){
            if(player1.id !== fight.players[0].id && player1._id !== fight.players[0].id){
                player1.id = player1._id;
                delete player1._id;
                players = {
                    oldPlayer: fight.players[0],
                    newPlayer: player1
                }
            }
            if(player2.id !== fight.players[1].id && player2._id !== fight.players[1].id){
                player2.id = player2._id;
                delete player2._id;
                players = {
                    oldPlayer: fight.players[1],
                    newPlayer: player2
                }
            }
        }
        
        // console.log(players);
        if(players){
            fightInfo.players = players;
        }
        if(fightDescription !== fight.description) {
            fightInfo.description = fightDescription;            
        }
        if(youtubeLink !== fight.videoLink){
            fightInfo.videoLink = youtubeLink;
        }
        if(gameTime !== fight.time){
            fightInfo.time = gameTime;
        }
        if(fightType !== fight.fightType){
            fightInfo.fightType = fightType;
        }
        if(eventDescription !== fight.eventDescription){
            fightInfo.eventDescription = eventDescription;
        }
        updateFightAPI(fightInfo, fight._id).then(data => {
            console.log(data);
            if(data.success){
                setSuccessfulUpdate(true);

                setFight(data.data);

                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    handleClose();
                }, 2000);
            }

            if(!data.success) {
                setUnsuccessfulUpdate(true);

                setTimeout(() => {
                    setUnsuccessfulUpdate(false);
                }, 2000);
            }
        });
    }
  return (

    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Fight Card</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Use this form to edit the details of the fight.
            </DialogContentText>
            <Grid container>
                <Grid item xs={12}>
                    <FightTypeSelect setFormFightType={setFightType} currFightType={fightType} />
                </Grid>
                {fightType === 'Event' && 
                    <TextField
                        value={eventDescription}
                        margin="dense"
                        id="eventDescription"
                        label="Type of Event (Injury, Brawl, etc)"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setEventDescription(e.target.value)}
                    />
                }
                <Grid item sm={6} xs={12}>
                    <PlayerSearch player={fight.players[0]} setFormPlayer={setPlayer1} />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <PlayerSearch player={fight.players[1]} setFormPlayer={setPlayer2} />        
                </Grid>
                <Grid item xs={12}>
                    <GameTimePicker setFormGameTime={setGameTime} currentTime={fight.time} />
                </Grid>
            
            
                <Grid item xs={12}>
                    <TextField
                        defaultValue={fight.description}
                        margin="dense"
                        id="fightDescription"
                        label="Enter a description for the fight or event"
                        fullWidth
                        variant="outlined"
                        multiline
                        minRows={3}
                        onChange={handleDescriptionChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        id='video-link' 
                        defaultValue={fight.videoLink}
                        label='Enter a link to YouTube...'
                        onChange={handleYoutubeLinkChange} 
                        variant='outlined' 
                    />
                </Grid>
                {successfulUpdate &&
                    <Alert severity='success'>Fight/Event updated</Alert>
                }
                {unsuccessfulUpdate &&
                    <Alert severity='error'>Fight/Event cannot be updated</Alert>
                }                
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitUpdate}>Update Fight/Event</Button>
        </DialogActions>
    </Dialog>
    
  )
}

export default EditFightCardDialog;