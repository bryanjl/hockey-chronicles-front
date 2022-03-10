import PlayerCard from './PlayerCard';
import FightDescription from './FightDescription';
import DateDisplay from './DateDisplay';
import TeamCard from './TeamCard';
import EmbedYouTube from '../EmbedYouTube';
import { Button, Grid, makeStyles } from '@material-ui/core';
import Comments from '../comments/Comments';
// import OutcomeChart from '../charts/OutcomeChart';
import Vote from './Vote';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//admin tool components
import EditFightCardDialog from '../adminTools/edit/EditFightCardDialog';

//api
import {
    getFight
} from '../../api/fights/fightApi';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        // backgroundColor: 'red'
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
        // border: '1px solid black'
    },
    comments: {
        
    },
    chart: {
        marginTop: 'auto'
    }
}));

const FightCard = () => {
    const classes = useStyles();

    const [fight, setFight] = useState({});   

    const [isFetching, setIsFetching] = useState(true);
    
    let { fightID } = useParams();

    //Administration tools state and functions
    const [openEditFight, setOpenEditFight] = useState(false);

    const handleEditFightClose = () => {
        setOpenEditFight(false);
    }

    const handleEditFightOpen = () => {
        setOpenEditFight(true);
    }


    useEffect(() => {
        setIsFetching(true);
        getFight(fightID).then(data => {
            console.log(data);
            setFight(data.data);
            setIsFetching(false);
        });
        //eslint-disable-next-line   
    }, []);

    return (
            !isFetching && 
                <Grid container className={classes.container}>
            
                <Grid item xs={12} className={classes.item}>  
                    <DateDisplay date={new Date(fight.date.split('T')[0]).toDateString()} season={fight.season.season} />
                </Grid>
                <Grid item sm={12} className={classes.item}>  
                    <TeamCard fight={fight} showGameLink={true} home={fight.game.homeTeam} />
                </Grid>
                <Grid item xs={6} className={classes.item}>  
                    <PlayerCard player={fight.players[1]} />
                </Grid>
                
                <Grid item xs={6} className={classes.item}>
                    <PlayerCard player={fight.players[0]} />
                </Grid>

                <Grid item xs={12} align='center'>
                    <Typography>{fight.fightType} at {fight.time ? fight.time : 'Time in Game'}</Typography>
                </Grid>

                <Grid item sm={12} className={classes.item}>
                    <EmbedYouTube videoLink={fight.videoLink} />
                </Grid>
                
                <Grid item xs={12} className={`${classes.item} ${classes.chart}`}>  
                    <Vote fight={fight} />
                </Grid>


                <Grid item sm={12} className={classes.item}>
                    <FightDescription description={fight.description} />
                </Grid>
                
                <Typography>Administration Tools:</Typography>
                <Button onClick={handleEditFightOpen} fullWidth variant='contained'>Edit Fight Card</Button>

                <EditFightCardDialog fight={fight} setFight={setFight} open={openEditFight} handleClose={handleEditFightClose} />

                <Grid item sm={12} className={classes.item}>
                    <Comments className={classes.comments} model='fights' recordId={fight._id} comments={fight.comments} />
                </Grid>
            </Grid>
    )
}

export default FightCard;
