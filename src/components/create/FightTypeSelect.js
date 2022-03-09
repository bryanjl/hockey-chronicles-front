import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useState } from 'react';

const FightTypeSelect = ({ setFormFightType, currFightType = 'Fight' }) => {
    //state for fight-select
    const [fightType, setFightType] = useState(currFightType);

    const handleFightSelectChange = (e) => {
        setFightType(e.target.value);
        setFormFightType(e.target.value);
    }


    return (
        <FormControl fullWidth>
            <InputLabel id="fight-select">Fight Type</InputLabel>
            <Select
                labelId="fight-select"
                id="fight-simple-select"
                value={fightType}
                label="Fight Type"
                onChange={handleFightSelectChange}
            >   
                <MenuItem value={'Fight'}>Fight</MenuItem>
                <MenuItem value={'Rough'}>Rough</MenuItem>
                <MenuItem value={'Cheap'}>Cheap</MenuItem>
                <MenuItem value={'Hit'}>Hit</MenuItem>
                <MenuItem value={'Brawl'}>Brawl</MenuItem>
                <MenuItem value={'Event'}>Event</MenuItem>
                <MenuItem value={'Refused'}>Refused</MenuItem>
                <MenuItem value={'Almost'}>Almost</MenuItem>
            </Select>
        </FormControl>
    )
}

export default FightTypeSelect;

