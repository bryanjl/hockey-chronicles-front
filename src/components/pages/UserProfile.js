import { useContext, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import EditUserDetailsDialog from "../adminTools/edit/EditUserDetailsDialog";

const useStyles = makeStyles((theme) => ({
    notLoggedIn: {
        marginTop: '50px'
    },
    userDeatilsContainer: {
        marginTop: '25px'
    },
    editUserDetailsBtn: {
        backgroundColor: theme.palette.black.main,
        color: theme.palette.orange.main,
        marginTop: '25px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    profilePictureContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    profileImage: {
        maxHeight: '100px'
    }
}));

let imgUrl;
if(process.env.NODE_ENV === 'development'){
    imgUrl = 'http://localhost:5000';
} else {
    imgUrl = 'https://hockey-chronicles-api.herokuapp.com';
}

const UserProfile = () => {
    //user context -> or guest
    let { user, setUser } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

    const classes = useStyles();

    const [openEdit, setOpenEdit] = useState(false);

    const openEditDetails = () => {
        setOpenEdit(true);
    }

    const closeEditDetails = () => {
        setOpenEdit(false);
    }

    // const submitEditUser = (userDetails) => {
    //     console.log(userDetails)
    // }

  return (
    <>
        <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px'}}>User Profile</Typography>

        {user.role === 'guest' &&
            <div className={classes.notLoggedIn}>
                <Typography variant='h6' align='center'>You are not logged in.  Log in or register to see your profile</Typography>    
            </div>
            
        }

        {user.role !== 'guest' &&
            <Grid container>
                <Grid item xs={6}>
                    <div className={classes.userDeatilsContainer}>
                        <Typography variant='h5' style={{ borderBottom: '2px solid #F74902', display: 'inline-block' }}>Username: </Typography> <Typography variant='h6' style={{ display: 'inline-block', marginLeft: '10px' }}>{user.username}</Typography>
                    </div>
                    <div className={classes.userDeatilsContainer}>
                        <Typography variant='h5' style={{ borderBottom: '2px solid #F74902', display: 'inline-block' }}>E-mail: </Typography> <Typography variant='h6' style={{ display: 'inline-block', marginLeft: '10px' }}>{user.email}</Typography>
                    </div>
                    <div className={classes.userDeatilsContainer}>
                        <Typography variant='h5' style={{ borderBottom: '2px solid #F74902', display: 'inline-block' }}>Role: </Typography> <Typography variant='h6' style={{ display: 'inline-block', marginLeft: '10px' }}>{user.role}</Typography>
                    </div>
                    
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.profilePictureContainer}>
                        <img className={classes.profileImage} src={`${imgUrl}/uploads/users/${user.profileImageFile}`} alt={`${user.username}`} />
                    </div>
                </Grid>
                <Grid item xs={12} align='center'>
                    <Button onClick={openEditDetails} className={classes.editUserDetailsBtn}>Edit Details</Button>
                </Grid>
            </Grid>
        }
        <EditUserDetailsDialog user={user} open={openEdit} handleClose={closeEditDetails} setUser={setUser} />
    </>
  )
}

export default UserProfile;