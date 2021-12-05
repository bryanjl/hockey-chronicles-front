import PlayerCard from './PlayerCard';
import FightDescription from './FightDescription';
import DateDisplay from './DateDisplay';
import TeamCard from './TeamCard';
import EmbedYouTube from '../EmbedYouTube';
import { Grid, makeStyles } from '@material-ui/core';
import Comments from '../comments/Comments';
import OutcomeChart from '../charts/OutcomeChart';


const player = {
    firstName: 'Bryan',
    lastName: 'Lilly',
    position: 'Center',
    wins: 1,
    losses: 2,
    draws: 3,
    unfairTally: 2,
    actionRating: 6.5,
    height: 187,
    weight: 200,
    shoots: 'Left'
    
}

const description = "'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum      quasi quidem quibusdam.'"

const date = 'Feb 7th, 1987'
const season = '1986-1987'

const teams = [
    {
        city: 'Vancouver',
        name: 'Canucks',
        league: 'NHL'
    },
    {
        city: 'Chicago',
        name: 'Blackhawks',
        league: 'NHL'
    }
]

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
    return (
        <Grid container className={classes.container}>
            
            <Grid item sm={12} className={classes.item}>  
                <DateDisplay date={date} season={season} />
            </Grid>
            <Grid item sm={12} className={classes.item}>  
                <TeamCard teams={teams} />
            </Grid>
            <Grid item sm={4} className={classes.item}>  
                <PlayerCard player={player} />
            </Grid>
            <Grid item sm={4} className={`${classes.item} ${classes.chart}`}>  
                <OutcomeChart />
            </Grid>
            <Grid item sm={4} className={classes.item}>
                <PlayerCard player={player} />
            </Grid>
            <Grid item sm={12} className={classes.item}>
                <EmbedYouTube />
            </Grid>
            <Grid item sm={12} className={classes.item}>
                <FightDescription description={description} />
            </Grid>
            <Grid item sm={12} className={classes.item}>
                <Comments className={classes.comments} currentUserId='1' />
            </Grid>
            {/* <PlayerCard player={player} /> */}
            {/* <DateDisplay date={date} season={season} /> */}
            
            {/* <FightDescription description={description}/> */}
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