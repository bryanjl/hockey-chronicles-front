import { makeStyles } from "@material-ui/core";
import { FormControl, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import CreateGameInput from "./CreateGameInput";

const useStyles = makeStyles((theme) => ({
    formText: {
        margin: '10px'
    }
}));

const CreateSeason = () => {
    const classes= useStyles();

    //form states
    const [beginningYear, setBeginningYear] = useState('');
    const [endingYear, setEndingYear] = useState('');
    const [leagueName, setLeagueName] = useState('');
    const [numberOfGames, setNumberOfGames] = useState(10);

    let gameArray = [];
    
    const createGameArray = () => {
        
        for (let index = 0; index < numberOfGames; index++) {
            gameArray.push(index);
            
        }
    }
    createGameArray();

  return (
      <>
    <Grid container>
        <Grid item xs={12}>
            <Typography variant='h6'>Create a New Season</Typography>
        </Grid>
    </Grid>
        <FormControl
        margin='normal'
        variant='outlined'
        
        >
        
        <Grid container>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={5}>
                        <div className={classes.formText}>
                            <TextField id='beginning-year' value={beginningYear} label='Beginning Year' />
                        </div>
                    </Grid>
                    <Grid item xs={2} align='center'>
                        <div className={classes.formText}>
                            <Typography variant='h3'>-</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.formText}>
                            <TextField id='ending-year' value={endingYear} label='Ending Year' />
                        </div>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={6} align='right'>
                <div className={classes.formText}>
                    <TextField id='league' value={leagueName} label='League Name' />
                </div>
            </Grid>
            <Grid item xs={12}>
                <div className={classes.formText}>
                    <TextField id='num-of-games' value={numberOfGames} label='Number of Games' />
                </div>
            </Grid>
            </Grid>
        </FormControl>

        {
            gameArray.map(game => {
                return (
                    <CreateGameInput key={game} />
                )
            })
        
        }
    
    </>
  )
}

export default CreateSeason;