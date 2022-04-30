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
        width: '100%',
        marginBottom: '15px'
    },
    button: {
        marginBottom: '15px',
        marginTop: '15px',
    },
    actionRatingTitle: {
        padding: '15px'
    },
    chartContainer: {
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: '15px'
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
        //set new action rating state
        let newVotes = action.votes + 1;
        let newAvg = ((action.average * action.votes) + valuesObj.actionRating) / newVotes;
        let newAction = {
            average: newAvg,
            votes: newVotes
        }
        setAction(newAction);

        //set new outcome and update state
        let newOutcome = {...outcome};
        delete newOutcome.winner;
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

        await updateOutcomeAPI(fight._id, requestBody);
    }

    return (
        <Grid container className={classes.voteContainer}>
            <Grid item xs={12}>
            <Typography variant='h5' style={{marginBottom: '15px', marginTop: '15px', backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px'}}>Voting Results</Typography>
            </Grid>
            <Grid item xs={12} align='center'>
                <Grid container>
                    <Grid item xs={12} align='center'>
                        <WinBy winBy={winBy} />
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant='h6' style={{marginBottom: '15px', marginTop: '15px', backgroundColor: 'black', color: '#F74902', borderBottom: '1px solid #F74902', padding: '5px'}}>Fight Winner</Typography>
                        <div className={classes.chartContainer}>
                            <OutcomeChart key={rerenderKey} fight={fight} outcome={outcome} />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                    <Typography variant='h6' style={{marginBottom: '15px', marginTop: '15px', backgroundColor: 'black', color: '#F74902', borderBottom: '1px solid #F74902', padding: '5px'}}>Action Rating</Typography>
                        <div className={classes.chartContainer} style={{borderLeft: '1px solid black'}}>
                        
                            <ActionRatingChart key={rerenderKey} actionRating={action.average} />
                        </div>
                        
                    </Grid>
                </Grid>
            </Grid>     

            <Grid item xs={12}>
                <Button variant='outlined' style={{ backgroundColor: 'black', color: '#F74902' }} className={classes.button} onClick={handleClickOpen} fullWidth>Vote Now</Button>
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
