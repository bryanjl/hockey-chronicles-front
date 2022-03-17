import { Grid } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import { getUserDetails as getUserDetailsAPI} from './api/auth/authApi';
import { makeStyles } from "@material-ui/core";
import Header from "./components/Header";
import LeftBar from './components/LeftBar';
import Feed from './components/Feed';
import RightBar from './components/RightBar';
import Footer from './components/Footer';
// import FightCard from "./components/FightCard/FightCard";
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) =>({
  rightBar: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  leftBar: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  }
}));

function App() {
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetailsAPI().then(response => {
      // console.log(response);
      setUser(response);
    });
  }, [])

  // search query comes from header
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  // const classes = useStyles();
  return (
    <Router>
      <div>
        <UserContext.Provider value={{ user, setUser }}>
          <Header handleSearch={handleSearch} />
          <Grid container>
            <Grid item md={2} className={classes.leftBar}>
              <LeftBar />
            </Grid>
            <Grid item md={7} sm={12} xs={12}>
              <Feed searchQuery={searchValue} />
            </Grid>
            <Grid item md={3} className={classes.rightBar}>
              <RightBar />
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
