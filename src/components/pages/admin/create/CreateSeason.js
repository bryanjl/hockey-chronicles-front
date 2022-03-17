import { Button, makeStyles } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Alert, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import LeagueSelect from "../../../leagueProfile/LeagueSelect";
//api
import { createSeason as createSeasonAPI } from "../../../../api/seasons/seasonsApi";

const useStyles = makeStyles((theme) => ({
    formText: {
        margin: '10px'
    },
    yearPicker: {
        minWidth: '300px'
    }
}));

const CreateSeason = () => {
    const classes= useStyles();

    //form states
    const [beginningYear, setBeginningYear] = useState('');
    const [endingYear, setEndingYear] = useState('');
    const [seasonLeague, setSeasonLeague] = useState('');

    //state for success/error
    const [formError, setFormError] = useState('');
    const [alreadyExistsError, setAlreadyExistsError] = useState(false);
    const [successfulCreate, setSuccessfulCreate] = useState(false);
    const [unsuccessfulCreate, setUnsuccessfulCreate] = useState(false);

    const handleDateChange = (newValue) => {
        setBeginningYear(newValue);
        let date = new Date(newValue);
        date.setFullYear(date.getFullYear() + 1);
        setEndingYear(date);
    }

    const submitSeason = () => {
        setFormError('');
        if(beginningYear === ''){
            setFormError('beginningYear');
        } else if(seasonLeague === '') {
            setFormError('seasonLeague');
        } else {
            setFormError('');

            let season = `${beginningYear.getFullYear()}-${endingYear.getFullYear()}`;
            let seasonInfo = {
                season: season,
                league: seasonLeague
            }

            setAlreadyExistsError(false);
            createSeasonAPI(seasonInfo).then(response => {
                if(!response.success && response.msg === 'Season already exists'){
                    setAlreadyExistsError(true);

                    setTimeout(() => {
                        setAlreadyExistsError(false);
                    }, 5000);
                } else if(!response.success && response.msg !== 'Season already exists'){
                    setUnsuccessfulCreate(true);

                    setTimeout(() => {
                        setUnsuccessfulCreate(false);
                    }, 3000);
                } else {
                    setSuccessfulCreate(true);

                    setTimeout(() => {
                        setSuccessfulCreate(false);
                        setBeginningYear(null);
                        setEndingYear(null);
                    }, 3000);
                }
            });
        }
    }

  return (
      <>
    <Grid container>
        <Grid item xs={12}>
            <Typography variant='h6'>Create a New Season</Typography>
        </Grid>
    </Grid>

        
        <Grid container>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={5}>
                        <div className={classes.formText}>
                            {/* <TextField id='beginning-year' value={beginningYear} label='Beginning Year' /> */}
                            <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    error={formError === 'beginningYear' ? true : false}
                                    label="Choose Beginning Year"
                                    views={['year']}
                                    value={beginningYear}
                                    onChange={(newValue) => {

                                        handleDateChange(newValue);
                                       
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                        </div>
                    </Grid>
                    <Grid item xs={2} align='center'>
                        <div className={classes.formText}>
                            <Typography variant='h3'>-</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className={classes.formText}>
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    
                                    disabled
                                    label="Choose Ending Year"
                                    views={['year']}
                                    value={endingYear}
                                    onChange={(newValue) => {
                                        setEndingYear(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                        </div>
                    </Grid>
                </Grid>
            </Grid>

                <Grid item xs={6} align='right'>
                    <div className={classes.formText}>
                        <LeagueSelect leagueSelect={setSeasonLeague} formError={formError === 'seasonLeague' ? true : false} />
                    </div>
                </Grid>

        </Grid>

        {alreadyExistsError && 
            <Alert severity="error">This season already exists</Alert>
        }
        {successfulCreate && 
            <Alert severity="success">Season Created</Alert>
        }
        {unsuccessfulCreate &&
            <Alert severity="error">Server Error - Try again later</Alert>
        }

        <Grid container>
            <Grid item xs={12}>
                <Button 
                    fullWidth 
                    variant='outlined'
                    onClick={submitSeason}
                >
                    Create Season
                </Button>
            </Grid>
        </Grid>
    
    </>
  )
}

export default CreateSeason;