import { makeStyles } from "@material-ui/core";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useState } from "react";
import CreateSeason from "../admin/create/CreateSeason";

const useStyles = makeStyles((theme) => ({
    adminTitle: {
        paddingBottom: '25px',
        
    }
}));

const Admin = () => {

    const classes = useStyles();

    //states
    const [createSelect, setCreateSelect] = useState('');

    const handleCreateSelectChange = (e) => {
        // console.log(e.target.value);
        setCreateSelect(e.target.value);
    }


  return (
      <>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h3' className={classes.adminTitle}>Administration</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='h5' className={classes.adminTitle} >What would you like to create?</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="create-select-label">Create</InputLabel>
                                <Select
                                    labelId="create-select-label"
                                    id="create-select"
                                    value={createSelect}
                                    onChange={handleCreateSelectChange}
                                >
                                    <MenuItem value='season'>Season</MenuItem>
                                    <MenuItem value='game'>Game</MenuItem>
                                    <MenuItem value='player'>Player</MenuItem>
                                    <MenuItem value='team'>Team</MenuItem>
                                    <MenuItem value='league'>League</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        {createSelect === 'season' &&
            <>
                <CreateSeason />
            </>
        }

        {createSelect === 'game' &&
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>Create a New Game</Typography>
                </Grid>
            </Grid>
        }

        {createSelect === 'player' &&
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>Create a New Player</Typography>
                </Grid>
            </Grid>
        }

        {createSelect === 'team' &&
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>Create a New Team</Typography>
                </Grid>
            </Grid>
        }
        {createSelect === 'league' &&
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>Create a New League</Typography>
                </Grid>
            </Grid>
        }
    </>
  )
}

export default Admin;