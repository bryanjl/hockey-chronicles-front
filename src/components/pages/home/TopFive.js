import { makeStyles, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import SeasonSelect from "../../seasonProfile/SeasonSelect";
import { getTopFive as getTopFiveAPI } from "../../../api/fights/fightApi";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '15px',
        marginTop: '15px',
        borderLeft: '3px solid black',
        borderBottom: '3px solid black',
        borderTop: '3px solid #F74902',
        borderRight: '3px solid #F74902',
    },
    tabs: {
        marginBottom: '7px'
    },
    tableRow: {
        cursor: 'pointer'
    }
}));

const TopFive = () => {    
    const classes = useStyles();

    let navigate = useNavigate();
    
    //state for data from API
    const [topFivePlayers, setTopFivePlayers] = useState([]);
    const [topFiveTeams, setTopFiveTeams] = useState([]);

    const [isFetching, setIsFetching] = useState(true);

    //state for player/team tabs
    const [currTab, setCurrTab] = useState(0);
    
    useEffect(() => {  
        fetchData();
    }, []);

    const fetchData = (season = '') => {
        // if season is selected set query params
        if(season !== '') {
            season = `?season=${season}`;
        }
        setIsFetching(true);
        getTopFiveAPI(season).then(data => {
            setTopFivePlayers(data.data.players);
            setTopFiveTeams(data.data.teams);
            setIsFetching(false)
            // console.log(data.data.players)
        });
    }

    //if season changes refetch data
    const handleSeasonChange = (seasonValue) => {
        fetchData(seasonValue);
    }
    
    const handleTabChange = (event, newValue) => {
        setCurrTab(newValue);
    }

    //if click on player or team navigate to profile
    const handleCellClick = (e) => {
        let route = `/players/${e.target.id}`
        
        if(currTab === 1) {
            route = `/teams/${e.target.id}`;
        }

        navigate(route);
    }

  return (
      <Paper className={classes.container}>
          <Typography variant="h5" style={{backgroundColor: 'black', color: 'white', borderBottom: '3px solid #F74902', padding: '5px'}}>Fight<Typography variant="h5" display='inline' style={{color: '#F74902', fontWeight: 'bolder'}}>Leaders</Typography></Typography>
          <Tabs 
            className={classes.tabs} 
            value={currTab} 
            onChange={handleTabChange} 
            TabIndicatorProps={{style: {backgroundColor: '#F74902'}}}
          >
              <Tab label='Players' />
              <Tab label='Teams' />
          </Tabs>
          <SeasonSelect seasonSelect={handleSeasonChange} />
        <TableContainer component={Paper}>
            <Table aria-label="Top5 table">
                <TableHead>
                <TableRow>
                    <TableCell>{currTab === 0 ? 'Player' : 'Team'}</TableCell>
                    <TableCell align="right">Total Fights</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {(!isFetching && currTab === 0) && topFivePlayers.map((row) => (
                    <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={handleCellClick}
                    className={classes.tableRow}
                    >
                    <TableCell id={row._id} component="th" scope="row">
                        {row.firstName} {row.lastName}
                    </TableCell>
                    <TableCell align="right">{row.numberOfFights}</TableCell>
                    </TableRow>
                ))}
                {(!isFetching && currTab === 1) && topFiveTeams.map((row) => (
                    <TableRow
                    key={row._id.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={handleCellClick}
                    className={classes.tableRow}
                    >
                    <TableCell id={row._id} component="th" scope="row">
                        {row.city} {row.name}
                    </TableCell>
                    <TableCell align="right">{row.numberOfFights}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
      </Paper>
  );
};

export default TopFive;
