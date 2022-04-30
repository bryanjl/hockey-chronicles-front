import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import { Typography } from '@mui/material';
import CircularLoadingAnimation from '../feedback/CircularLoadingAnimation';
import PlayerCard from './PlayerCard';
import FightDescription from './FightDescription';
import DateDisplay from './DateDisplay';
import TeamCard from './TeamCard';
import EmbedYouTube from '../EmbedYouTube';
import Comments from '../comments/Comments';
import Vote from './Vote';
//admin tool components
import EditFightCardDialog from '../adminTools/edit/EditFightCardDialog';
//user context
import { UserContext } from '../../contexts/UserContext';
//api
import { getFight } from '../../api/fights/fightApi';

const useStyles = makeStyles((theme) => ({
    dateSeasonContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '15px',
        marginTop: '15px',
        marginBottom: '15px',
        borderLeft: '3px solid black',
        borderBottom: '3px solid black',
        borderTop: '3px solid #F74902',
        borderRight: '3px solid #F74902',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px',
    },
    chart: {
        marginTop: 'auto'
    },
    vsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

const FightCard = () => {
    //user context -> or guest
    let { user } = useContext(UserContext);
    if(!user){
        user = {}
        user.role = 'guest'
    }

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
        <>
            {isFetching &&
                <CircularLoadingAnimation />
            }

            {!isFetching && fight.players.length > 0 &&
                <> 

                <Paper className={classes.dateSeasonContainer}>
                    
                            {/* <Paper style={{ maxHeight: '100px' }}>
                                
                                <TeamCard fight={fight} showGameLink={true} home={fight.game.homeTeam} />
                            </Paper> */}
                
                    <Grid container>
                        <Grid item xs={12}>
                            <DateDisplay date={new Date(fight.date.split('T')[0]).toDateString()} season={fight.season.season} />
                        </Grid>
                        <Grid item xs={5} className={classes.item}>  
                            <PlayerCard player={fight.players[1]} />
                        </Grid>
                        
                        <Grid item xs={2} className={classes.vsContainer}>
                            <Typography variant='h5'>VS</Typography>
                        </Grid>

                        <Grid item xs={5} className={classes.item}>
                            <PlayerCard player={fight.players[0]} />
                        </Grid>
                        <Grid item xs={12} align='center'>
                            <Typography variant='h6'>{fight.fightType} at {fight.time ? fight.time : 'Time in Game'}</Typography>
                        </Grid>
                        <Grid item sm={12} className={classes.item}>
                            <FightDescription description={fight.description} />
                        </Grid>
                    </Grid>
                </Paper>

                <Grid container className={classes.container}>
                    {fight.videoLink !== '' && 
                        <Grid item sm={12} className={classes.item}>
                            <EmbedYouTube videoLink={fight.videoLink} />
                        </Grid>
                    }
                    
                    <Grid item xs={12} className={`${classes.item} ${classes.chart}`}>  
                        <Vote fight={fight} />
                    </Grid>

                    {(user.role === 'admin' || user.role === 'super') && 
                        <>
                            <Typography>Administration Tools:</Typography>
                            <Button onClick={handleEditFightOpen} fullWidth variant='contained'>Edit Fight Card</Button>    
                        </>
                    }

                    <EditFightCardDialog fight={fight} setFight={setFight} open={openEditFight} handleClose={handleEditFightClose} />

                    <Grid item sm={12} className={classes.item}>
                        <Comments className={classes.comments} model='fights' recordId={fight._id} comments={fight.comments} />
                    </Grid>
                </Grid>
                </>
            }
            {!isFetching && fight.players.length === 0 &&
                <Grid container className={classes.container}>
                    <Grid item xs={12} className={classes.item}>  
                        <DateDisplay date={new Date(fight.date.split('T')[0]).toDateString()} season={fight.season.season} />
                    </Grid>
                    <Grid item sm={12} className={classes.item}>  
                        <TeamCard fight={fight} showGameLink={true} home={fight.game.homeTeam} />
                    </Grid>
                    <Grid item xs={12} align='center'>
                        <Typography variant='h6'>{fight.fightType === 'Event' ? fight.eventDescription : fight.fightType} at {fight.time ? fight.time : 'Time in Game'}</Typography>
                    </Grid>

                    {fight.videoLink !== '' && 
                        <Grid item sm={12} className={classes.item}>
                            <EmbedYouTube videoLink={fight.videoLink} />
                        </Grid>
                    }
                    
                    <Grid item sm={12} className={classes.item}>
                        <FightDescription description={fight.description} />
                    </Grid>

                    {(user.role === 'admin' || user.role === 'super') && 
                        <>
                            <Typography>Administration Tools:</Typography>
                            <Button onClick={handleEditFightOpen} fullWidth variant='contained'>Edit Fight Card</Button>    
                        </>
                    }

                    <EditFightCardDialog fight={fight} setFight={setFight} open={openEditFight} handleClose={handleEditFightClose} />

                    <Grid item sm={12} className={classes.item}>
                        <Comments className={classes.comments} model='fights' recordId={fight._id} comments={fight.comments} />
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default FightCard;
