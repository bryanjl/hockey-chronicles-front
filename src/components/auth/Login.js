import { makeStyles } from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Link, TextField } from "@mui/material";


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
    const classes = useStyles();
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className={classes.title}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlined />
                </Avatar>
                Sign In
            </DialogTitle>
            <DialogContent>
                <TextField
                    id='username'
                    label='Username *'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                />
                <TextField 
                    className={classes.textField}
                    id='password'
                    label='Password *'
                    variant='outlined'
                    margin='normal'
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
