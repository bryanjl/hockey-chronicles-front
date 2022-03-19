import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import EmbedYouTube from '../../EmbedYouTube';
import PlayerCard from '../../FightCard/PlayerCard';
import PlayerThumb from '../../playerProfile/PlayerThumb';
//api
import { getFeaturedFight as getFeaturedFightAPI } from "../../../api/fights/fightApi";

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '300px',
        // width: '100%',
        padding: '5px',
        margin: '15px',
        marginBottom: '100px'
    },
    viewFightBtn: {
        backgroundColor: theme.palette.primary.light,
        marginTop: '10px'
    },
    descriptionBox:{
        minHeight: '100%',
        width: '95%',
        // border: '1px solid black',
        marginTop: '10px',
        marginLeft: '7px'
    }
}));

const FeaturedFight = () => {
    const classes = useStyles();

    //state for feature fight
    const [featuredFight, setFeaturedFight] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        //get featuredf fight from DB
        getFeaturedFightAPI().then(response => {
            console.log(response);
            setFeaturedFight(response.data);
            setIsFetching(false);
        });
    }, []);

    return (
        <Paper elevation={8} className={classes.container}>
            {!isFetching && 
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Featured Fight</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            {new Date(featuredFight.date).toDateString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <EmbedYouTube 
                            videoLink={featuredFight.videoLink} 
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container>
                            <Grid item xs={6} align='center'>
                                {/* <PlayerCard player={featuredFight.players[0]} /> */}
                                <PlayerThumb player={featuredFight.players[0]} />
                            </Grid>
                            <Grid item xs={6} align='center'>
                                {/* <PlayerCard player={featuredFight.players[1]} /> */}
                                <PlayerThumb player={featuredFight.players[1]} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box className={classes.descriptionBox}>
                                    <Typography>{featuredFight.description}</Typography>
                                </Box>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='outlined'
                            className={classes.viewFightBtn}
                        >
                            View Fight
                        </Button>
                    </Grid>
                </Grid>
            } 
        </Paper>
    )
}

export default FeaturedFight;
