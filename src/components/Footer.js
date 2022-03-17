import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerBox: {
        minHeight: '100px'
    }
}));


const Footer = () => {
    const classes = useStyles();
  return (
    <Box className={classes.footerBox}></Box>
  )
}

export default Footer;