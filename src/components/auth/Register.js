import { makeStyles } from "@material-ui/core"
import { LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";

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
    const classes = useStyles();

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
                            label='Username *'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id='email'
                            label='Email Address *'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id='password'
                            label='Password *'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id='confirmPassword'
                            label='Confirm Password *'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    fullWidth
                    variant='contained'
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
