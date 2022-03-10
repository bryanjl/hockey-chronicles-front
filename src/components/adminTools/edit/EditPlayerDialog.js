import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";

//APIs
import { updatePlayer as updatePlayerAPI } from "../../../api/players/playersApi";

const useStyles = makeStyles((theme) => ({
    formElem: {
        margin: '5px'
    }
}));

const EditPlayerDialog = ({ player, setPlayer, open, handleClose }) => {
    const classes = useStyles();
    //state for form 
    const [playerFirstName, setPlayerFirstName] = useState(player.firstName);
    const [playerLastName, setPlayerLastName] = useState(player.lastName);
    const [playerHeight, setPlayerHeight] = useState(player.height);
    const [playerWeight, setPlayerWeight] = useState(player.weight);
    const [playerPosition, setPlayerPosition] = useState(player.position);
    const [playerShoots, setPlayerShoots] = useState(player.shoots);

    //state for successful/unsuccessful update
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [unsuccessfulUpdate, setUnsuccessfulUpdate] = useState(false);

    const handleFirstNameChange = (e) => {
        setPlayerFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setPlayerLastName(e.target.value);
    }

    const handleHeightChange = (e) => {
        setPlayerHeight(e.target.value);
    }

    const handleWeightChange = (e) => {
        setPlayerWeight(e.target.value);
    }

    const handlePositionChange = (e) => {
        setPlayerPosition(e.target.value);
    }

    const handleShootsChange = (e) => {
        setPlayerShoots(e.target.value);
    }

    const submitPlayerUpdate = () => {
        let playerInfo = {};
        if(playerFirstName !== player.firstName){
            playerInfo.firstName = playerFirstName;
        }
        if(playerLastName !== player.lastName){
            playerInfo.lastName = playerLastName;
        }
        if(playerHeight !== player.height) {
            playerInfo.height = playerHeight;
        }
        if(playerWeight !== player.weight){
            playerInfo.weight = playerWeight;
        }
        if(playerPosition !== player.position){
            playerInfo.position = playerPosition;
        }
        if(playerShoots !== player.shoots){
            playerInfo.shoots = playerShoots;
        }
        
        updatePlayerAPI(player._id, playerInfo).then(data => {
            if(data.success){
                setSuccessfulUpdate(true);
                setPlayer(data.data);

                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    handleClose();
                }, 2000);
            }
            if(!data.success){
                setUnsuccessfulUpdate(true);

                setTimeout(() => {
                    setUnsuccessfulUpdate(false);
                }, 2000);
            }
        });
    }


  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Player Profile</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Use this form to edit the player's profile.
            </DialogContentText>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.firstName}
                        margin="dense"
                        id="firstName"
                        label="Player's First Name"
                        fullWidth
                        variant="outlined"
                        onChange={handleFirstNameChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.lastName}
                        margin="dense"
                        id="lastName"
                        label="Player's Last Name"
                        fullWidth
                        variant="outlined"
                        onChange={handleLastNameChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.height}
                        margin="dense"
                        id="height"
                        label="Player's Height"
                        fullWidth
                        variant="outlined"
                        onChange={handleHeightChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.weight}
                        margin="dense"
                        id="weight"
                        label="Player's Weight"
                        fullWidth
                        variant="outlined"
                        onChange={handleWeightChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.position}
                        margin="dense"
                        id="position"
                        label="Player's Position"
                        fullWidth
                        variant="outlined"
                        onChange={handlePositionChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={player.shoots}
                        margin="dense"
                        id="shoots"
                        label="Player's Shooting Hand"
                        fullWidth
                        variant="outlined"
                        onChange={handleShootsChange}
                    />
                </Grid>

                {successfulUpdate &&
                    <Alert severity='success'>Player updated</Alert>
                }
                {unsuccessfulUpdate &&
                    <Alert severity='error'>Player cannot be updated</Alert>
                }                
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitPlayerUpdate}>Update Player</Button>
        </DialogActions>
    </Dialog>
    
  )
}

export default EditPlayerDialog;