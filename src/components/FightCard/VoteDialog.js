import { Box, DialogActions, DialogContent, Grid, Input, InputLabel, MenuItem, Select, Slider, Typography } from "@material-ui/core";
import { 
    Button, 
    Dialog, 
    DialogTitle, 
    FormControl
} from "@mui/material"
import { useState } from "react";

const VoteDialog = ({ onClose, open, players, onSubmit }) => {

    //state for player select
    const [value, setValue] = useState('draw');

    //state for action rating slider
    const [actionRating, setActionRating] = useState(5);

    //state for won by 
    const [wonBy, setWonBy] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
        // console.log(value);
    }

    const handleWonByChange = (event) => {
        setWonBy(event.target.value);
    }

    const submitVote = () => {
        let voteObj = {
            outcome: value,
            wonBy: wonBy,
            actionRating: actionRating
        }
        // console.log(value)
        onSubmit(voteObj);;
        // console.log(value, wonBy, actionRating)
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
                    <Grid item xs={12}>
                        <Box>
                            <FormControl
                                variant='outlined'
                                style={{
                                    marginBottom: '25px'
                                }}
                                fullWidth
                            >
                                <InputLabel 
                                    style={{
                                        marginBottom: '15px'
                                    }}
                                    id='winner-select-label'>Choose the Winner:</InputLabel>
                                <Select
                                    labelId='winner-select-label'
                                    id='winner-select'
                                    label='Choose the Winner:'
                                    value={value}
                                    onChange={handleChange}
                                >
                                    <MenuItem
                                        value={players[0].id}
                                    >
                                        {`${players[0].firstName} ${players[0].lastName}`}
                                    </MenuItem> 
                                    <MenuItem
                                        value='draw'
                                    >
                                        Draw
                                    </MenuItem>  
                                    <MenuItem
                                        value={players[1].id}
                                    >
                                        {`${players[1].firstName} ${players[1].lastName}`}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                
                
                    <Grid item xs={12}>
                        <Box>
                            <FormControl 
                                variant='outlined'
                                style={{
                                    marginBottom: '25px'
                                }}
                                fullWidth
                            >
                                <InputLabel 
                                    id='won-by-select-label'
                                    style={{
                                        marginBottom: '15px'
                                    }}
                                >Won by:</InputLabel>
                                <Select
                                    labelId="won-by-select-label"
                                    id='won-by-select'
                                    value={wonBy}
                                    label='Won By:'
                                    onChange={handleWonByChange}
                                >
                                    <MenuItem value='splitDecision'>Split Decision(Slight edge)</MenuItem>
                                    <MenuItem value='unanimousDecision'>Unanimous Decision(Decisive edge)</MenuItem>
                                    <MenuItem value='beatdown'>Beatdown</MenuItem>
                                    <MenuItem value='tko'>TKO</MenuItem>
                                    <MenuItem value='knockout'>Knockout</MenuItem>
                                    <MenuItem value='noDecision'>No-Decision</MenuItem>
                                    <MenuItem value='draw'>Draw</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid align='center' item xs={12}>
                        <Box sx={{ width: 250 }}>
                            <Typography align='center' id="input-slider" gutterBottom>
                                Action Rating
                            </Typography>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs>
                                    <Slider
                                        style={{
                                            color: '#F74902'
                                        }}
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
                                        disableUnderline
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
               <Button style={{
                   color: '#F74902',
                   borderColor: 'black'
               }} variant="outlined" fullWidth onClick={submitVote}>Submit Vote</Button>
            </DialogActions>
        </Dialog>
    )
}

export default VoteDialog;
