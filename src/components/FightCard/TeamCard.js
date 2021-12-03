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
    }
}));

export default function TeamCard(props) {

    const classes = useStyles();

    let teams = props.teams;

    const card = (
        <React.Fragment>
        <CardContent>
            <Grid container>
                <Grid item sm={6}>
                    <Typography className={classes.text}>
                        {teams[0].city} {teams[0].name}
                    </Typography>
                    {/* <Typography>
                        {teams[0].league}
                    </Typography> */}
                </Grid>
                <Grid item sm={6}>
                    <Typography className={classes.text}>
                        {teams[1].city} {teams[1].name}
                    </Typography>
                    {/* <Typography>
                        {teams[1].league}
                    </Typography> */}
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