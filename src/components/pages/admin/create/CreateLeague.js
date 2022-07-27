import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
//api
import { createLeague as createLeagueAPI } from "../../../../api/leagues/leaguesApi";

const useStyles = makeStyles((theme) => ({
    formMargin: {
        margin: '10px'
    }
}));

const CreateLeague = () => {
    const classes = useStyles();

    //form state
    const [leagueName, setLeagueName] = useState('');
    const [leagueDescription, setLeagueDescription] = useState('');
    const [leagueImageFile, setLeagueImageFile] = useState(null);

    //success/error state
    const [successCreate, setSuccessCreate] = useState(false);
    const [unsuccessfulCreate, setUnsuccessfulCreate] = useState(false);
    const [formError, setFormError] = useState('');

    const handleImageFileChange = (e) => {
        setLeagueImageFile(e.target.files[0]);
    }

    const submitLeague = () => {
        if(leagueName === '') {
            setFormError('leagueName');
        } else {
            let leagueInfo = {
                name: leagueName,
                description: leagueDescription,
                leagueImg: leagueImageFile
            }

            // console.log(leagueInfo)

            createLeagueAPI(leagueInfo).then(response => {
                console.log(response);
                if(response.success){
                    setSuccessCreate(true);

                    setLeagueName('');
                    setLeagueDescription('');
                    setLeagueImageFile(null);

                    setTimeout(() => {
                        setSuccessCreate(false);
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
                >Create a New League</Typography>
            </Grid>
            
        </Grid>

        <FormControl>
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField
                            error={formError === 'leagueName' ? true : false} 
                            helperText={formError === 'leagueName' ? 'Please Enter a League Name' : ''}
                            required
                            fullWidth id='league-name' 
                            value={leagueName} 
                            label='League Name' 
                            onChange={(e) => setLeagueName(e.target.value)}
                        />
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
                            onChange={(e) => setLeagueDescription(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Choose an image to upload</Typography>
                    <div className={classes.formMargin}>
                        <input
                            onChange={handleImageFileChange}
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            type="file"
                        />
                    </div>
                </Grid>
                
                {successCreate && 
                    <Alert severity="success">League Created Successfully</Alert>
                }
                {unsuccessfulCreate &&
                    <Alert severity='error'>Unable to create league</Alert>
                }
                
                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <Button 
                            fullWidth 
                            variant='outlined'
                            onClick={submitLeague}
                        >
                            Create League
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateLeague;