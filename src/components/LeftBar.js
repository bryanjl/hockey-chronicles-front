import { useState } from "react";
import { Box, Divider, List, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout';
//css
import './LeftBarStyles.css'



const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        height: '100%',
        borderRight: '1px solid #ece7e7'
    }
}));



const LeftBar = () => {
    const classes = useStyles();

    //state for Auth -> login/register
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

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
        setOpenLogout(true);
    }
    const onLogoutClose = () => {
        setOpenLogout(false);
    }

    return (
        <Box className={classes.container}>
            <nav>
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to='/fights' >
                            <ListItemText primary='Fights' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to='/leagues'>
                            <ListItemText primary='Leagues' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to='/seasons'>
                            <ListItemText primary='Seasons' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to='/players'>
                            <ListItemText primary='Players' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton component={Link} to='/teams'>
                            <ListItemText primary='Teams' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav>
                <List>
                    <ListItem>
                        <ListItemButton onClick={loginBtnClick}>
                            <ListItemText secondary='Login' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={logoutBtnClick}>
                            <ListItemText secondary='Logout' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={registerBtnClick}>
                            <ListItemText secondary='Register' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            <Divider />
            <nav>
                <List>
                    <ListItem>
                        <ListItemButton component={Link} to='/admin'>
                            <ListItemText secondary='Administration' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
               
            <Login open={openLogin} onClose={onLoginClose} />
                
            <Register open={openRegister} onClose={onRegisterClose} />

            <Logout open={openLogout} onClose={onLogoutClose} />
        </Box>
    )
}

export default LeftBar;