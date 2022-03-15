import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import LeagueSelect from "../../../leagueProfile/LeagueSelect";
import SeasonSelect from "../../../seasonProfile/SeasonSelect";
import TeamSearch from "../../../adminTools/TeamSearch";

const useStyles = makeStyles((theme) => ({
    formMargin: {
        margin: '10px'
    },
    datePicker: {
        minWidth: '100%'
    }
}));

const CreateGame = () => {
    const classes = useStyles();

    //form state
    const [dateValue, setDateValue] = useState(null);
    const [gameType, setGameType] = useState('');
    const [gameLeague, setGameLeague] = useState('');
    const [gameSeason, setGameSeason] = useState('');
    const [gameDescription, setGameDescription] = useState('');
    

  return (
      <>
        <Grid container>
            <div className={classes.formMargin}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Create a New Game</Typography>
                </Grid>
            </div>
        </Grid>

        <FormControl>
            <Grid container>
                
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                            <DatePicker
                                className={classes.datePicker}
                                label="Choose Date"
                                value={dateValue}
                                onChange={(newValue) => {
                                setDateValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <SeasonSelect allSeasons={false} />
                    </div>
                </Grid>
                
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField fullWidth id='game-type' value={gameType} label='Game Type (Preseason, Regular, etc)' />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <LeagueSelect />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch inputLabel='Choose Home Team' />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch inputLabel='Choose Visiting Team' />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <TextField 
                            fullWidth 
                            id='game-description' 
                            value={gameDescription} 
                            label='Game Description' 
                            variant='outlined'
                            multiline
                            minRows={3}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <Button fullWidth variant='outlined'>Create Game</Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateGame;