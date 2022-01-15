import { Button, Dialog, DialogTitle } from "@material-ui/core";
import { DialogContent } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { logout as logoutAPI } from '../../api/auth/authApi';
import Success from "./Success";

const Logout = ({ open, onClose }) => {
    const { setUser } = useContext(UserContext);

    const [isLoggedOut, setIsLoggedOut] = useState(false);

    const cancelBtn = () => {
        handleClose();
    }

    const logoutBtn = () => {
        setIsLoggedOut(true);
        setUser(null);
        logoutAPI();
        setTimeout(() => {
            handleClose();
        }, 2000);
    }
    
    const handleClose = () => {
        setIsLoggedOut(false);
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} disableEnforceFocus>
            {isLoggedOut && <Success onClose={handleClose} message='You are now logged out' />}
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogContent>
                <Button onClick={cancelBtn}>Cancel</Button>
                <Button onClick={logoutBtn}>Logout</Button>
            </DialogContent>
        </Dialog>
    )
}

export default Logout;
