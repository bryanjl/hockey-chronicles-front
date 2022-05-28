import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import { Alert } from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import LeagueSelect from "../../../leagueProfile/LeagueSelect";
import SeasonSelect from "../../../seasonProfile/SeasonSelect";
import TeamSearch from "../../../adminTools/TeamSearch";
import CreateFightDialog from "../../../create/createFight/CreateFightDialog";
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

    const [rerenderKey, setRerenderKey] = useState(1);

    //form state
    const [gameDate, setGameDate] = useState(null);
    const [gameSeason, setGameSeason] = useState('');
    const [gameType, setGameType] = useState('');
    const [gameLeague, setGameLeague] = useState('');
    const [gameHomeTeam, setGameHomeTeam] = useState('');
    const [gameAwayTeam, setGameAwayTeam] = useState('');
    const [gameDescription, setGameDescription] = useState('');

    const [game, setGame] = useState({});

    //success/error state
    const [formError, setFormError] = useState('');
    const [successfulCreate, setSuccessCreate] = useState(false);
    const [unsuccessfulCreate, setUnsuccessCreate] = useState(false);

    const setHomeTeam = (team) => {
        setGameHomeTeam(team);
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
                gameType: `${gameType.charAt(0).toUpperCase() + gameType.slice(1)}`,
                league: gameLeague,
                teams: teamsArr,
                description: gameDescription
            }

            

            createGameAPI(gameInfo).then(response => {
                if(response.success) {
                    setGame(response.data)
                    setSuccessCreate(true);

                    // setTimeout(() => {
                    //     setSuccessCreate(false);
                    // }, 3000);
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

    const clearForm = () => {
        setGameDate(null);
        setGameSeason('');
        setGameType('');
        setGameLeague('');
        setGameHomeTeam('');
        setGameAwayTeam('');
        setGameDescription('');
        setGame({});
        setFormError('');
        setSuccessCreate(false);
        setUnsuccessCreate(false);
        setRerenderKey(rerenderKey+1);
    }

    //Add fight to game
    const [openAddFight, setOpenAddFight] = useState(false);

    const addFight = () => {
        setOpenAddFight(true);
    }

    const handleAddFightClose = () => {
        setOpenAddFight(false);
    }

  return (
      <>
        <Grid container>
                <Grid item xs={12}>
                    <Typography 
                        variant='h5'                        
                        style={{
                            marginBottom: '15px', 
                            marginTop: '15px', 
                            backgroundColor: 'black', 
                            color: 'white', 
                            borderBottom: '3px solid #F74902', 
                            padding: '5px', 
                            width: '100%'
                        }}
                    >
                        Create a New Game</Typography>
                </Grid>
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
                        <SeasonSelect key={rerenderKey} allSeasons={false} seasonSelect={setGameSeason} />
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
                        <LeagueSelect key={rerenderKey} leagueSelect={setGameLeague} formError={formError === 'gameLeague' ? true : false} />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch key={rerenderKey} updateTeam={setHomeTeam} inputLabel='Choose Home Team' />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TeamSearch key={rerenderKey} updateTeam={setAwayTeam} inputLabel='Choose Visiting Team' />
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
                    <>
                    <Alert severity='success'>Game Created</Alert>

                    <Grid item xs={12}>
                        <div className={classes.formMargin}>
                            <Button 
                                fullWidth 
                                variant='outlined'
                                onClick={addFight}
                            >
                                Add a Fight or Event to this Game
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.formMargin}>
                            <Button 
                                fullWidth 
                                variant='outlined'
                                onClick={clearForm}
                            >
                                Create New Game
                            </Button>
                        </div>
                    </Grid>
                    <CreateFightDialog open={openAddFight} handleClose={handleAddFightClose} game={game} />
                    </>
                }
                {unsuccessfulCreate &&
                    <Alert severity="error">Unable to Create Game</Alert>
                }

                {!successfulCreate &&
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
                }
                
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateGame;