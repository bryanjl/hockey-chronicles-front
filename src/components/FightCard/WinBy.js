import { makeStyles } from "@material-ui/core";
import { Grid, Typography } from "@mui/material";


const useStyles = makeStyles((theme) => ({
    winByContainer: {
        marginTop: '10px',
        marginBottom: '20px'
    }
}));

const WinBy = ( winBy ) => {
    const classes = useStyles();
    

  return (
    <>
        <Grid className={classes.winByContainer} container>
            <Grid item xs={4}>
                <Typography>Knockout{`(${winBy.winBy.knockout})`}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Knockdown{`(${winBy.winBy.knockdown})`}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography>Fall{`(${winBy.winBy.fall})`}</Typography>
            </Grid>
        </Grid>
    
    </>
  );
};

export default WinBy;
