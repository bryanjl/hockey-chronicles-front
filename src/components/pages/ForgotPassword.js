import { useState } from "react";
import ForgotPasswordDialog from "../auth/ForgotPasswordDialog"

const ForgotPassword = () => {

    const [openDialog, setOpenDialog] = useState(true);

    const handleClose = () => {
        setOpenDialog(false);
    }

  return (
    <ForgotPasswordDialog open={openDialog} handleClose={handleClose}  />
  )
}

export default ForgotPassword;