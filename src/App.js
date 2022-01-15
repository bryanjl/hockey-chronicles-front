import { makeStyles, Grid } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';

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
  const [user, setUser] = useState(null);

  // search query comes from header
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const classes = useStyles();
  return (
    <Router>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
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
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
