import { makeStyles } from "@material-ui/core";
import { Button, Dialog, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        padding: '25px'
    }
}));

const VoteDialog = ({ onClose, open, players, onSubmit }) => {
    const classes = useStyles();

    const [value, setValue] = useState('draw');


    const handleChange = (event) => {
        setValue(event.target.value);
        // console.log(value);
    }

    const submitVote = () => {
        // console.log(value)
        onSubmit(value);
        onClose();
    }
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Cast Your Vote</DialogTitle>
            <FormControl component="fieldset" >
                <FormLabel component="legend"></FormLabel>
                <RadioGroup
                    aria-label="vote"
                    defaultValue="draw"
                    name="radio-buttons-group"
                    onChange={handleChange}
                    className={classes.radioGroup}
                >
                    <FormControlLabel value={players[0]._id} control={<Radio />} label={`${players[0].firstName} ${players[0].lastName}`} />
                    <FormControlLabel value="draw" control={<Radio />} label="Draw" />
                    <FormControlLabel value={players[1]._id} control={<Radio />} label={`${players[1].firstName} ${players[1].lastName}`} />
                </RadioGroup>
            </FormControl>
            <Button variant='outlined' onClick={submitVote}>Submit Vote</Button>
        </Dialog>
    )
}

export default VoteDialog
