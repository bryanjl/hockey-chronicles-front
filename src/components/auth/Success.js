import { Dialog, DialogTitle, makeStyles } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    successContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    successIcon: {
        color: 'green',
        fontSize: '100px'
    }
}));

const Success = ({ onClose, message }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(true);

    setTimeout(() => { 
        setOpen(false)
    }, 2000);

    return (
        <Dialog open={open} onClose={onClose} className={classes.successContainer} disableEnforceFocus>
            <DialogTitle>{message}</DialogTitle>
            <CheckCircle className={classes.successIcon} />
        </Dialog>
    )
}

export default Success
