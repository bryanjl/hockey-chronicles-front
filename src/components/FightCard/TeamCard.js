import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        minWidth: '70vw'
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


export default function TeamCard({ fight, showGameLink }) {
    const classes = useStyles();
    const navigate = useNavigate();

    let teams = fight.teams;

    let homeTeam;
    let awayTeam;
    if(teams[0].home) {
        homeTeam = teams[0];
        awayTeam = teams[1];
    } else {
        homeTeam = teams[1];
        awayTeam = teams[0];
    }

    const viewGameBtn = () => {
        navigate(`/games/${fight.game}`);
    }

    const card = (
        <>
            <CardContent>
                <Grid container className={classes.cardContainer}>
                    <Grid item xs={4}>
                        <img className={classes.teamImg} src={`/images/teams/${awayTeam.city}${awayTeam.name}.png`} alt={`${awayTeam.city}`} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.vsTitle}>At</Typography>    
                    </Grid>
                    <Grid item xs={4}>
                        <img className={classes.teamImg} src={`/images/teams/${homeTeam.city}${homeTeam.name}.png`} alt={`${homeTeam.city}`} />
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