import PlayerCard from './PlayerCard';
import FightDescription from './FightDescription';
import DateDisplay from './DateDisplay';
import TeamCard from './TeamCard';
import EmbedYouTube from '../EmbedYouTube';
import { Grid, makeStyles } from '@material-ui/core';
import Comments from '../comments/Comments';
// import OutcomeChart from '../charts/OutcomeChart';
import Vote from './Vote';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//api
import {
    getFight,
    updateOutcome
} from '../../api/fights/fightApi';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'red'
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

    const [fight, setFight] = useState({data: {}, isFetching: true});   
    
    let { fightID } = useParams();

    useEffect(() => {
        setFight({data: {}, isFetching: true })
        getFight(fightID).then(data => {
            // console.log(data);
            setFight({data: data.data, isFetching: false});
        });
        //eslint-disable-next-line   
    }, []);

    const voteUpdate = async() => {
        await updateOutcome(fight.data._id, {outcome: fight.data.outcome});
        // console.log('updated vote to API')
    }

    return (
            !fight.isFetching && 
                <Grid container className={classes.container}>
            
                <Grid item sm={12} className={classes.item}>  
                    <DateDisplay date={new Date(fight.data.date.split('T')[0]).toDateString()} season={fight.data.season.season} />
                </Grid>
                <Grid item sm={12} className={classes.item}>  
                    <TeamCard fight={fight.data} />
                </Grid>
                <Grid item sm={4} className={classes.item}>  
                    <PlayerCard player={fight.data.players[1]} />
                </Grid>
                <Grid item sm={4} className={`${classes.item} ${classes.chart}`}>  
                    <Vote fight={fight} setFight={setFight} voteUpdate={voteUpdate} />
                </Grid>
                <Grid item sm={4} className={classes.item}>
                    <PlayerCard player={fight.data.players[0]} />
                </Grid>
                <Grid item sm={12} className={classes.item}>
                    <EmbedYouTube videoLink={fight.data.videoLink} />
                </Grid>
                <Grid item sm={12} className={classes.item}>
                    <FightDescription description={fight.data.description} />
                </Grid>
                <Grid item sm={12} className={classes.item}>
                    <Comments className={classes.comments} model='fights' recordId={fight.data._id} comments={fight.data.comments} />
                </Grid>
            </Grid>
    )
}

export default FightCard;
