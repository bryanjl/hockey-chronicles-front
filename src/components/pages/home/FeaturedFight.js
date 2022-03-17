import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect } from "react";
import EmbedYouTube from '../../EmbedYouTube';

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '300px',
        // width: '100%',
        padding: '5px',
        margin: '15px'
    }
}));

const FeaturedFight = () => {
    const classes = useStyles();

    useEffect(() => {
        //get featuredf fight from DB
    }, []);

    return (
        <Paper elevation={8} className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h5'>Featured Fight</Typography>
                </Grid>
                <Grid item xs={12}>DATE</Grid>
                <Grid item xs={5}>
                    <EmbedYouTube 
                        // videoLink={} 
                    />
                </Grid>
                <Grid item xs={7}>
                    <Grid container>
                        <Grid item xs={6} align='center'>
                            Player 1
                        </Grid>
                        <Grid item xs={6} align='center'>
                            Player 2
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant='filled'
                    >
                        View Fight
                    </Button>
                </Grid>
            </Grid>
            
        </Paper>
    )
}

export default FeaturedFight
