import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: '10px'
    },
    text: {
        textAlign: 'center'
    },
    date: {
        fontSize: [21, '!important'],
        fontWeight: 'bold'
    }
}));

export default function Types(props) {
    const classes = useStyles();

    let date = new Date(props.date.split('T')[0]).toUTCString();
    
    date = date.split(' ').splice(0, 4).join(' ');

  return (
    <Container className={classes.container}>
        <Typography className={`${classes.text} ${classes.date}`}>
            {date}
        </Typography>
        <Typography className={classes.text}>
            {props.season} season
        </Typography>
    </Container>
  );
}

// 






