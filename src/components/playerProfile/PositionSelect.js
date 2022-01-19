import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const PositionSelect = ({ positionSelect }) => {
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
        <FormControl fullWidth>
          <InputLabel id="position-select-label">Position</InputLabel>
          <Select
            labelId="position-select-label"
            id="position-select"
            value={position}
            label="Position"
            onChange={handleChange}
          >
            {/* {!isFetching && 
                seasons.map(result => {
                    return <MenuItem key={result._id} value={result.season}>{result.season}</MenuItem>
                })
            } */}
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
