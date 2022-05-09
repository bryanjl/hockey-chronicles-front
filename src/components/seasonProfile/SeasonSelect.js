import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { getAllSeasons as getAllSeasonsAPI } from '../../api/seasons/seasonsApi';
import { makeStyles } from '@material-ui/core';

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

const SeasonSelect = ({ seasonSelect, allSeasons = true, currSeason = '' }) => {
    const classes = useStyles();
  
    //all seasons for menuitem list
    const [seasons, setSeasons] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    //state for current selected season
    const [season, setSeason] = useState('');

    //get all the available seasons from API
    useEffect(() => {
        setIsFetching(true);
        getAllSeasonsAPI().then(data => {
            let orderedSeasons = data.data.sort((a, b) => {
               let first = parseInt(a.season.split('-'), 10);
               let second = parseInt(b.season.split('-'), 10);
               return first - second;
            });
            setSeasons(orderedSeasons);
            setIsFetching(false);
            setSeason(currSeason);
        });
        //eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        setSeason(e.target.value);
        seasonSelect(e.target.value);
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
          <InputLabel  id="season-select-label">Season</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={season}
            label="Season"
            onChange={handleChange}
          >
            {allSeasons && 
              <MenuItem value=''>All Seasons</MenuItem>
            }
            
            {!isFetching && 
                seasons.map(result => {
                    return <MenuItem key={result._id} value={result.season}>{result.season}</MenuItem>
                })
            }
          </Select>
        </FormControl>
      </Box>
    )
}

export default SeasonSelect
