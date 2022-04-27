import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  select: {
    "& .MuiInputLabel-root": {
      color: "black"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "&:hover .MuiInputLabel-root": {
      color: "#F74902"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F74902"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "black"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#F74902"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#F74902"
    }
}
}));

const PositionSelect = ({ positionSelect }) => {
  const classes = useStyles();

    //state for position value
    const [position, setPosition] = useState('');

    //handle change
    const handleChange = (e) => {
        // console.log(e.target.value);
        setPosition(e.target.value);
        positionSelect(e.target.value);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl 
          variant='outlined'
          classes={{
            root: classes.select
          }}
          fullWidth
        >
          <InputLabel id="position-select-label">Choose a Position</InputLabel>
          <Select
            labelId="position-select-label"
            id="position-select"
            value={position}
            label="Position"
            onChange={handleChange}
          >
            <MenuItem value={''}>All Positions</MenuItem>
            <MenuItem value={'Center'}>Center</MenuItem>
            <MenuItem value={'Left Wing'}>Left Wing</MenuItem>
            <MenuItem value={'Right Wing'}>Right Wing</MenuItem>
            <MenuItem value={'Defense'}>Defense</MenuItem>
            <MenuItem value={'Goalie'}>Goalie</MenuItem>
          </Select>
        </FormControl>
      </Box>
    )
}

export default PositionSelect;
