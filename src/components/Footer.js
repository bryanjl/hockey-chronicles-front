import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footerBox: {
        display: 'flex',
        minHeight: '100px',
        borderTop: '1px solid #ece7e7',
        backgroundColor: theme.palette.black.main,
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


const Footer = () => {
    const classes = useStyles();
  return (
    <Box className={classes.footerBox}>
      <Typography style={{color: 'white'}}>Copyright 2022</Typography>
    </Box>
  )
}

export default Footer;