import { TextField } from "@material-ui/core";
import { LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useState } from "react";


const GameTimePicker = () => {
  const [gameTime, setGameTime] = useState('');

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
          ampm={false}
          views={['minutes', 'seconds']}
          inputFormat="mm:ss"
          mask="__:__"
          label="Time of fight/event"
          value={gameTime}
          onChange={(newValue) => {
            setGameTime(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

export default GameTimePicker;