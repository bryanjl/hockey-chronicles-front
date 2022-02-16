import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';

import { useState } from 'react';
import { LocalizationProvider } from '@mui/lab';

function DatePickerDesktop({gameDate}) {
    let date;
    if(gameDate === ''){
        date = new Date();
    } else {
        date = new Date(gameDate);
    }
    const [value, setValue] = useState(date);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
            label="Game Date"
            inputFormat="MM/dd/yyyy"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>    
    );
}

export default DatePickerDesktop;