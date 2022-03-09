import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        // maxWidth: '50%'
    },
    cardContainer: {
        // minWidth: '70vw'
    },
    button: {
        textAlign: 'center',
        width: '100%'
    },
    text: {
        textAlign: 'center',
        fontSize: [15, '!important']        
    },
    vsTitle: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // border: '1px solid black',
        alignItems: 'center',
        justifyContent: 'center'
    },
    teamImg: {
        maxHeight: '80px'
    }
}));


export default function TeamCard({ fight, showGameLink, home = '' }) {
    const classes = useStyles();
    const navigate = useNavigate();

    let teams = fight.teams;

    let homeTeam;
    let awayTeam;
    if(home === teams[0].id){
        homeTeam = teams[0];
        awayTeam = teams[1];
    } else {
        homeTeam = teams[1];
        awayTeam = teams[0];
    }

    const viewGameBtn = () => {
        navigate(`/games/${fight.game._id}`);
    }

    const card = (
        <>
            <CardContent>
                <Grid container className={classes.cardContainer}>
                    <Grid align='center' item xs={5}>
                        <Link to={`/teams/${awayTeam.id}`}>
                            <img className={classes.teamImg} src={`/images/teams/${awayTeam.city}${awayTeam.name}.png`} alt={`${awayTeam.city}`} />
                            <Typography>{awayTeam.city} {awayTeam.name}</Typography>
                        </Link>
                    </Grid>
                    <Grid align='center' item xs={2}>
                        <Typography className={classes.vsTitle}>At</Typography>    
                    </Grid>
                    <Grid align='center' item xs={5}>
                        <Link to={`/teams/${homeTeam.id}`}>
                            <img className={classes.teamImg} src={`/images/teams/${homeTeam.city}${homeTeam.name}.png`} alt={`${homeTeam.city}`} />
                            <Typography>{homeTeam.city} {homeTeam.name}</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </CardContent>
            {showGameLink && 
                <CardActions>
                    <Button className={classes.button} onClick={viewGameBtn} size="small">View Game Details</Button>
                </CardActions>
            }
            
        </>
    );



  return (
    <Container className={classes.container}>
        <Card variant="elevation">{card}</Card>
    </Container>
      
    
  );
}