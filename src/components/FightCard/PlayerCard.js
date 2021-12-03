import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    cardContainer: {
        maxWidth: '275px',
        
        [theme.breakpoints.down('xs')]: {
            maxWidth: '125px'
        }
    },
    name: {
        fontSize: [25, '!important'],
        paddingBottom: theme.spacing(),
        [theme.breakpoints.down('xs')]: {
            fontSize: [15, '!important']
        }
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


    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
      const card = (
        <React.Fragment>
          <CardContent>
            <Typography className={classes.name}>
              {props.player.firstName} {props.player.lastName}
            </Typography>
            <Typography className={classes.weightHeight} >
              {props.player.height}cm {props.player.weight}lb 
            </Typography>
            <Typography className={classes.position}>
              {props.player.position} - Shoots {props.player.shoots}
            </Typography>
            <Typography className={classes.stats}>
              {props.player.wins}{bull}{props.player.losses}{bull}{props.player.draws} (W-L-D)
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => alert('hello')} size="small">View Player Profile</Button>
          </CardActions>
        </React.Fragment>
      );



  return (
    <Box className={classes.cardContainer}>
      <Card variant="elevation" className={classes.card}>{card}</Card>
    </Box>
    
  );
}

