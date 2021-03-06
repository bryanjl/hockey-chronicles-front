import { makeStyles, Typography } from "@material-ui/core";
import { LockOpen, LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import Success from "./Success";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { login as loginAPI } from '../../api/auth/authApi';
import { useNavigate } from "react-router-dom";



const useStyles = makeStyles((theme) =>({
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {
        padding: '15px'
    }
}));

const Login = ({ open, onClose }) => {
    const navigate = useNavigate();

    //context
    const { setUser } = useContext(UserContext);

    const classes = useStyles();

    //State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
           
        setFormError('');
        let credentials = { username: username, password: password };
        let response = await loginAPI(credentials);
        if(response.success === false){
            if(response.msg === 'Cannot Find User'){
                setFormError('username');
            } else {
                setFormError('password');
            }    
        } else {
            setIsLoggedIn(true);
            setUser(response.user);
            
            setTimeout(() => {
                handleClose();
            }, 2000)
        }
    }

    const handleClose = () => {
        setUsername('');
        setPassword('');
        setFormError('');
        setIsLoggedIn(false);
        onClose();
    }

    const handleForgotOpen = () => {
        handleClose();
        navigate('/forgotpassword');
    }
    
    return ( 
        
        <Dialog open={open} onClose={handleClose}>
            {isLoggedIn && <Success onClose={handleClose} message='You are now logged in' />} 
            <DialogTitle className={classes.title}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    {isLoggedIn ?  <LockOpen /> : <LockOutlined />}
                </Avatar>
                {isLoggedIn ? 'You are now logged in' : 'Sign In'}
            </DialogTitle>
            <form onSubmit={handleSubmit} className={classes.loggedIn}>
                <DialogContent>
                    <TextField
                        onInvalid={(e) => (username === '') ? e.target.setCustomValidity('Enter Username') : e.target.setCustomValidity('')}
                        id='username'
                        label='Username'
                        variant='outlined'
                        margin='normal'
                        onChange={handleUsernameChange}
                        value={username}
                        error={(formError === 'username') ? true : false}
                        helperText={(formError === 'username') ? 'User not found' : ''}
                        required
                        fullWidth
                    />
                    <TextField
                        onInvalid={(e) => (password === '') ? e.target.setCustomValidity('Enter your password') : e.target.setCustomValidity('')}
                        type='password' 
                        className={classes.textField}
                        id='password'
                        label='Password'
                        variant='outlined'
                        margin='normal'
                        onChange={handlePasswordChange}
                        value={password}
                        error={(formError === 'password') ? true : false}
                        helperText={(formError === 'password') ? 'Your password is incorrect' : ''}
                        required
                        fullWidth
                    />            
                </DialogContent>
                <DialogActions>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                    >
                        Sign In</Button>
                </DialogActions>
            </form>
            <Grid container className={classes.footer}>
              <Grid item xs={12} align='center'>
                <Typography
                    style={{cursor: 'pointer'}}
                    onClick={handleForgotOpen}
                >Forgot Password?</Typography>
              </Grid>
            </Grid>
        </Dialog>
        
        
    )
    
}

export default Login;
