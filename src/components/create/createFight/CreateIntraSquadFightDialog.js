import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Alert } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { createFight as createFightAPI } from '../../../api/fights/fightApi';
//components for form
import PlayerSearch from '../PlayerSearch';
import FightTypeSelect from '../FightTypeSelect';
import GameTimePicker from '../GameTimePicker';
// import TeamSearch from '../../adminTools/TeamSearch';
import { useState } from 'react';
import SeasonSelect from '../../seasonProfile/SeasonSelect';


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


function CreateIntraSquadFightDialog({ team, open, handleClose }) {
    const classes = useStyles();

    //form states
    const [fightType, setFightType] = useState('Fight');
    const [fightTime, setFightTime] = useState('');
    const [fightDate, setFightDate] = useState('');
    const [season, setSeason] = useState('');
    const [player1, setPlayer1] = useState('');
    //   const [player1Team, setPlayer1Team] = useState(team.id);
    const [player2, setPlayer2] = useState('');
    //   const [player2Team, setPlayer2Team] = useState(team.id);
    const [tookPlaceAt, setTookPlaceAt] = useState('')
    const [fightDescription, setFightDescription] = useState('');
    const [youtubeLink, setYoutubeLink] = useState('');

  //form success
  const [successCreate, setSuccessCreate] = useState(false);

  const createFightSubmit = () => {
    let player1Info = player1;
    player1Info.teamId = team._id;
    let player2Info = player2;
    player2Info.teamId = team._id;
    let players = [player1Info, player2Info];
    
    let fightInfo = {
      league: team.league.name,
      season: season,
      teams: [team],
      date: fightDate,
      fightType: fightType,
      time: fightTime,
      videoLink: youtubeLink,
      tookPlaceAt,
      players
    }

    if(fightType === 'Event') {
      fightInfo.eventDescription = fightDescription;
    } else {
      fightInfo.description = fightDescription;
    //   fightInfo.players = players;
    }

    console.log(fightInfo);
    submitToApi(fightInfo);
    
    // console.log(fightInfo);
  }

  const submitToApi = (fightInfo) => {
    createFightAPI(fightInfo).then(data => {
      if(data.success){
        setSuccessCreate(true);
        console.log(data);
        setTimeout(() => {
          setSuccessCreate(false);
          handleClose();
        }, 2000);
      }
    //   if(setGameFights !== null) {
    //     let newFights = [...gameFights, data.data];
    //     setGameFights(newFights);
    //   }      
      
    });
  }

  const handleFightDescriptionChange =(e) => {
    setFightDescription(e.target.value);
  }

  const handleYoutubeLinkChange = (e) => {
    setYoutubeLink(e.target.value);
  }

//   const handlePlayer1TeamChange = (value, prevTeam = null) => {
//     console.log(value);
//     setPlayer1Team(value);
//   }

//   const handlePlayer2TeamChange = (value, prevTeam = null) => {
//     console.log(value);
//     setPlayer2Team(value);
//   }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create an Intra-Squad Fight/Event</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        To add an event or fight to this team please fill out this form.
                    </DialogContentText>
                    <Grid container>
{/* FIGHT-TYPE SELECT */}
                        <Grid style={{ paddingRight: '5px' }} className={classes.fightTypeSelect} item xs={6}>
                            <FightTypeSelect setFormFightType={setFightType} />
                        </Grid>
{/* TOOK-PLACE-AT-SELECT */}
                        <Grid style={{ paddingLeft: '5px' }} className={classes.fightTypeSelect} item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="took-place-at-select">Took Place at</InputLabel>
                                <Select
                                    labelId="took-place-at-select"
                                    id="took-place-at-simple-select"
                                    value={tookPlaceAt}
                                    label="Took Place at"
                                    onChange={(e) => {
                                        setTookPlaceAt(e.target.value)
                                    }}
                                >
                                    <MenuItem value={'Training Camp'}>Training Camp</MenuItem>
                                    <MenuItem value={'Rookie Camp'}>Rookie Camp</MenuItem>
                                    <MenuItem value={'Practice'}>Practice</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
{/* DATE PICKER */}
                        <Grid style={{ marginTop: '10px', marginBottom: '10px' }} item xs={6}>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        className={classes.datePicker}
                                        label="Choose Date"
                                        value={fightDate}
                                        onChange={(newValue) => {
                                            setFightDate(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </div>
                        </Grid>
{/* TIME PICKER */}
                        <Grid style={{ marginTop: '10px', marginBottom: '10px' }} item xs={6}>
                            <GameTimePicker setFormGameTime={setFightTime} />
                        </Grid>
{/* SEASON SELECT */}
                        <Grid style={{paddingLeft: '100px', paddingRight: '100px', marginTop: '10px', marginBottom: '10px'}} item xs={12}>
                            <SeasonSelect seasonSelect={setSeason} />
                        </Grid>
{/* PLAYER SELECT */}
                        {fightType !== 'Event' &&
                            <Grid item xs={12}>
                                <div style={{ border: '1px solid gray', width: '100%', marginTop: '10px', padding: '3px' }}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant='body1'>Choose the players:</Typography>
                                        </Grid>
                                        
                                        <Grid style={{paddingBottom: '20px', paddingLeft: '5px'}} item xs={5}>
                                            {/* <div className={classes.teamPlayerContainer}> */}
                                                <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer1} />
                                                {/* <TeamSearch gameTeams={game.teams} updateTeam={handlePlayer1TeamChange} team={null} /> */}
                                            {/* </div> */}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography align='center'>VS</Typography>
                                        </Grid>
                                        <Grid style={{paddingBottom: '20px', paddingRight: '5px'}} item xs={5}>
                                            {/* <div className={classes.teamPlayerContainer}> */}
                                                <PlayerSearch className={classes.playerSearch} setFormPlayer={setPlayer2} />
                                                {/* <TeamSearch gameTeams={game.teams} updateTeam={handlePlayer2TeamChange} team={null} /> */}
                                            {/* </div> */}
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        }
{/* FIGHT DESCRIPTION */}
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
{/* VIDEO LINK */}
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

export default CreateIntraSquadFightDialog;