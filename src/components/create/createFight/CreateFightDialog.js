import { Checkbox, FormControlLabel, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useState } from 'react';
//components for form
import PlayerSearch from '../PlayerSearch';
import FightTypeSelect from '../FightTypeSelect';
import GameTimePicker from '../GameTimePicker';

const useStyles = makeStyles((theme) => ({
  fightDescriptionTextField: {
    marginTop: '15px',
    marginBottom: '15px'
  },
  youtubeLinkTextField: {
    marginTop: '15px',
    marginBottom: '15px'
  }
}));


function CreateFightDialog({game, open, handleClose}) {
  const classes = useStyles();

  return (
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Fight/Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add an event or fight to this game please fill out this form.
          </DialogContentText>
          {/* <DatePickerDesktop gameDate={game.date} /> */}
          <Grid container>
            <Grid item sm={8} xs={12}>
              <FightTypeSelect />
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControlLabel control={<Checkbox />} label="Unfair" />
            </Grid>
            <Grid item xs={12}>
              <GameTimePicker />
            </Grid>
            <Grid item sm={5} xs={12}>
              <PlayerSearch />
            </Grid>
            <Grid item sm={2} xs={12}>
              <Typography align='center'>VS</Typography>
            </Grid>
            <Grid item sm={5} xs={12}>
              <PlayerSearch />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.fightDescriptionTextField} 
                fullWidth
                multiline
                minRows={2}
                id='fight-description' 
                label='Enter a description of the fight/event...' 
                variant='outlined' 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                className={classes.youtubeLinkTextField}
                fullWidth
                id='video-link' 
                label='Enter a link to YouTube...' 
                variant='outlined' 
              />
            </Grid>
          </Grid>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create Fight/Event</Button>
        </DialogActions>
      </Dialog>
    
  );
}

export default CreateFightDialog;