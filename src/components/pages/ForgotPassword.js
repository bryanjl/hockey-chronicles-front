import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import { forgotPassword as forgotPasswordAPI } from '../../api/auth/authApi';
import Success from '../auth/Success';

const useStyles = makeStyles((theme) => ({
    submitEmailBtn: {
        backgroundColor: theme.palette.black.main,
        color: theme.palette.orange.main,
        marginTop: '25px',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    textFieldStyle: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: '#F74902',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#F74902',
            },
        }
    }
}));

const ForgotPassword = () => {

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [formError, setFormError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [unsuccessfulEmail, setUnsuccessfulEmail] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const submitEmail = () => {
        setFormError('');

        let emailFormat = /(.+)@(.+){2,}\.(.+){2,}/

        if(emailFormat.test(email)){
            let userEmail = {
                email: email
            }
            forgotPasswordAPI(userEmail).then(response => {
                if(response.success){
                    setEmailSent(true);

                    setTimeout(() => {
                        setEmailSent(false);
                    }, 3000);
                } else {
                    if(response.status === 404){
                        setFormError('404');
                    } else {
                        setUnsuccessfulEmail(true);

                        setTimeout(() => {
                            setUnsuccessfulEmail(false);
                        }, 3000);
                    }    
                }   
            });
        } else {
            setFormError('email');
        }
    }

  return (
    <>
        <Typography variant='h5' style={{marginBottom: '15px', marginTop: '15px', backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px'}}>Forgot Password</Typography>
        <Typography variant='h6'>Enter your email to reset your password</Typography>
        <Grid container>
            <Grid item xs={12}>
                <TextField 
                    classes={{
                        root: classes.textFieldStyle
                    }}
                    error={formError === 'email' ? true : false}
                    helperText={formError === 'email' ? 'Please enter a valid email address' : ''}
                    id='email'
                    value={email}
                    label='Email Address'
                    variant='outlined'
                    margin='normal'
                    onChange={handleEmailChange}
                    fullWidth
                    required
                />
                {unsuccessfulEmail &&
                    <Alert severity="error">Cannot reset password</Alert>
                }
                {
                    formError === '404' &&
                    <Alert severity="error">E-mail address not found - Try Again</Alert>
                }
            </Grid>
            <Grid item xs={12} align='center'>
                <Button
                    className={classes.submitEmailBtn}
                    variant="outlined"
                    onClick={submitEmail}
                >
                    Submit Email
                </Button>
            </Grid>
        </Grid>
        {emailSent && 
            <Success open={emailSent} message='Check your email to reset your password' />
        }
    </>
  )
}

export default ForgotPassword;