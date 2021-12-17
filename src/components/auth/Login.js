import { makeStyles } from "@material-ui/core";
import { CheckCircle, LockOpen, LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";
import { login as loginAPI } from '../../api/auth/authApi';


const useStyles = makeStyles((theme) =>({
    title: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    footer: {
        padding: '15px'
    },
    successContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    successIcon: {
        color: 'green',
        fontSize: '100px'
    }
}));

const Login = ({ open, onClose }) => {
    //State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const classes = useStyles();

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

  
    
    return ( 
        <Dialog open={open} onClose={handleClose}>
            {isLoggedIn && <Success onClose={handleClose} />} 
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
                        // helperText={`hello`}
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
        </Dialog>
    )
    
}

const Success = ({ onClose }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);
    setTimeout(() => { 
        setOpen(false)
    }, 2000);

    return (
        <Dialog open={open} onClose={onClose} className={classes.successContainer}>
            <DialogTitle>You are now logged in</DialogTitle>
            <CheckCircle className={classes.successIcon} />
        </Dialog>
    )
}



export default Login
