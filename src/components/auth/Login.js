import { makeStyles } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";


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

const Login = ({ open, onClose, signIn }) => {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = () => {
        let credentials = { username: username, password: password }

        signIn(credentials);
    }
    
    const handleClose = () => {
        setUsername('');
        setPassword('');
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle className={classes.title}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                Sign In
            </DialogTitle>
            <DialogContent>
                <TextField
                    id='username'
                    label='Username'
                    variant='outlined'
                    margin='normal'
                    onChange={handleUsernameChange}
                    value={username}
                    required
                    fullWidth
                />
                <TextField
                    type='password' 
                    className={classes.textField}
                    id='password'
                    label='Password'
                    variant='outlined'
                    margin='normal'
                    onChange={handlePasswordChange}
                    value={password}
                    required
                    fullWidth
                />            
            </DialogContent>
            <DialogActions>
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    onClick={onSubmit}
                >
                    Sign In</Button>
            </DialogActions>
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

export default Login
