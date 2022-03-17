import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useState } from "react";
import TeamSearch from "../../../adminTools/TeamSearch";

const useStyles = makeStyles((theme) => ({
  formMargin: {
    margin: '10px'
  },
  rowContainer: {
    minWidth: "100%",
    marginBottom: '5px'
  }
}));

const CreateGameInput = () => {
  const classes = useStyles();

  //state for form
  const [gameDate, setGameDate] = useState(null);

  return (
    <Paper className={classes.rowContainer}>
      
        <Grid container>
          <Grid item xs={2}>
            <div className={classes.formMargin}>
              <LocalizationProvider  dateAdapter={AdapterDateFns}>
                  <DatePicker
                      className={classes.datePicker}
                      label="Choose Date"
                      value={gameDate}
                      onChange={(newValue) => {
                          setGameDate(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                  />
              </LocalizationProvider>
            </div>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={6}>
                <div className={classes.formMargin}>
                  <TeamSearch inputLabel='Choose Home Team' />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.formMargin}>
                  <TeamSearch inputLabel='Choose Away Team' />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={6}>
                <div className={classes.formMargin}>
                  <Button>Game Type</Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.formMargin}>
                  <Button>Description</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
      
    </Paper>
  )
}

export default CreateGameInput;