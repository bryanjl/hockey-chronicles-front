import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Alert } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import LeagueSelect from "../../../leagueProfile/LeagueSelect";
import SeasonSelect from "../../../seasonProfile/SeasonSelect";
import TeamSearch from "../../../adminTools/TeamSearch";
//api
import { createGame as createGameAPI } from "../../../../api/games/gamesApi";

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
    const [gameDate, setGameDate] = useState(null);
    const [gameSeason, setGameSeason] = useState('');
    const [gameType, setGameType] = useState('');
    const [gameLeague, setGameLeague] = useState('');
    const [gameHomeTeam, setGameHomeTeam] = useState('');
    const [gameAwayTeam, setGameAwayTeam] = useState('');
    const [gameDescription, setGameDescription] = useState('');

    //success/error state
    const [formError, setFormError] = useState('');
    const [successfulCreate, setSuccessCreate] = useState(false);
    const [unsuccessfulCreate, setUnsuccessCreate] = useState(false);

    const setHomeTeam = (team) => {
        setGameHomeTeam(team);
        console.log(team);
    }

    const setAwayTeam = (team) => {
        setGameAwayTeam(team);
    }

    const submitGame = () => {
        //check if form is empty
        setFormError('');
        if(!gameDate){
            setFormError('gameDate');
        } else if (gameSeason === '') {
            setFormError('gameSeason');
        } else if (gameType === '') {
            setFormError('gameType')
        } else if (gameLeague === '') {
            setFormError('gameLeague');
        } else if (gameHomeTeam === ''){
            setFormError('gameHomeTeam');
        } else if (gameAwayTeam === '') {
            setFormError('gameAwayTeam');
        } else {
            //build array for backend
            let teamsArr = [];
            gameHomeTeam.id = gameHomeTeam._id;
            gameHomeTeam.home = true;
            delete gameHomeTeam._id;

            gameAwayTeam.id = gameAwayTeam._id;
            gameAwayTeam.home = false;
            delete gameAwayTeam._id;

            teamsArr.push(gameHomeTeam);
            teamsArr.push(gameAwayTeam);

            let gameInfo = {
                date: gameDate,
                season: gameSeason,
                gameType: `${gameType.charAt(0).toUpperCase() + gameType.slice(1)} `,
                league: gameLeague,
                teams: teamsArr,
                description: gameDescription
            }

            console.log(gameInfo);

            createGameAPI(gameInfo).then(response => {
                if(response.success) {
                    setSuccessCreate(true);

                    setTimeout(() => {
                        setSuccessCreate(false);
                    }, 3000);
                }
                if(!response.success){
                    setUnsuccessCreate(true);

                    setTimeout(() => {
                        setUnsuccessCreate(false);
                    }, 3000);
                }
            });
        }
    }

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
                                value={gameDate}
                                onChange={(newValue) => {
                                    setGameDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <SeasonSelect allSeasons={false} seasonSelect={setGameSeason} />
                    </div>
                </Grid>
                
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField 
                            fullWidth 
                            id='game-type' 
                            value={gameType} 
                            label='Game Type (Preseason, Regular, etc)'
                            onChange={(e) => setGameType(e.target.value)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <LeagueSelect leagueSelect={setGameLeague} formError={formError === 'gameLeague' ? true : false} />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch updateTeam={setHomeTeam} inputLabel='Choose Home Team' />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch updateTeam={setAwayTeam} inputLabel='Choose Visiting Team' />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <TextField 
                            fullWidth 
                            id='game-description' 
                            value={gameDescription}
                            onChange={(e) => setGameDescription(e.target.value)} 
                            label='Game Description' 
                            variant='outlined'
                            multiline
                            minRows={3}
                        />
                    </div>
                </Grid>
                
                {successfulCreate &&
                    <Alert severity='success'>Game Created</Alert>
                }
                {unsuccessfulCreate &&
                    <Alert severity="error">Unable to Create Game</Alert>
                }

                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <Button 
                            fullWidth 
                            variant='outlined'
                            onClick={submitGame}
                        >
                            Create Game
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateGame;