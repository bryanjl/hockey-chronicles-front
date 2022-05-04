import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";
import { forgotPassword as forgotPasswordAPI } from '../../api/auth/authApi';
import Success from './Success';

const ForgotPassword = ({ open, onClose }) => {

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
                    if(response.msg.message === 'Incorrect Email'){
                        setFormError('email');
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

    const closeDialog = () => {
        onClose();
    }

  return (
    <>
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email to reset your password
                </DialogContentText>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField 
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
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            fullWidth
                            variant="outlined"
                            onClick={closeDialog}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            fullWidth
                            variant="outlined"
                            onClick={submitEmail}
                        >
                            Submit Email
                        </Button>
                    </Grid>
                    {unsuccessfulEmail &&
                        <Alert severity="error">Cannot reset password</Alert>
                    }
                </Grid>
            </DialogContent>
        </Dialog>
        {emailSent && 
            <Success open={emailSent} message='Check your email to reset your password' />
        }
    </>
  )
}

export default ForgotPassword;