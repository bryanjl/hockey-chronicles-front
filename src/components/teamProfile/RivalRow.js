import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { Link } from "react-router-dom";

const RivalRow = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    console.log(row);

    //get team the player fought for
    // const getTeam = (fight) => {
    //     let playerInFight = fight.players[0].lastName === player.lastName ? fight.players[0] : fight.players[1];

    //     let fightTeam;
    //     if(playerInFight.teamId){
    //         fightTeam = playerInFight.teamId === fight.teams[0].id ? fight.teams[0] : fight.teams[1]; 
    //     }

    //     if(fightTeam){
    //         return (
    //             <Link to={`/teams/${fightTeam.id}`} >{`${fightTeam.city} ${fightTeam.name}`}</Link>
    //         );
    //     }

    //     return '';        
    // }

    return (
    <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row">
                {`${row[0]}`}
            </TableCell>
            <TableCell align='center' component="th" scope="row">
                {`${row[1].count}`}
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
                        <TableCell align='center'>Opponent</TableCell>
                        <TableCell align="center">League</TableCell>
                        <TableCell align="center">Players</TableCell>
                        {/* <TableCell align='center'>Opponent</TableCell> */}
                        {/* <TableCell align="center">Outcome</TableCell> */}
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {row[1].fights.map((fight) => (
                        <TableRow key={fight._id }>
                            <TableCell component="th" scope="row">
                                <Link to={`/games/${fight.game}`}>
                                    {new Date(fight.date.split('T')[0]).toLocaleString().split(',')[0]}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`/teams/${row[1].id}`} >{row[0]}</Link>
                            </TableCell>
                            <TableCell align='center'><Link to={`/leagues/${fight.league.id}`}>{fight.league.name}</Link></TableCell>
                            <TableCell align='center'>
                                {
                                    fight.players.length !== 0 ? 
                                    <>
                                    <Link to={`/players/${fight.players[0].id}`}>{fight.players[0].lastName}</Link>
                                    <p style={{display: 'inline'}}> VS </p>
                                    <Link to={`/players/${fight.players[1].id}`}>{fight.players[1].lastName}</Link>
                                    </>
                                    :
                                    `${fight.eventDescription}`
                                }
                                
                            </TableCell>
                            {/* <TableCell align="center">
                                {player.lastName === fight.players[0].lastName ? <Link to={`/players/${fight.players[1].id}`} >{`${fight.players[1].firstName} ${fight.players[1].lastName}`}</Link> : <Link to={`/players/${fight.players[0].id}`}>{`${fight.players[0].firstName} ${fight.players[0].lastName}`}</Link>}
                            </TableCell> */}
                            {/* <TableCell align="center">
                                {
                                    outcomeValue(fight.outcome, player._id)
                                }
                            </TableCell> */}
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

export default RivalRow;