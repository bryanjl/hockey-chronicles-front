import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
//api
import { setFeaturedFight as setFeaturedFightAPI } from '../../../../api/fights/fightApi';

const useStyles = makeStyles((theme) => ({
    formMargin: {
        margin: '10px'
    },
    featuredFightBtn: {
        height: '50px'
    }
}));


const ChooseFeaturedFight = () => {
    const classes = useStyles();

    const [fightID, setFightID] = useState('');
    const [updateSuccessful, setUpdateSuccessful] = useState(false);
    const [updateUnsuccessful, setUpdateUnsuccessful] = useState(false);

    const submitFeaturedFight = () => {
        let reqBody = {
            fightId: fightID
        }
        console.log(reqBody);
        setFeaturedFightAPI(reqBody).then(response => {
            if(response.success){
                setUpdateSuccessful(true);

                setTimeout(() => {
                    setUpdateSuccessful(false);
                }, 4000);
            }else{
                setUpdateUnsuccessful(true);

                setTimeout(() => {
                    setUpdateUnsuccessful(false);
                }, 4000);
            }
        });
    }

  return (
    <>
        <Grid container>
            <div className={classes.formMargin}>
                <Grid item xs={12}>
                    <Typography variant='h5'>Choose a Featured Fight</Typography>
                </Grid>
            </div>
            <div className={classes.formMargin}>
                <Grid item xs={12}>
                    <Typography variant='body'>
                        When you find a fight you would like to be featured copy the ID from the URL.  It will
                        look like '623621e02bc848364a09a339'.  Paste the ID into the text field below and submit the featured fight.
                    </Typography>
                </Grid>
            </div>
        </Grid>

        
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField   
                            fullWidth 
                            id='fight-id' 
                            value={fightID} 
                            label='Fight ID'
                            onChange={(e) => setFightID(e.target.value)} 
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <Button
                            className={classes.featuredFightBtn}
                            onClick={submitFeaturedFight}
                            fullWidth
                            variant='outlined'
                        >
                            Submit Featured Fight
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {updateSuccessful &&
                        <Alert severity="success">Featured Fight has been updated</Alert>
                    }
                    {updateUnsuccessful &&
                        <Alert severity="error">Cannot update at this time</Alert>
                    }
                </Grid>
            </Grid>
        
    </>
  )
}

export default ChooseFeaturedFight;