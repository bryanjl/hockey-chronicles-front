import { Box, DialogActions, DialogContent, Grid, Input, makeStyles, Slider, Typography } from "@material-ui/core";
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Radio, 
    RadioGroup 
} from "@mui/material"
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    radioGroup: {
        padding: '25px'
    },
    submitBtn: {
        
    }
}));

const VoteDialog = ({ onClose, open, players, onSubmit }) => {
    const classes = useStyles();

    //state for player select
    const [value, setValue] = useState('draw');

    //state for action rating slider
    const [actionRating, setActionRating] = useState(5);

    //state for won by radio group
    const [wonBy, setWonBy] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        // console.log(value);
    }

    const handleWonByChange = (event) => {
        setWonBy(event.target.value);
    }

    const submitVote = () => {
        // console.log(value)
        // onSubmit(value);
        console.log(value, wonBy, actionRating)
        onClose();
    }

    const handleSliderChange = (event, newValue) => {
        setActionRating(newValue);
    }

    const handleInputChange = (event) => {
        setActionRating(event.target.value === '' ? '' : Number(event.target.value));
    }

    const handleBlur = () => {
        if (actionRating < 0) {
          setActionRating(0);
        } else if (actionRating > 10) {
          setActionRating(10);
        }
    }
    

    return (
        <Dialog fullWidth open={open} onClose={onClose}>
            <DialogTitle>Cast Your Vote</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                // m: 'auto',
                                // width: 'fit-content',
                            }}
                        >
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">Choose the winner:</FormLabel>
                                <RadioGroup
                                    aria-label="vote"
                                    defaultValue="draw"
                                    name="radio-buttons-group"
                                    onChange={handleChange}
                                    className={classes.radioGroup}
                                >
                                    <FormControlLabel value={players[0].id} control={<Radio />} label={`${players[0].firstName} ${players[0].lastName}`} />
                                    <FormControlLabel value="draw" control={<Radio />} label="Draw" />
                                    <FormControlLabel value={players[1].id} control={<Radio />} label={`${players[1].firstName} ${players[1].lastName}`} />
                                    
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                
                
                    <Grid item xs={6}>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                // m: 'auto',
                                // width: 'fit-content',
                            }}
                        >
                            <FormControl component="fieldset" >
                                <FormLabel component="legend">Won by:</FormLabel>
                                <RadioGroup
                                    aria-label="winner-by"
                                    // defaultValue="KD"
                                    name="won-by-radio-buttons-group"
                                    onChange={handleWonByChange}
                                    className={classes.radioGroup}
                                >
                                    <FormControlLabel value='KO' control={<Radio />} label={`Knockout`} />
                                    <FormControlLabel value="KD" control={<Radio />} label="Knockdown" />
                                    <FormControlLabel value='Fall' control={<Radio />} label={`Fall`} />
                                    
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid align='center' item xs={12}>
                        <Box sx={{ width: 250 }}>
                            <Typography align='left' id="input-slider" gutterBottom>
                                Action Rating
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        value={typeof actionRating === 'number' ? actionRating : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        min={0}
                                        max={10}
                                        step={0.1}
                                    />
                                    </Grid>
                                <Grid item>
                                    <Input
                                        value={actionRating}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: .1,
                                        min: 0,
                                        max: 10,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
               <Button className={classes.submitBtn} variant="outlined" fullWidth onClick={submitVote}>Submit Vote</Button>
            </DialogActions>
        </Dialog>
    )
}

export default VoteDialog;
