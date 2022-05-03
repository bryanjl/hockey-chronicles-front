import { makeStyles, Typography } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";
import Success from "./Success";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import {register as registerAPI} from '../../api/auth/authApi';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {
        padding: '15px',
        justifyContent: 'flex-end'
    }
}));

const Register = ({ open, onClose }) => {
    //styles
    const classes = useStyles();
    //context
    const { setUser } = useContext(UserContext);

    //componet state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileImageFile, setProfileImageFile] = useState(null);

    //errorState
    const [formError, setFormError] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleProfileImageChange = (e) => {
        setProfileImageFile(e.target.files[0]);
    }

    const onSubmit = async() => {
        let fdUserDetails = new FormData();
        fdUserDetails.append('username', username);
        fdUserDetails.append('email', email);
        fdUserDetails.append('password', password);
        fdUserDetails.append('profileImageFile', profileImageFile);

        let response = await registerAPI(fdUserDetails);

        //handle response errors
        if(response.success === false){
            if(response.msg === 'Cannot use duplicate values in field' && response.formField === 'email'){
                alert('Email is already in use');
                setFormError('email');
            } else if (response.msg === 'Cannot use duplicate values in field' && response.formField === 'username'){
                alert('Username is already in use');
                setFormError('username');
            } else {
                window.alert(`Server Error - Please try again later`)
            }   
        } else {
            setUser(response.user);
            setIsLoggedIn(true);

            setTimeout(() => {
                handleClose();
            }, 2000)
        }
    }

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setFormError('');
        setProfileImageFile(null);
        setIsLoggedIn(false);
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            {isLoggedIn && <Success onClose={handleClose} message='You are now registered' />} 
            <DialogTitle className={classes.title}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                Sign Up
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField 
                            id='username'
                            label='Username'
                            variant='outlined'
                            margin='normal'
                            error={(formError === 'username') ? true : false}
                            onChange={handleUsernameChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id='email'
                            label='Email Address'
                            variant='outlined'
                            margin='normal'
                            error={(formError === 'email') ? true : false}
                            onChange={handleEmailChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            type='password'
                            id='password'
                            label='Password'
                            variant='outlined'
                            margin='normal'
                            onChange={handlePasswordChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type='password' 
                            id='confirmPassword'
                            label='Confirm Password'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            required
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
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    variant='contained'
                    onClick={onSubmit}
                >
                    Sign Up</Button>
            </DialogActions>
            <Grid container className={classes.footer}>
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
        </Dialog>
    )
}

export default Register;
