import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    descTitle: {
        fontSize: [22, '!important'],
        fontWeight: 'bold'
    },
    text: {
        paddingLeft: '10px'
    }
}));

export default function FightDescription({ description = '' }) {
    const classes = useStyles();

    if(description === ''){
        return (
            <div></div>
        )
    }

    return (
    <Container className={classes.container}>
        <Typography className={classes.descTitle}>Fight Description</Typography>
        <Typography className={classes.text}>
            {description}
        </Typography>
    </Container>
  );
}
