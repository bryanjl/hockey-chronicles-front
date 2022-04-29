import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";

//APIs
import { updateTeam as updateTeamAPI } from "../../../api/teams/teamsApi";
import LeagueSelect from "../../leagueProfile/LeagueSelect";

const useStyles = makeStyles((theme) => ({
    formElem: {
        margin: '5px'
    },
    formInput: {
        margin: '10px'
    }
}));

const EditTeamDialog = ({ team, setTeam, open, handleClose }) => {
    const classes = useStyles();
    //state for form 
    const [teamCity, setTeamCity] = useState(team.city);
    const [teamName, setTeamName] = useState(team.name);
    const [teamLeague, setTeamLeague] = useState(team.league.name);
    const [teamYearsActive, setTeamYearsActive] = useState(team.yearsActive);
    const [teamImgFile, setTeamImgFile] = useState(null);

    //state for successful/unsuccessful update
    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [unsuccessfulUpdate, setUnsuccessfulUpdate] = useState(false);

    const handleTeamCityChange = (e) => {
        setTeamCity(e.target.value);
    }

    const handleTeamNameChange = (e) => {
        setTeamName(e.target.value);
    }

    const handleTeamLeagueChange = (leagueValue) => {
        setTeamLeague(leagueValue);
    }

    const handleYearsActiveChange = (e) => {
        setTeamYearsActive(e.target.value);
    }

    const handleTeamImgChange = (e) => {
        setTeamImgFile(e.target.files[0]);
    }

    const submitTeamUpdate = () => {
        let fdTeamInfo = new FormData();
  
        if(teamCity !== team.city){
            fdTeamInfo.append('city', teamCity);
        }
        if(teamName !== team.name){
            fdTeamInfo.append('name', teamName);
        }
        if(teamLeague !== team.league.name) {
            fdTeamInfo.append('league', teamLeague);
        }
        if(teamYearsActive !== team.yearsActive){
            fdTeamInfo.append('yearsActive', teamYearsActive);
        }
        if(teamImgFile !== null){
            fdTeamInfo.append('teamImg', teamImgFile);
        }

        updateTeamAPI(team._id, fdTeamInfo).then(data => {
            if(data.success){
                setSuccessfulUpdate(true);
                setTeam(data.data.team);

                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    handleClose();
                }, 2000);
            }
            if(!data.success){
                setUnsuccessfulUpdate(true);

                setTimeout(() => {
                    setUnsuccessfulUpdate(false);
                }, 2000);
            }
        });
    }


  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Team Profile</DialogTitle>
        <DialogContent>
            <DialogContentText>
            Use this form to edit the player's profile.
            </DialogContentText>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={team.city}
                        margin="dense"
                        id="teamCity"
                        label="Team's City"
                        fullWidth
                        variant="outlined"
                        onChange={handleTeamCityChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={team.name}
                        margin="dense"
                        id="teamName"
                        label="Team's Name"
                        fullWidth
                        variant="outlined"
                        onChange={handleTeamNameChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <LeagueSelect leagueSelect={handleTeamLeagueChange} value={team.league.name} />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.formElem}
                        defaultValue={team.yearsActive}
                        margin="dense"
                        id="teamYearsActive"
                        label="Team's Active Years"
                        fullWidth
                        variant="outlined"
                        onChange={handleYearsActiveChange}
                    />
                </Grid>
                <Grid item xs={6}>
                <div className={classes.formInput}>
                    <Typography style={{ marginBottom: '5px' }} variant='body1'>Choose Team Image</Typography>
                        <input
                            onChange={handleTeamImgChange}
                            accept="image/png"
                            id="raised-button-file"
                            type="file"
                        />
                    </div>
                </Grid>

                {successfulUpdate &&
                    <Alert severity='success'>Team updated</Alert>
                }
                {unsuccessfulUpdate &&
                    <Alert severity='error'>TeamFightTable cannot be updated</Alert>
                }                
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={submitTeamUpdate}>Update Team</Button>
        </DialogActions>
    </Dialog>
    
  )
}

export default EditTeamDialog;