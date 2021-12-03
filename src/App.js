import { makeStyles, Grid } from '@material-ui/core';

import Header from "./components/Header";
import LeftBar from './components/LeftBar';
import Feed from './components/Feed';
import RightBar from './components/RightBar';
import FightCard from "./components/FightCard/FightCard";

const useStyles = makeStyles((theme) =>({
  rightBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <Grid container>
        {/* <Grid item sm={2} xs={2}>
          <LeftBar />
        </Grid> */}
        <Grid item sm={12} xs={12}>
          <Feed />
        </Grid>
        {/* <Grid item sm={3} className={classes.rightBar}>
          <RightBar />
        </Grid> */}
      </Grid>
    </div>
  );
}

export default App;
