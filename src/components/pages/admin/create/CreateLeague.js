import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    formMargin: {
        margin: '10px'
    }
}));

const CreateLeague = () => {
    const classes = useStyles();

    //form state
    const [leagueName, sestLeagueName] = useState('');
    const [leagueDescription, setLeagueDescription] = useState('')

  return (
    <>
        <Grid container>
            <div className={classes.formMargin}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Create a New League</Typography>
                </Grid>
            </div>
        </Grid>

        <FormControl>
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField fullWidth id='league-name' value={leagueName} label='League Name' />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <TextField 
                            fullWidth 
                            id='league-description' 
                            value={leagueDescription} 
                            label='League Description' 
                            multiline
                            minRows={3}
                            variant='outlined'
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Choose an image to upload</Typography>
                    <div className={classes.formMargin}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            type="file"
                        />
                    </div>
                </Grid>
                
                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <Button fullWidth variant='outlined'>Create League</Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateLeague;