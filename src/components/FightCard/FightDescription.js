import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(5),
        // marginBottom: theme.spacing(5),
        border: '1px solid black',
        borderRadius: '5px',
        padding: '10px'
    },
    descTitle: {
        fontSize: [22, '!important'],
    },
    text: {
        // paddingLeft: '10px'
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
        <Typography style={{marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #F74902'}} className={classes.descTitle}>Fight Description</Typography>
        <Typography className={classes.text}>
            {description}
        </Typography>
    </Container>
  );
}
