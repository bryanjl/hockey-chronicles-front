//APIs
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import { teamsSearch as teamsSearchAPI } from '../../api/teams/teamsApi';

const TeamSearch = ({ updateTeam, team }) => {
    //state for player search results
    const [teamResults, setTeamResults] = useState([]);

    useEffect(() => {
        teamsSearchAPI().then((data) => {
            setTeamResults(data.teams);
        });
    }, []);

    const handleChange = (event, value) => {
    //   setFormTeam(value);
    // console.log(value);
        updateTeam(value, team);
    }

    return (    
        <>
        
            <Autocomplete
              disablePortal
              id="Team Search"
              disableClearable
              defaultValue={team}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              onChange={handleChange}
              options={teamResults}
              getOptionLabel={(option) => `${option.city} ${option.name}`}
              renderOption={(props, option) => {
                  return (
                    <li {...props} key={option._id}>
                      {`${option.city} ${option.name}`}
                    </li>
                  );
                }}
              renderInput={(params) => (
              <TextField
                  {...params}
                  label="Search teams"
                  InputProps={{
                      ...params.InputProps,
                      type: 'search',
                }}
            />
            )}
      />
      </>
    )
}

export default TeamSearch;