import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid, makeStyles } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    container: {
        width: '75%'
    },
    button: {
        textAlign: 'center',
        width: '100%'
    },
    text: {
        textAlign: 'center',
        fontSize: [22, '!important']        
    },
    vsTitle: {
        display: 'flex',
        height: '100%',
        width: '100%',
        // border: '1px solid black',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export default function TeamCard({ fight }) {

    const classes = useStyles();

    let teams = fight.teams;

    const card = (
        <React.Fragment>
        <CardContent>
            <Grid container>
                <Grid item sm={5}>
                    <Grid item sm={12}> 
                        <Typography className={classes.text}>
                            {teams[0].city}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}> 
                        <Typography className={classes.text}>
                            {teams[0].name}
                        </Typography>
                    </Grid>                    
                </Grid>
                <Grid item sm={2}>
                    <Typography className={classes.vsTitle}>VS</Typography>
                </Grid>
                <Grid item sm={5}>
                    <Grid item sm={12}> 
                        <Typography className={classes.text}>
                            {teams[1].city}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}> 
                        <Typography className={classes.text}>
                            {teams[1].name}
                        </Typography>
                    </Grid> 
                </Grid>
                <Grid item sm={12}>
                    <Typography className={classes.text}>
                        {fight.gameType} Game
                    </Typography>
                </Grid>
                <Grid item sm={12}>
                    <Typography className={classes.text}>
                        {(fight.fightType !== 'Fight') && fight.fightType}
                    </Typography>
                </Grid>
            </Grid>
            
        </CardContent>
        <CardActions>
            <Button className={classes.button} onClick={() => alert('hello')} size="small">View Game Details</Button>
        </CardActions>
        </React.Fragment>
    );



  return (
    <Container className={classes.container}>
        <Card variant="elevation">{card}</Card>
    </Container>
      
    
  );
}