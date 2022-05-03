import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, Dialog } from "@mui/material";
import { useState } from "react";
//api
import { updateUser as updateUserAPI } from "../../../api/auth/authApi";

const EditUserDetailsDialog = ({ user, open, handleClose, setUser }) => {

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [profilePictureFile, setProfilePictureFile] = useState(null);

    const [successfulUpdate, setSuccessfulUpdate] = useState(false);
    const [unsuccessfulUpdate, setUnsuccessfulUpdate] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleProfileImageChange = (e) => {
        setProfilePictureFile(e.target.files[0]);
    }

    const handleSubmit = () => {
        let fdUserInfo = new FormData();
        if(username !== user.username) {
            fdUserInfo.append('username', username);
        }
        if(email !== user.email) {
            fdUserInfo.append('email', email);
        }
        if(profilePictureFile !== null){
            fdUserInfo.append('profileImageFile', profilePictureFile);
        }

        updateUserAPI(fdUserInfo).then(response => {
            setUser(response.data);

            if(response.success){
                setSuccessfulUpdate(true);

                setTimeout(() => {
                    setSuccessfulUpdate(false);
                    handleClose();
                }, 2000);
            }

            if(!response.success){
                setUnsuccessfulUpdate(true);

                setTimeout(() => {
                    setUnsuccessfulUpdate(false);
                }, 2000);
            }

        });
    }

  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Use this form to edit your profile
            </DialogContentText>
            <Grid container>
                <Grid item xs={12}>
                    <TextField
                        value={username}
                        margin="dense"
                        id="username"
                        label="Username"
                        fullWidth
                        variant="outlined"
                        onChange={handleUsernameChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={email}
                        margin="dense"
                        id="email"
                        label="E-mail"
                        fullWidth
                        variant="outlined"
                        onChange={handleEmailChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Typography style={{ marginBottom: '5px' }} variant='body1'>Choose Profile Image</Typography>
                        <input
                            onChange={handleProfileImageChange}
                            accept="image/png"
                            id="raised-button-file"
                            type="file"
                        />
                    </div>
                </Grid>
                {successfulUpdate &&
                    <Alert severity='success'>Profile updated</Alert>
                }
                {unsuccessfulUpdate &&
                    <Alert severity='error'>Profile cannot be updated</Alert>
                } 
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Update Profile</Button>
        </DialogActions>
    </Dialog>
  )
}

export default EditUserDetailsDialog;