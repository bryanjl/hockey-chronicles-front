import { Button, FormControl, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import LeagueSelect from "../../../leagueProfile/LeagueSelect";
//API
import { createTeam as createTeamAPI } from "../../../../api/teams/teamsApi";

const useStyles = makeStyles((theme) => ({
    formMargin: {
        margin: '10px'
    }
}));

const CreateTeam = () => {
    const classes = useStyles();

    //form state
    const [teamCity, setTeamCity] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamLeague, setTeamLeague] = useState('');
    const [teamActiveYears, setTeamActiveYears] = useState('');
    const [teamImageFile, setTeamImageFile] = useState(null);

    //success/error state
    const [formError, setFormError] = useState('');
    const [teamCreated, setTeamCreated] = useState(false);
    const [unsuccessfulTeamCreated, setUnsuccessfulTeamCreated] = useState(false);

    const handleImageFileChange = (e) => {
        setTeamImageFile(e.target.files[0]);
    }

    const submitTeam = () => {
        setTeamCreated(false);

        if(teamCity === ''){
            setFormError('teamCity');
        } else if(teamName === ''){
            setFormError('teamName');
        } else if(teamLeague === ''){
            setFormError('teamLeague');
        } else {
            setFormError('');
            
            let teamInfo = {};

            if(teamActiveYears !== ''){
                let activeYearsArr = teamActiveYears.split(' ');
                teamInfo.yearsActive = activeYearsArr;
            }
            if(teamImageFile){
                teamInfo.teamImg = teamImageFile;
            }
        
            //made into form data in api module
            teamInfo.city = teamCity;
            teamInfo.name = teamName;
            teamInfo.league = teamLeague;
    
        
            console.log(teamInfo);

            createTeamAPI(teamInfo).then(response => {
                if(response.success){
                    setTeamCreated(true);

                    console.log(response);

                    setTeamActiveYears('');
                    setTeamCity('');
                    setTeamImageFile(null)
                    setTeamLeague('');
                    setTeamName('');

                    setTimeout(() => {
                        setTeamCreated(false);
                    }, 2000);
                }
                if(!response.success){
                    setUnsuccessfulTeamCreated(true);

                    setTimeout(() => {
                        setUnsuccessfulTeamCreated(false);
                    }, 2000);
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
                >
                    Create a New Team</Typography>
            </Grid>
        </Grid>

        <FormControl>
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField
                            error={formError === 'teamCity' ? true : false}
                            helperText={formError === 'teamCity' ? 'Please enter a city' : ''} 
                            fullWidth 
                            required 
                            id='team-city' 
                            value={teamCity} 
                            label="Team's City"
                            onChange={e => setTeamCity(e.target.value)}
                        />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField
                            error={formError === 'teamName' ? true : false}
                            helperText={formError === 'teamName' ? 'Please enter a team name' : ''} 
                            fullWidth 
                            required 
                            id='team-name' 
                            value={teamName} 
                            label="Team's Name"
                            onChange={e => setTeamName(e.target.value)}
                        />
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <LeagueSelect leagueSelect={setTeamLeague} formError={formError === 'teamLeague' ? true : false} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.formMargin}>
                        <TextField 
                            fullWidth 
                            id='active-years' 
                            value={teamActiveYears} 
                            label='Years Active' 
                            helperText='If multiple sets of years use a space seperated format (1960-1965 1970-1975)'
                            onChange={e => setTeamActiveYears(e.target.value)}
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

                {teamCreated && 
                    <Alert severity="success">Team Created</Alert>
                }
                {unsuccessfulTeamCreated && 
                    <Alert severity="error">Unable to create team</Alert>
                }

                <Grid item xs={12}>
                    <div className={classes.formMargin}>
                        <Button 
                            fullWidth 
                            variant='outlined'
                            onClick={submitTeam}
                        >
                            Create Team
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </FormControl>
    </>
  )
}

export default CreateTeam;