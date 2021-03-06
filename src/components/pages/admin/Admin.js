import { Button, makeStyles } from "@material-ui/core";
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import CreateSeason from "../admin/create/CreateSeason";
import CreatePlayer from "./create/CreatePlayer";
import CreateLeague from "./create/CreateLeague";
import CreateGame from "./create/CreateGame";
import CreateTeam from "./create/CreateTeam";
import ManageUsers from "./users/ManageUsers";
import ChooseFeaturedFight from "./create/ChooseFeaturedFight";
//userContext
import { UserContext } from "../../../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
    adminTitle: {
        paddingBottom: '25px',
        
    },
    adminBtns: {
        marginLeft: '10px',
        marginBottom: '10px',
        height: '56px'
    }
}));

const Admin = () => {
    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

    const classes = useStyles();

    //states
    const [createSelect, setCreateSelect] = useState('');

    const handleCreateSelectChange = (e) => {
        // console.log(e.target.value);
        setCreateSelect(e.target.value);
    }

    const manageUsersHandleClick = () => {
        setCreateSelect('manageUsers');
    }

    const chooseFeaturedHandleClick = () => {
        setCreateSelect('chooseFeaturedFight');
    }


  return (
    <>
        {(user.role === 'admin' || user.role === 'super') && 
    
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
                    {user.role === 'super' &&
                    <>
                        <Grid item xs={6}>
                            <Button
                                
                                className={classes.adminBtns}
                                onClick={chooseFeaturedHandleClick}
                                variant='outlined'
                                fullWidth
                            >
                                Choose Featured Fight</Button>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Button
                                
                                className={classes.adminBtns}
                                onClick={manageUsersHandleClick}
                                variant='outlined'
                                fullWidth
                            >
                                Manage Users</Button>
                        </Grid>
                    </>
                    }
                </Grid>
            </Grid>
        </Grid>

        {createSelect === 'season' &&
            <>
                <CreateSeason />
            </>
        }

        {createSelect === 'game' &&
            <>
                <CreateGame />
            </>
        }

        {createSelect === 'player' &&
            <>
                <CreatePlayer />
            </>
        }

        {createSelect === 'team' &&
            <CreateTeam />
        }
        
        {createSelect === 'league' &&
            <>
                <CreateLeague />
            </>
        }
        {createSelect === 'manageUsers' &&
            <>
                <ManageUsers />
            </>
        }
        {createSelect === 'chooseFeaturedFight' &&
            <>
                <ChooseFeaturedFight />
            </>
        }


    </>

        }
        {(user.role !== 'admin' && user.role !== 'super') &&
            <>
                <Typography variant='h2'>Not Authorized</Typography>
                <Typography variant='h4'>Please Log in to administration account</Typography>
            </>
        }

        
    </>
      
  )
}

export default Admin;