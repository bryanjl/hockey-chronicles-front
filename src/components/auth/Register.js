import { makeStyles } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";
import { useState } from "react";

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

const Register = ({ open, onClose, signUp }) => {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = () => {
        let userDetails = {
            username: username,
            email: email,
            password: password
        }

        signUp(userDetails)
    }

    return (
        <Dialog open={open} onClose={onClose}>
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

export default Register
