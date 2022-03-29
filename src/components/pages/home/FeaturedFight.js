import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmbedYouTube from '../../EmbedYouTube';
// import PlayerCard from '../../FightCard/PlayerCard';
// import PlayerThumb from '../../playerProfile/PlayerThumb';
//api
import { getFeaturedFight as getFeaturedFightAPI } from "../../../api/fights/fightApi";

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: '300px',
        // width: '100%',
        padding: '15px',
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
        margin: '15px'
    }
}));

const FeaturedFight = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    //state for feature fight
    const [featuredFight, setFeaturedFight] = useState({});
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        //get featuredf fight from DB
        getFeaturedFightAPI().then(response => {
            setFeaturedFight(response.data);
            setIsFetching(false);
        });
    }, []);

    const handleClick = () => {
        navigate(`/fights/${featuredFight._id}`)
    }

    return (
        <Paper elevation={8} className={classes.container}>
            {!isFetching && 
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Featured Fight</Typography>
                        
                    </Grid>
                    <Grid align='center' item xs={12}>
                        <Typography variant='h6'>
                            {new Date(featuredFight.date).toDateString()}   
                        </Typography>
                    </Grid>
                    <Grid align='center' item xs={12}>
                        <Typography variant='h4'>{`${featuredFight.players[0].firstName} ${featuredFight.players[0].lastName} Vs ${featuredFight.players[1].firstName} ${featuredFight.players[1].lastName}`}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <EmbedYouTube 
                            videoLink={featuredFight.videoLink} 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.descriptionBox}>
                            <Typography variant='subtitle1'>{featuredFight.description}</Typography>
                        </Box>
                        
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Button
                            onClick={handleClick}
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