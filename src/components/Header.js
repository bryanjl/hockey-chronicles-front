import { AppBar, Toolbar, Typography, makeStyles, InputBase, alpha, Avatar } from '@material-ui/core';
import { Search, Cancel, AccountCircleRounded, MenuOutlined } from '@material-ui/icons';
import { LoginRounded, LogoutRounded } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: theme.palette.primary.dark
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
        },
        cursor: 'pointer'
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

const Header = ({ handleSearch }) => {
    let navigate = useNavigate();

    //state for search bar
    const [open, setOpen] = useState(false);
    const classes = useStyles({ open });

    //state for Auth -> login/register
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

    //state for dropdown menu from avatar
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    // const openMenu = Boolean(anchorEl);

    const [openMainMenu, setOpenMainMenu] = useState(false);

    //avatar click for menu
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };
    //avatar menu on close
    const handleAvatarClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    };
    //Main Menu
    const handleMainMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenMainMenu(true);
    };
    const handleMainMenuClose = () => {
        setAnchorEl(null);
        setOpenMainMenu(false);
    };
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
    //LOGOUT logout button -> clear token
    const logoutBtnClick = () => {
        setOpenLogout(true)
    }
    const onLogoutClose = () => {
        setOpenLogout(false);
    }
    const goHome = () => {
        navigate('/');
    }

    const handleSearchSubmit = (e) => {
        // handleSearch(e.target.value);
        if (e.keyCode === 13) {
            handleSearch(e.target.value);
            navigate(`/search`);
        }
    }

    return (
        <AppBar className={classes.header} position='fixed'>
            <Toolbar className={classes.toolbar}>
                <MenuOutlined 
                    id="menu-button"
                    aria-controls={openMainMenu ? 'main-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMainMenu ? 'true' : undefined}
                    onClick={handleMainMenuClick} 

                />
                <Menu
                    id="main-menu"
                    anchorEl={anchorEl}
                    open={openMainMenu}
                    onClose={handleMainMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'menu-button',
                    }}
                >
                    <MenuItem><Button onClick={handleMainMenuClose} component={Link} to='/teams'>Teams</Button></MenuItem>
                    <MenuItem><Button onClick={handleMainMenuClose} component={Link} to='/fights'>Fights</Button></MenuItem>
                    <MenuItem><Button onClick={handleMainMenuClose} component={Link} to='/players'>Players</Button></MenuItem>
                    <MenuItem><Button onClick={handleMainMenuClose} component={Link} to='/leagues'>Leagues</Button></MenuItem>
                    <MenuItem><Button onClick={handleMainMenuClose} component={Link} to='/seasons'>Seasons</Button></MenuItem>
                    
                </Menu>

                <Typography onClick={goHome} variant='h5' component='h2' className={classes.logoLg}>
                    Hockey Fight Chronicles
                </Typography>
                
                <Typography onClick={goHome} variant='h5' component='h2' className={classes.logoSm}>
                    HFC
                </Typography>
                
                
                
                
                
                


                <Login open={openLogin} onClose={onLoginClose} />
                
                <Register open={openRegister} onClose={onRegisterClose} />

                <Logout open={openLogout} onClose={onLogoutClose} />
                
                <div className={classes.search}>
                    <Search />
                    <InputBase onKeyDown={handleSearchSubmit} placeholder='Search' className={classes.input} fullWidth/>
                    <Cancel className={classes.cancelSearch} onClick={() => setOpen(false)} />
                </div>
                <div className={classes.icons}>
                    {/* <Search className={classes.searchBtn} onClick={() => setOpen(true)} />
                    <Badge badgeContent={4} color='secondary'>
                        <Notifications />
                    </Badge> */}
                    <Avatar 
                        className={classes.avatar} src='#'
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleAvatarClick}    
                    >
                    </Avatar>
                    <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleAvatarClose}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
                                }}
                    >
                        <MenuItem onClick={loginBtnClick}><LoginRounded />   Login</MenuItem>
                        <MenuItem onClick={logoutBtnClick}><LogoutRounded />   Logout</MenuItem>
                        <MenuItem onClick={registerBtnClick}><AccountCircleRounded />  Register</MenuItem>
                        {/* <MenuItem onClick={getMe}>Get Me</MenuItem> */}
                    </Menu>

                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
