import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { Link } from "react-router-dom";

const Row = (props) => {
    const { row, player, outcomeValue } = props;
    const [open, setOpen] = useState(false);

    let actionRating = row[row.length-1];

    return (
    <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row[0].season.season}
            </TableCell>
            <TableCell align="right">{actionRating === 0 ? 'No Votes' : actionRating.toFixed(2)}</TableCell>
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
                        <TableCell>Date</TableCell>
                        <TableCell>League</TableCell>
                        <TableCell align='right'>Game</TableCell>
                        <TableCell align="right">Opponent</TableCell>
                        <TableCell align="right">Outcome</TableCell>
                        <TableCell align="right">Action</TableCell>
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
                            <TableCell align='right'><Link to={`/leagues/${fight.league.id}`}>{fight.league.league}</Link></TableCell>
                            <TableCell align="right"><Link to={`/games/${fight.game}`} >{fight.teams[0].city}-{fight.teams[1].city}</Link></TableCell>
                            <TableCell align="right">
                                {player.lastName === fight.players[0].lastName ? <Link to={`/players/${fight.players[1].id}`} >{`${fight.players[1].firstName} ${fight.players[1].lastName}`}</Link> : <Link to={fight.players[0].id}>{`${fight.players[0].firstName} ${fight.players[0].lastName}`}</Link>}
                            </TableCell>
                            <TableCell align="right">
                                {
                                    outcomeValue(fight.outcome, player._id)
                                }
                            </TableCell>
                            <TableCell align="right">{fight.actionRating.average === 0 ? `` : fight.actionRating.average}</TableCell>
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
