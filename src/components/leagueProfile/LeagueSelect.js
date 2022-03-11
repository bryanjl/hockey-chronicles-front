import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllLeagues as getAllLeaguesAPI } from '../../api/leagues/leaguesApi';

const LeagueSelect = ({ leagueSelect }) => {
    //state for leagues api
    const [leagues, setLeagues] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for current league value
    const [league, setLeague] = useState('');

    useEffect(() => {
        setIsFetching(true);
        getAllLeaguesAPI().then(data => {
            setLeagues(data.data);
            setIsFetching(false)
        })
    }, []);

    //handlechange for select
    const handleChange = (e) => {
        // console.log(e.target.value);
        setLeague(e.target.value);
        leagueSelect(e.target.value);
    }

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="league-select-label">League</InputLabel>
          <Select
            labelId="league-select-label"
            id="league-select"
            value={league}
            label="League"
            onChange={handleChange}
          >
            {!isFetching && 
                leagues.map(result => {
                    return <MenuItem key={result._id} value={result.name}>{result.name}</MenuItem>
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

export default LeagueSelect
