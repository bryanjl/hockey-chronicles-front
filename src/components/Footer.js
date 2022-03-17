import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerBox: {
        minHeight: '100px',
        borderTop: '1px solid #ece7e7'
    }
}));


const Footer = () => {
    const classes = useStyles();
  return (
    <Box className={classes.footerBox}></Box>
  )
}

export default Footer;