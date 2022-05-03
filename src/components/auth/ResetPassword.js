import { useParams } from 'react-router-dom';
import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { useState } from 'react';
import { resetPassword as resetPasswordAPI } from '../../api/auth/authApi';
import { Alert } from '@mui/material';
import Success from './Success';

const useStyles = makeStyles((theme) => ({
    resetPasswordBtn: {
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
          },
        
    }
}));

const ResetPassword = () => {
    let { resetToken } = useParams();

    const classes = useStyles();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [success, setSuccess] = useState(false);

    const handlePasswordChange = (e)  => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const submitPassword = () => {
        setFormError('');
        if(password !== confirmPassword){
            setFormError('noMatch');
        } else {
            let body = {
                password: password
            }
            resetPasswordAPI(body, resetToken).then(response => {
                if(!response.success){
                    setFormError('invalidToken');
                    setPassword('');
                    setConfirmPassword('');

                    setTimeout(() => {
                        setFormError('');
                    }, 3000);
                } else {
                    setSuccess(true);
                    
                    setTimeout(() => {
                        setSuccess(false);
                    }, 3000);
                }
            });
        }
    }

  return (
    <>
        <Grid container>
            <Grid item xs={12}>
                <Typography 
                    variant='h5'
                    style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px', marginBottom: '30px'}}
                >
                    Reset Your Password
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    classes={{
                        root: classes.textFieldStyle
                    }} 
                    id='password'
                    value={password}
                    type='password'
                    label='Enter New Password'
                    variant='outlined'
                    margin='normal'
                    onChange={handlePasswordChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    classes={{
                        root: classes.textFieldStyle
                    }} 
                    error={formError === 'noMatch' ? true : false}
                    helperText={formError === 'noMatch' ? "Passwords don't match" : ''}
                    value={confirmPassword}
                    type='password'
                    id='confirmPassword'
                    label='Confirm Password'
                    variant='outlined'
                    margin='normal'
                    onChange={handleConfirmPasswordChange}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item align='center' xs={12}>
                <Button
                    className={classes.resetPasswordBtn}
                    onClick={submitPassword}
                    variant='outlined'
                >
                    Reset Password
                </Button>
            </Grid>
            {formError === 'invalidToken' &&
                <Alert severity='error'>Invalid Token - Unable to reset password</Alert>
            }
            {success &&
                <Success open={success} message='Password Reset - Login in to continue' />            }
        </Grid>
    </>
  )
}

export default ResetPassword;