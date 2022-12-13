import { useState, useContext } from "react";
import { Box, Divider, List, ListItem, ListItemText, makeStyles } from "@material-ui/core"
import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import Login from './auth/Login';
import Register from './auth/Register';
import Logout from './auth/Logout';
// import ForgotPasswordDialog from './auth/ForgotPasswordDialog';
//css
import './LeftBarStyles.css'
//user context
import { UserContext } from "../contexts/UserContext";



const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        height: '100%',
        borderRight: '1px solid black'
    },
    root: {
        // borderTop: '1px solid black',
        '&:hover': {
            backgroundColor: theme.palette.black.main,
            color: theme.palette.orange.main,
            
            '& span': {
                fontWeight: 'bolder',
                paddingLeft: '10px',
                // textAlign: 'right',
                borderLeft: '3px solid #F74902',
            }
        }
    },
    affiliateContainer: {
        width: '100%',
        overflow: 'hidden',
        padding: '15px'
    },
    affiliateImage: {
        width: '100%',
        marginBottom: '25px'
    }
}));



const LeftBar = () => {
    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

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
    // //FORGOT PASSWORD
    // const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);

    // const handleForgotPasswordDialogOpen = () => {
    //     setOpenForgotPasswordDialog(true);
    // }

    // const handleForgotPasswordDialogClose = () => {
    //     setOpenForgotPasswordDialog(false);
    // }


    return (
        <Box className={classes.container}>
            <nav>
                <List >
                    <ListItem className={classes.root}>
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}}  component={Link} to='/fights' >
                            <ListItemText primary='FIGHTS' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}} component={Link} to='/leagues'>
                            <ListItemText primary='LEAGUES' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}} component={Link} to='/seasons'>
                            <ListItemText primary='SEASONS' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}} component={Link} to='/players'>
                            <ListItemText primary='PLAYERS' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}} component={Link} to='/teams'>
                            <ListItemText primary='TEAMS' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        
                        <ListItemButton style={{borderTop: '1px solid #F74902', borderRight: '1px solid #F74902'}} component={Link} to={{pathname: "https://hockey-chronicles-forum-8ezhy.ondigitalocean.app/"}} target='_blank'>
                            
                            <ListItemText primary='FORUM' />
                        
                        </ListItemButton>
                        
                    </ListItem>
                </List>
            </nav>
            <Divider style={{background: 'black'}} />
            <nav>
                <List>
                    <ListItem className={classes.root}>
                        <ListItemButton onClick={loginBtnClick}>
                            <ListItemText primary='Login' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton onClick={logoutBtnClick}>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.root}>
                        <ListItemButton onClick={registerBtnClick}>
                            <ListItemText primary='Register' />
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
            {(user.role === 'admin' || user.role === 'super') &&
                <>
                <Divider style={{background: 'black'}} />
                <nav>
                    <List>
                        <ListItem>
                            <ListItemButton component={Link} to='/admin'>
                                <ListItemText secondary='Administration' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                </>
            }
            <div className={classes.affiliateContainer}>
                <a href='https://link.chtbl.com/4thlinevoice' target='_blank'  rel='noreferrer'>
                    <img className={classes.affiliateImage} src='/4th_line_voice.png' alt='4th Line Voice' />
                </a>
                <a href='https://www.sixpackcoverage.com/five-for-fighting/' target='_blank' rel='noreferrer'>
                    <img className={classes.affiliateImage} src='/five_for_fighting.png' alt='Five For Fighting' />
                </a>
            </div>
            
 
               
            <Login open={openLogin} onClose={onLoginClose} />
                
            <Register open={openRegister} onClose={onRegisterClose} />

            <Logout open={openLogout} onClose={onLogoutClose} />

        </Box>
    )
}

export default LeftBar;