import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllLeagues as getAllLeaguesAPI } from '../../api/leagues/leaguesApi';
import { FormHelperText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  selectBox: {
    marginRight: '5px',
    marginLeft: '5px'
  },
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

const LeagueSelect = ({ leagueSelect, formError = false, value = null }) => {
  const classes = useStyles();

    //state for leagues api
    const [leagues, setLeagues] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for current league value
    const [league, setLeague] = useState(value || '');

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
        <Box className={classes.selectBox} sx={{ minWidth: 120 }}>
        <FormControl
          variant='outlined'
          classes={{
            root: classes.select
          }}
          fullWidth
        >
          <InputLabel id="league-select-label">League</InputLabel>
          <Select
            error={formError}
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
          </Select>
          <FormHelperText error={formError}>{formError ? 'Please select a league' : ''}</FormHelperText>
        </FormControl>
      </Box>
    )
}

export default LeagueSelect;
