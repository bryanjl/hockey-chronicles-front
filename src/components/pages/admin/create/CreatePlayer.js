import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
//api
import { createPlayer as createPlayerAPI } from "../../../../api/players/playersApi";


const useStyles = makeStyles((theme) => ({
    formText: {
        margin: '10px'
    }
}));

const CreatePlayer = () => {
    const classes = useStyles();

    //formState
    const [playerFirstName, setPlayerFirstName] = useState('');
    const [playerLastName, setPlayerLastName] = useState('');
    const [playerNickname, setPlayerNickname] = useState('');
    const [playerActiveYears, setPlayerAcitiveYears] = useState('');
    const [playerPosition, setPlayerPosition] = useState('');
    const [playerShoots, setPlayerShoots] = useState('');
    const [playerWeight, setPlayerWeight] = useState('');
    const [playerHeight, setPlayerHeight] = useState('');
    const [playerImageFile, setPlayerImageFile] = useState(null);

    //success/error state
    const [formError, setFormError] = useState('');
    const [playerCreated, setPlayerCreated] = useState(false);
    const [unsuccessfulCreate, setUnsuccessfulCreate] = useState(false);

    const handleImageFileChange = (e) => {
        setPlayerImageFile(e.target.files[0]);
    }

    const submitPlayer = () => {
        setFormError('');
        if(playerFirstName === ''){
            setFormError('firstName');
        } else if(playerLastName === ''){
            setFormError('lastName');
        } else {
            setFormError('');
            //active years
            let activeYearArr = playerActiveYears.split(' ');

            let playerInfo = {
                firstName: playerFirstName,
                lastName: playerLastName,
                nickname: playerNickname,
                position: playerPosition,
                shoots: playerShoots,
                weight: playerWeight,
                height: playerHeight,
                yearsActive: activeYearArr,
                playerImg: playerImageFile
            };

            createPlayerAPI(playerInfo).then(response => {
                if(response.success){
                    setPlayerCreated(true);
                
                    setPlayerAcitiveYears('');
                    setPlayerFirstName('');
                    setPlayerHeight('');
                    setPlayerImageFile(null);
                    setPlayerLastName('');
                    setPlayerNickname('');
                    setPlayerPosition('');
                    setPlayerShoots('');
                    setPlayerWeight('');

                    setTimeout(() => {
                        setPlayerCreated(false);
                    }, 3000);
                }
                if(!response.success){
                    setUnsuccessfulCreate(true);

                    setTimeout(() => {
                        setUnsuccessfulCreate(false);
                    }, 3000);
                }

            });
        }
    }

  return (
    <>
        <Grid container>
            <Grid item xs={12}>
                <Typography 
                    variant='h6'
                    style={{
                        marginBottom: '15px', 
                        marginTop: '15px', 
                        backgroundColor: 'black', 
                        color: 'white', 
                        borderBottom: '3px solid #F74902', 
                        padding: '5px', 
                        width: '100%'
                    }}
                >Create a New Player</Typography>
            </Grid>
        </Grid>

        <FormControl>
            <Grid container>
                
                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField
                            error={formError === 'firstName' ? true : false}
                            helperText={formError === 'firstName' ? 'Please enter a first name' : ''} 
                            fullWidth 
                            required 
                            id='first-name' 
                            value={playerFirstName} 
                            label='First Name'
                            onChange={e => setPlayerFirstName(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            error={formError === 'lastName' ? true : false}
                            helperText={formError === 'lastName' ? 'Please enter a last name' : ''} 
                            fullWidth 
                            required 
                            id='last-name' 
                            value={playerLastName} 
                            label='Last Name' 
                            onChange={e => setPlayerLastName(e.target.value)}
                        />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            fullWidth 
                            id='nickname' 
                            value={playerNickname} 
                            label="Player's Nickname" 
                            onChange={e => setPlayerNickname(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            fullWidth 
                            id='active-years' 
                            value={playerActiveYears} 
                            label='Years Active' 
                            helperText='If multiple sets of years use a space seperated format (1960-1965 1970-1975)'
                            onChange={e => setPlayerAcitiveYears(e.target.value)}
                        />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            fullWidth 
                            id='position' 
                            value={playerPosition} 
                            label="Player's Position" 
                            onChange={e => setPlayerPosition(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formText}>
                    <FormControl fullWidth>
                        <InputLabel id="player-shoots-label">Player's Shooting Hand</InputLabel>
                        <Select
                            labelId="player-shoots-label"
                            id="player-shoots"
                            value={playerShoots}
                            onChange={e => setPlayerShoots(e.target.value)}
                        >
                            <MenuItem value='Left'>Left</MenuItem>
                            <MenuItem value='Right'>Right</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            fullWidth 
                            id='weight' 
                            value={playerWeight} 
                            label="Player's Weight" 
                            onChange={e => setPlayerWeight(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formText}>
                        <TextField 
                            fullWidth 
                            id='height' 
                            value={playerHeight} 
                            label="Player's Height" 
                            onChange={e => setPlayerHeight(e.target.value)}
                        />
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant='h6'>Choose an image to upload</Typography>
                    <div className={classes.formText}>
                        <input
                            onChange={handleImageFileChange}
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            type="file"
                        />
                    </div>
                </Grid>
                {playerCreated && 
                    <Alert severity="success">Player Created</Alert>
                }
                {unsuccessfulCreate &&
                    <Alert severity='error'>Unable to Create Player</Alert>
                }
                <Grid item xs={12}>
                    <div className={classes.formText}>
                        <Button 
                            fullWidth 
                            variant='outlined'
                            onClick={submitPlayer}
                        >
                            Create Player
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>  
    </>
  )
}

export default CreatePlayer;