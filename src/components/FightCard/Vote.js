import { Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import OutcomeChart from "../charts/OutcomeChart";
import ActionRatingChart from "../charts/ActionRatingChart";
import WinBy from "./WinBy";
import VoteDialog from "./VoteDialog";
import { updateOutcome as updateOutcomeAPI } from "../../api/fights/fightApi";

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

const Vote = ({ fight }) => {
    // console.log(fight);
    const classes = useStyles();

    const [rerenderKey, setRerenderKey] = useState(1);

    //state for voting dialog
    const [open, setOpen] = useState(false);

    //state for outcomeChart
    const [outcome, setOutcome] = useState(0);

    //state for KD, KO, Fall
    const initialState = {knockout: 0, knockdown: 0, fall: 0};
    const [winBy, setWinBy] = useState(initialState);

    //state for actionRating chart
    const [action, setAction] = useState(0);

    
    useEffect(() => {
        console.log('here');
        setAction(fight.actionRating);

        setOutcome(fight.outcome);
        
        if(fight.winBy){
            setWinBy(fight.winBy);
        }
        
        setRerenderKey(rerenderKey+1);
        // eslint-disable-next-line
    }, []);
    
    
    //voting dialog functions
    const handleClickOpen = () => {
        setOpen(true);
        
    }

    const handleClose = (value) => {
        setOpen(false);
    }

    const submitVote = async (valuesObj) => {
        // console.log(valuesObj);

        //set new action rating state
        let newVotes = action.votes + 1;
        let newAvg = ((action.average * action.votes) + valuesObj.actionRating) / newVotes;
        let newAction = {
            average: newAvg,
            votes: newVotes
        }
        setAction(newAction);
        
        // console.log(outcome);   

        //set new outcome and update state
        let newOutcome = {...outcome};
        newOutcome[valuesObj.outcome] = outcome[valuesObj.outcome] + 1;

        setOutcome(newOutcome);
        

        //set new winBy state
        let newWinBy = {...winBy};
        newWinBy[valuesObj.wonBy] = newWinBy[valuesObj.wonBy] + 1;
        setWinBy(newWinBy);

        setRerenderKey(rerenderKey+1);

        //PUT request to update API/DB
        let requestBody = {
            outcome: newOutcome,
            actionRating: valuesObj.actionRating,
            winBy: newWinBy
        };

        // console.log(requestBody);

        await updateOutcomeAPI(fight._id, requestBody);
        // console.log(response);
    }



    return (
        <Grid container className={classes.voteContainer}>
            <Grid item xs={12} align='center'>
                <Typography variant='h5' className={classes.title}>
                    Voting Results
                </Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <OutcomeChart key={rerenderKey} fight={fight} outcome={outcome} />
            </Grid>

            <Grid item xs={12} align='center'>
                <WinBy winBy={winBy} />
            </Grid>

            <Grid item xs={12} align='center'>
                <ActionRatingChart key={rerenderKey} actionRating={action.average} />
            </Grid>

            <Grid item xs={12}>
                <Button variant='outlined' className={classes.button} onClick={handleClickOpen} fullWidth>Vote Now</Button>
            </Grid>
            <VoteDialog
                players={fight.players}
                onSubmit={submitVote}
                open={open}
                onClose={handleClose}
            />
        </Grid>
    )
}

export default Vote;
