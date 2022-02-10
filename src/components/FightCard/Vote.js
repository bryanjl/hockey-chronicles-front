import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import OutcomeChart from "../charts/OutcomeChart";
import ActionRatingChart from "../charts/ActionRatingChart";
import { useState } from "react";
import VoteDialog from "./VoteDialog";

const useStyles = makeStyles((theme) => ({
    voteContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {
        marginBottom: '15px'
    },
    title: {
        
    }
}));

const Vote = ({ fight, setFight, voteUpdate }) => {
    console.log(fight);
    const classes = useStyles();

    const [rerenderKey, setRerenderKey] = useState(1);

    //state for voting dialog
    const [open, setOpen] = useState(false);

    //voting dialog functions
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
    }

    const submitVote = (value) => {
        
        // console.log('here');
        let data = {...fight.data}
        data.outcome[value] = fight.data.outcome[value] + 1;
        //force rerender of outcome chart
        setRerenderKey(rerenderKey+1);
        setFight({ data, isFetching: false });

        voteUpdate();
    }

    return (
        <Grid container className={classes.voteContainer}>
            <Grid item xs={12} align='center'>
                <Typography variant='h5' className={classes.title}>
                    Voting Results
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <OutcomeChart key={rerenderKey} fight={fight} />
            </Grid>

            <Grid item xs={12} align='center'>
                <ActionRatingChart key={rerenderKey} fight={fight} />
            </Grid>

            <Grid item xs={12}>
                <Button variant='outlined' className={classes.button} onClick={handleClickOpen} fullWidth>Vote Now</Button>
            </Grid>
            <VoteDialog
                players={fight.data.players}
                onSubmit={submitVote}
                open={open}
                onClose={handleClose}
            />
        </Grid>
    )
}

export default Vote
