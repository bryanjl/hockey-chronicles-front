import { Box, Button, List, ListItem, makeStyles } from '@material-ui/core';
import {Typography} from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    statsTitleTypo: {
        margin: '10px',
        width: '45%',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    statsContainer: {
        display: 'flex',
        flexBasis: '30%',
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },
    listContainer: {
        display: 'flex',
        flexBasis: '30%',
        flexWrap:'wrap',
        justifyContent: 'space-evenly',
        margin: '15px'
    },
    boxContainer: {
        margin: '15px',
        border: '1px solid black',
        borderRadius: '5px',
        width: '40%'
    },
    listItem: {
        margin: 'auto',
        width: '90%',
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const PlayerStats = ({fightCount, highestAction, mostRecent}) => {
  const classes = useStyles();

  const [openMoreStats, setOpenMoreStats] = useState(false);

  const getDays = (createdAt) => {
    let createdAtDate = new Date(createdAt);
    let currDate = new Date();

    let time =  currDate.getTime() - createdAtDate.getTime();

    let days = time / (1000 * 60 * 60 * 24);

    return Math.round(days);
}

    return (
    <>        
        <Typography align='center' variant="h6" style={{backgroundColor: 'black', color: '#F74902', borderBottom: '3px solid #F74902', padding: '5px', paddingLeft: '15px', marginTop: '15px', marginBottom: '10px'}}>Player Stats</Typography>
            
        <div className={classes.statsContainer}>
            <div className={classes.statsTitleTypo}>
                <Typography>Total Fights:</Typography>
                <Typography style={{fontWeight: 'bold', marginRight: '15px'}}>{fightCount.total}</Typography>
            </div>
            <div className={classes.statsTitleTypo}>
                <Typography>Preseason Fights:</Typography>
                <Typography style={{fontWeight: 'bold', marginRight: '15px'}}>{fightCount.preseason}</Typography>
            </div>
            <div className={classes.statsTitleTypo}>
                <Typography>Regular Season Fights:</Typography>
                <Typography style={{fontWeight: 'bold', marginRight: '15px'}}>{fightCount.regular}</Typography>
            </div>
            <div className={classes.statsTitleTypo}>
                <Typography>Playoff Fights:</Typography>
                <Typography style={{fontWeight: 'bold', marginRight: '15px'}}>{fightCount.finals}</Typography>
            </div>
        </div>
        <Button variant='outlined' fullWidth onClick={() => setOpenMoreStats(!openMoreStats)}>See {openMoreStats ? 'Less' : 'More'} Stats</Button>
        {openMoreStats &&
            <div className={classes.listContainer}>
                {/* <Box className={classes.boxContainer}>
                    <Typography align='center'>Top Teams</Typography>
                    <List>
                        <ListItem>1</ListItem>
                    </List>
                </Box>
                <Box className={classes.boxContainer}>
                <Typography align='center'>Top Fighters</Typography>
                    <List>
                        <ListItem>1</ListItem>
                    </List>
                </Box> */}
                <Box className={classes.boxContainer}>
                <Typography align='center'>Highest Action</Typography>
                    <List>
                        {highestAction.length !== 0 &&
                            highestAction.map(fight => {
                                return(
                                    <ListItem divider key={fight._id} className={classes.listItem}>
                                        <Typography>
                                            <Link style={{ textDecoration: 'none' }} to={`/fights/${fight._id}`}>{fight.players[0].lastName} VS {fight.players[1].lastName}</Link>
                                        </Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>
                                            {fight.actionRating.average}
                                        </Typography>   
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </Box>
                <Box className={classes.boxContainer}>
                <Typography align='center'>Most Recently Added Fights</Typography>
                    <List>
                        {mostRecent.length !== 0 &&
                            mostRecent.map(fight => {
                                return(
                                    <ListItem divider className={classes.listItem} key={fight._id}>
                                        <Typography>
                                            <Link style={{ textDecoration: 'none' }} to={`/fights/${fight._id}`}>{fight.players[0].lastName} VS {fight.players[1].lastName}</Link>
                                        </Typography>
                                        <Typography style={{ fontWeight: 'bold' }}>
                                            {getDays(fight.createdAt)}d
                                        </Typography>
                                    </ListItem> 
                                )
                            })
                        }
                    </List>
                </Box>
            </div>
        }
    </>
  )
}

export default PlayerStats;