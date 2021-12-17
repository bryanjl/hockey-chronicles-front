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

//api
import {
    getFight,
    updateOutcome
} from '../../api/fights/fightApi';
// import { updateComment } from '../../api/comments/commentsApi';

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
    // 61af39ffc3886aea9b3e6573


    const classes = useStyles();

    const [fight, setFight] = useState({data: {}, isFetching: true});        
    
    // let comments = fight.data.comments;

    useEffect(() => {
        setFight({data: {}, isFetching: true })
        getFight('61b9cb8ba41de694cef62e0a').then(data => {
            console.log(data);
            setFight({data: data.data, isFetching: false});
        })   
    }, []);

    const voteUpdate = async() => {
        await updateOutcome(fight.data._id, {outcome: fight.data.outcome});
        console.log('updated vote to API')
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
                    <Comments className={classes.comments} fightId={fight.data._id} fight={fight.data} />
                </Grid>

            </Grid>
             
            
           


            
        
    )
}

export default FightCard

// <Grid container>
// <Grid item sm={2} xs={2}>
//   <LeftBar />
// </Grid>
// <Grid item sm={7} xs={10}>
//   <Feed />
// </Grid>
// <Grid item sm={3} className={classes.rightBar}>
//   <RightBar />
// </Grid>
// </Grid>