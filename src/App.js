import { makeStyles, Grid } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from "./components/Header";
// import LeftBar from './components/LeftBar';
import Feed from './components/Feed';
// import RightBar from './components/RightBar';
// import FightCard from "./components/FightCard/FightCard";
import { useState } from 'react';

const useStyles = makeStyles((theme) =>({
  rightBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

function App() {
  const [searchValue, setSearchValue] = useState('')

  // search query comes from header
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const classes = useStyles();
  return (
    <Router>
      <div>
        <Header handleSearch={handleSearch} />
        <Grid container>
          {/* <Grid item sm={2} xs={2}>
            <LeftBar />
          </Grid> */}
          <Grid item sm={12} xs={12}>
            <Feed searchQuery={searchValue} />
          </Grid>
          {/* <Grid item sm={3} className={classes.rightBar}>
            <RightBar />
          </Grid> */}
        </Grid>
      </div>
    </Router>
  );
}

export default App;
