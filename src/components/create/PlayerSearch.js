//APIs
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@mui/material';
import { useEffect, useState } from 'react';
import { playerSearch as playersSearchAPI } from '../../api/players/playersApi';

const PlayerSearch = () => {
    //state for player search results
    const [playerResults, setPlayerResults] = useState([]);

    useEffect(() => {
        playersSearchAPI().then((data) => {
            setPlayerResults(data.players);
        });
    }, []);

    return (    
        <>
        
            <Autocomplete
            disablePortal
            id="Player Search"
            disableClearable
            options={playerResults}
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            renderOption={(props, option) => {
                return (
                  <li {...props} key={option._id}>
                    {`${option.firstName} ${option.lastName}`}
                  </li>
                );
              }}
            renderInput={(params) => (
            <TextField
                {...params}
                label="Search Players"
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

export default PlayerSearch;