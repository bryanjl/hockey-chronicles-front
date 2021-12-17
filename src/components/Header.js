import { AppBar, Toolbar, Typography, makeStyles, InputBase, alpha, Badge, Avatar } from '@material-ui/core';
import { Search, Notifications, Cancel } from '@material-ui/icons';
import { Button } from '@mui/material';
import { useState } from 'react';
import { 
    login as loginAPI, 
    register as registerAPI, 
    logout as logoutAPI,
    getToken as getTokenAPI,
    getUserDetails as getUserDetailsAPI
} from '../api/auth/authApi';
import Login from './auth/Login';
import Register from './auth/Register';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.main
    },
    logoLg: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    logoSm: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25)
        },
        borderRadius: theme.shape.borderRadius,
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            display: (props) => (props.open ? 'flex' : 'none'),
            // width: '70%'
        }
    },
    input: {
        color: 'white',
        marginLeft: theme.spacing(1)
    },
    icons: {
        display: (props) => (props.open ? 'none' : 'flex'),
        alignItems: 'center',
        margin: theme.spacing(1)
    },
    avatar: {
        marginLeft: theme.spacing(2)
    },
    searchBtn: {
        // display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        },
        marginRight: theme.spacing(1)
    },
    cancelSearch: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}))

const Header = () => {
    //state for search bar
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });

    //state for Auth -> login/register
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    //open login dialog
    const loginBtnClick = () => {
        setOpenLogin(true);
    }
    //close login dialog
    const onLoginClose = () => {
        setOpenLogin(false);
    }
    //open register dialog
    const registerBtnClick = () => {
        setOpenRegister(true);
    }
    //close register dialog
    const onRegisterClose = () => {
        setOpenRegister(false);
    }
    //LOGIN sign in button -> api call
    const signIn = (credentials) => {
        loginAPI(credentials);
    }
    //REGISTER sign up button -> api call
    const signUp = (userDetails) => {
        registerAPI(userDetails);
        // console.log(response);
    }
    //LOGOUT logout button -> clear token
    const logout = () => {
        logoutAPI();
    }
    //TEST -> GET current logged in user's token
    const getMe = () => {
        let user = getUserDetailsAPI();
        // console.log(token);
    }

    const handleSearchSubmit = (e) => {
        // e.preventDefault();
        if (e.keyCode === 13) {
            alert('search submit')
        }
        
    }

    return (
        <AppBar className={classes.header} position='fixed'>
            <Toolbar className={classes.toolbar}>
                <Typography variant='h5' component='h2' className={classes.logoLg}>
                    Hockey Fight Chronicles
                </Typography>
                <Typography variant='h5' component='h2' className={classes.logoSm}>
                    HFC
                </Typography>
                <Button onClick={loginBtnClick}>Login</Button>
                <Login open={openLogin} onClose={onLoginClose} signIn={signIn} />
                <Button onClick={registerBtnClick}>Register</Button>
                <Register open={openRegister} onClose={onRegisterClose} signUp={signUp} />
                <Button onClick={logout}>Logout</Button>
                <Button onClick={getMe}>GET ME</Button>
                <div className={classes.search}>
                    <Search />
                    <InputBase onKeyDown={handleSearchSubmit} placeholder='Search' className={classes.input} fullWidth/>
                    <Cancel className={classes.cancelSearch} onClick={() => setOpen(false)} />
                </div>
                <div className={classes.icons}>
                    <Search className={classes.searchBtn} onClick={() => setOpen(true)} />
                    <Badge badgeContent={4} color='secondary'>
                        <Notifications />
                    </Badge>
                    <Avatar className={classes.avatar} src='#'></Avatar>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
