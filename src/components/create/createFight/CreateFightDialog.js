import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createFight as createFightAPI } from '../../../api/fights/fightApi';
//components for form
import PlayerSearch from '../PlayerSearch';
import FightTypeSelect from '../FightTypeSelect';
import GameTimePicker from '../GameTimePicker';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  fightDescriptionTextField: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  youtubeLinkTextField: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  playerSearch: {
    margin: '15px'
  },
  vsText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fightTypeSelect: {
    marginTop: '15px'
  }
}));


function CreateFightDialog({ gameFights, setGameFights, game, open, handleClose }) {
  const classes = useStyles();

  //form states
  const [fightType, setFightType] = useState('');
  const [gameTime, setGameTime] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [fightDescription, setFightDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const createFightSubmit = () => {
    let players = [player1, player2];
    
    let fightInfo = {
      league: game.league,
      season: game.season,
      teams: game.teams,
      date: game.date,
      game: game._id,
      fightType: fightType,
      time: gameTime,
      videoLink: youtubeLink
    }

    if(fightType === 'Event') {
      fightInfo.eventDescription = fightDescription;
    } else {
      fightInfo.description = fightDescription;
      fightInfo.players = players;
    }

    console.log(fightInfo);
    submitToApi(fightInfo);
    handleClose();
    // console.log(fightInfo);
  }

  const submitToApi = (fightInfo) => {
    createFightAPI(fightInfo).then(data => {
      let newFights = [...gameFights, data.data];
      console.log(newFights);
      setGameFights(newFights);
    });
  }

  const handleFightDescriptionChange =(e) => {
    setFightDescription(e.target.value);
  }

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value)
    
  }

  return (
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Fight/Event</DialogTitle>
        <DialogContent>
          <DialogContentText >
            To add an event or fight to this game please fill out this form. If you are creating an event such as "Bench-Clearing Brawl" please choose event from "Fight Type" and describe the event in the description.
          </DialogContentText>
          {/* <DatePickerDesktop gameDate={game.date} /> */}
          <Grid container>
            <Grid className={classes.fightTypeSelect} item sm={8} xs={12}>
              <FightTypeSelect setFormFightType={setFightType} />
            </Grid>
            {/* <Grid item sm={4} xs={12}>
              <FormControlLabel control={<Checkbox />} label="Unfair" />
            </Grid> */}
            <Grid item xs={12}>
              <GameTimePicker setFormGameTime={setGameTime} />
            </Grid>
            {fightType !== 'Event' &&
              <>
                <Grid item sm={5} xs={12}>
                  <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer1} />
                </Grid>
                <Grid className={classes.vsText} item sm={2} xs={12}>
                  <Typography align='center'>VS</Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                  <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer2} />
                </Grid>
              </>
            }
            <Grid item xs={12}>
              <TextField
                className={classes.fightDescriptionTextField} 
                fullWidth
                multiline
                minRows={2}
                id='fight-description' 
                label='Enter a description of the fight/event...' 
                onChange={handleFightDescriptionChange}
                variant='outlined' 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                className={classes.youtubeLinkTextField}
                fullWidth
                id='video-link' 
                label='Enter a link to YouTube...'
                onChange={handleYoutubeLinkChange} 
                variant='outlined' 
              />
            </Grid>
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createFightSubmit}>Create Fight/Event</Button>
        </DialogActions>
      </Dialog>
    
  );
}

export default CreateFightDialog;