import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllSeasons as getAllSeasonsAPI } from '../../api/seasons/seasonsApi';

const SeasonSelect = ({ seasonSelect }) => {
    //all seasons for menuitem list
    const [seasons, setSeasons] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for current selected season
    const [season, setSeason] = useState('');

    //get all the available seasons from API
    useEffect(() => {
        setIsFetching(true);
        getAllSeasonsAPI().then(data => {
            setSeasons(data.data);
            setIsFetching(false);
        });
    }, []);

    const handleChange = (e) => {
        console.log(e.target.value);
        setSeason(e.target.value);
        seasonSelect(e.target.value);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="season-select-label">Season</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={season}
            label="Season"
            onChange={handleChange}
          >
            {!isFetching && 
                seasons.map(result => {
                    return <MenuItem key={result._id} value={result.season}>{result.season}</MenuItem>
                })
            }
            {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    )
}

export default SeasonSelect
