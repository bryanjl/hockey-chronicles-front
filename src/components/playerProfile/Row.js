import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { Link } from "react-router-dom";

const Row = (props) => {
    const { row, player, outcomeValue } = props;
    const [open, setOpen] = useState(false);
    
    //check if fight.players has a teamId anywhere in the row and belongs to current player
    let teamPlayerExists = false;
    //console.log(row);
    
    row.forEach(fight => {
        if(fight === undefined){
            return;
        }
        if(fight.players[0].teamId){
            if(fight.players[0].lastName === player.lastName){
                //teamId exists to current player
                if(player.teams){
                    teamPlayerExists = true
                }
            }
        }
        if(fight.players[1].teamId){
            if(fight.players[1].lastName === player.lastName){         
                //teamId exists to current player
                if(player.teams){
                    teamPlayerExists = true
                }
            }
        }
    });


    //check if row season exists in player.teams
    let playerSeason = null;
    if(teamPlayerExists){
        let currSeason = row[0].season.season;
        if(player.teams[currSeason]){
            playerSeason = player.teams[currSeason];
        }
    }

    //get the team name to display
    let teamNames = '';
    if(playerSeason !== null) {
        let objKeys = Object.keys(playerSeason);
        objKeys.forEach(key => {
            teamNames += ' - ' + playerSeason[key].name;
        });
    }

    //get team the player fought for
    const getTeam = (fight) => {
        let playerInFight = fight.players[0].lastName === player.lastName ? fight.players[0] : fight.players[1];

        let fightTeam;
        if(playerInFight.teamId){
            fightTeam = playerInFight.teamId === fight.teams[0].id ? fight.teams[0] : fight.teams[1]; 
        }

        if(fightTeam){
            return (
                <Link to={`/teams/${fightTeam.id}`} >{`${fightTeam.city} ${fightTeam.name}`}</Link>
            );
        }

        return '';        
    }

    return (
        
    <>
    
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            
            <TableCell component="th" scope="row">
                {`${row[0].season.season} ${teamNames}`}
            </TableCell>
            
            
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box >
                    <Typography variant="h6" gutterBottom component="div">
                    Fights
                    </Typography>
                    <Table  aria-label="fights">
                    <TableHead>
                        <TableRow>
                        <TableCell align='center'>Date</TableCell>
                        <TableCell align='center'>Game</TableCell>
                        <TableCell align="center">League</TableCell>
                        <TableCell align="center">Team</TableCell>
                        <TableCell align='center'>Opponent</TableCell>
                        <TableCell align="center">Outcome</TableCell>
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row.filter(fight => {
                            if(typeof fight === 'number') {
                                return false;
                            }
                            return true;
                        }).map((fight) => (
                        <TableRow key={fight._id }>
                            <TableCell component="th" scope="row">
                                {new Date(fight.date.split('T')[0]).toLocaleString().split(',')[0]}
                            </TableCell>
                            <TableCell align="center"><Link to={`/games/${fight.game}`} >{fight.teams[0].city}-{fight.teams[1].city}</Link></TableCell>
                            <TableCell align='center'><Link to={`/leagues/${fight.league.id}`}>{fight.league.name}</Link></TableCell>
                            <TableCell align='center'>
                                {
                                    getTeam(fight)
                                }
                            </TableCell>
                            <TableCell align="center">
                                {player.lastName === fight.players[0].lastName ? <Link to={`/players/${fight.players[1].id}`} >{`${fight.players[1].firstName} ${fight.players[1].lastName}`}</Link> : <Link to={`/players/${fight.players[0].id}`}>{`${fight.players[0].firstName} ${fight.players[0].lastName}`}</Link>}
                            </TableCell>
                            <TableCell align="center">
                                {
                                    outcomeValue(fight.outcome, player._id)
                                }
                            </TableCell>
                            <TableCell align="center">{fight.actionRating.average === 0 ? `` : fight.actionRating.average}</TableCell>
                            <TableCell align="right"><Link to={`/fights/${fight._id}`} >View Fight</Link></TableCell>
                            
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
        </TableRow>

    </>
                            
  )
};

export default Row;
