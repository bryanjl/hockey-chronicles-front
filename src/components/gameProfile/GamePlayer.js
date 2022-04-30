import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    cardContainer: {
      maxWidth: '275px',
      height: '100%',
      [theme.breakpoints.down('xs')]: {
          maxWidth: '125px'
      },
      padding: '5px'
    },
    card: {
      height: '100%',
      maxWidth: '275px',
      cursor: 'pointer'
    },
    name: {
      display: 'flex',
      width: '100%',
      fontSize: [25, '!important'],
      paddingBottom: theme.spacing(),
      [theme.breakpoints.down('xs')]: {
          fontSize: [15, '!important']
      },
      justifyContent: 'center'
    },
    stats: {
      fontSize: [25, '!important'],
      paddingTop: theme.spacing(),
      [theme.breakpoints.down('xs')]: {
          fontSize: [12, '!important']
      }
    },
    weightHeight: {
      fontSize: [15, '!important'],
      [theme.breakpoints.down('xs')]: {
          display: 'none'
      }
    },
    position: {
      fontSize: [15, '!important'],
      [theme.breakpoints.down('xs')]: {
          display: 'none'
      }
    }
}));

export default function OutlinedCard(props) {
    const classes = useStyles();

    // console.log(props.players);

  const navigate = useNavigate();

  const getPlayer = () => {
    // console.log(props.player._id);
    navigate(`/players/${props.player._id ? props.player._id : props.player.id}`)
  }

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
      const card = (
        <>
          <CardContent>
            <Grid container> 
              <Grid item xs={12}>
                <Typography className={classes.name}>
                  {props.player.firstName}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.name}>
                  {props.player.lastName}
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <Typography textAlign='center' className={classes.stats}>
                  {props.player.wins}{bull}{props.player.losses}{bull}{props.player.draws} (W-L-D)
                </Typography>
              </Grid>
            </Grid> 
          </CardContent>
        </>
      );



  return (
    <Box className={classes.cardContainer}>
      <Card 
        onClick={getPlayer} 
        className={classes.card}
        style={{ border: 'none', boxShadow: 'none' }}
    >
        {card}
    </Card>
    </Box>
    
  );
}

