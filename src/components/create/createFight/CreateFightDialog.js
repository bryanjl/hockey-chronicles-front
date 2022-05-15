import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Alert } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import { createFight as createFightAPI } from '../../../api/fights/fightApi';
//components for form
import PlayerSearch from '../PlayerSearch';
import FightTypeSelect from '../FightTypeSelect';
import GameTimePicker from '../GameTimePicker';
import TeamSearch from '../../adminTools/TeamSearch';
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
  },
  teamPlayerContainer: {
    // border: '1px solid black'
  }
}));


function CreateFightDialog({ gameFights, setGameFights = null, game, open, handleClose }) {
  const classes = useStyles();

  //form states
  const [fightType, setFightType] = useState('Fight');
  const [gameTime, setGameTime] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player1Team, setPlayer1Team] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player2Team, setPlayer2Team] = useState('');
  const [fightDescription, setFightDescription] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  //form success
  const [successCreate, setSuccessCreate] = useState(false);

  const createFightSubmit = () => {
    let player1Info = player1;
    player1Info.teamId = player1Team._id;
    let player2Info = player2;
    player2Info.teamId = player2Team._id;
    let players = [player1Info, player2Info];
    
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

    // console.log(fightInfo);
    submitToApi(fightInfo);
    
    // console.log(fightInfo);
  }

  const submitToApi = (fightInfo) => {
    createFightAPI(fightInfo).then(data => {
      if(data.success){
        setSuccessCreate(true);

        setTimeout(() => {
          setSuccessCreate(false);
          handleClose();
        }, 2000);
      }
      if(setGameFights !== null) {
        let newFights = [...gameFights, data.data];
        setGameFights(newFights);
      }      
      
    });
  }

  const handleFightDescriptionChange =(e) => {
    setFightDescription(e.target.value);
  }

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  }

  const handlePlayer1TeamChange = (value, prevTeam = null) => {
    console.log(value);
    setPlayer1Team(value);
  }

  const handlePlayer2TeamChange = (value, prevTeam = null) => {
    console.log(value);
    setPlayer2Team(value);
  }

  return (
    <>
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
              <div style={{border: '1px solid gray', width: '100%', marginTop: '10px', padding: '3px'}}>
                <Grid container>
                  <Typography variant='body1'>Choose the player and the team they fought for:</Typography>
                <Grid item sm={5} xs={12}>
                  <div className={classes.teamPlayerContainer}>
                    <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer1} />
                    {/* <Typography variant='body1' style={{paddingLeft:'5px', marginTop: '5px', marginBottom: '5px'}}>fought for:</Typography> */}
                    <TeamSearch gameTeams={game.teams} updateTeam={handlePlayer1TeamChange} team={null} />
                    
                    
                  </div>
                </Grid>
                <Grid className={classes.vsText} item sm={2} xs={12}>
                  <Typography align='center'>VS</Typography>
                </Grid>
                <Grid item sm={5} xs={12}>
                  <div className={classes.teamPlayerContainer}>
                    <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer2} />
                    {/* <Typography variant='body1' style={{paddingLeft:'5px', marginTop: '5px', marginBottom: '5px'}}>fought for:</Typography> */}
                    <TeamSearch gameTeams={game.teams} updateTeam={handlePlayer2TeamChange} team={null}/>
                    
                  </div>
                  
                </Grid>
                </Grid>
              </div>
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
          {successCreate &&
            <Alert severity="success">Fight Added to Game</Alert>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createFightSubmit}>Create Fight/Event</Button>
        </DialogActions>
      </Dialog>
      
      
    </>
  );
}

export default CreateFightDialog;