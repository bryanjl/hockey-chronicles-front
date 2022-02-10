import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, makeStyles } from '@material-ui/core';




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

export default function TeamCard({ fight }) {

    const classes = useStyles();

    let teams = fight.teams;

    const card = (
        <>
            <CardContent>
                <Grid container className={classes.cardContainer}>
                    <Grid item xs={4}>
                        <img className={classes.teamImg} src={`/images/teams/${teams[0].city}${teams[0].name}.png`} alt={`${teams.city}`} />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.vsTitle}>VS</Typography>    
                    </Grid>
                    <Grid item xs={4}>
                        <img className={classes.teamImg} src={`/images/teams/${teams[1].city}${teams[1].name}.png`} alt={`${teams.city}`} />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button className={classes.button} onClick={() => alert('hello')} size="small">View Game Details</Button>
            </CardActions>
        </>
    );



  return (
    <Container className={classes.container}>
        <Card variant="elevation">{card}</Card>
    </Container>
      
    
  );
}