import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import { Link } from "react-router-dom";

const LeagueGameRow = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    const [season, setSeason] = useState('');

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
                {row}
            </TableCell>
            
            </TableRow>
            <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box >
                    <Typography variant="h6" gutterBottom component="div">
                    Games
                    </Typography>
                    <Table  aria-label="games">
                    <TableHead>
                        <TableRow>
                        <TableCell>Date</TableCell>
                        
                        <TableCell align='right'>Teams</TableCell>
                        <TableCell align='right'>No. of Events</TableCell>

                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {row.filter(game => {
                            if(typeof game === 'number') {
                                return false;
                            }
                            return true;
                        }).map((game) => (
                        <TableRow key={game._id }>
                            <TableCell component="th" scope="row">
                                {new Date(game.date.split('T')[0]).toLocaleString().split(',')[0]}
                            </TableCell>
                            
                            <TableCell align="right">
                                <Link to={`/teams/${game.teams[1].id}`}>{`${game.teams[1].city}`}</Link> vs <Link to={`/teams/${game.teams[0].id}`}>{`${game.teams[0].city}`}</Link> 
                            </TableCell>
                            
                            <TableCell align="right">
                                
                                {game.fights.length}
                            </TableCell>
                            
                            <TableCell align="right"><Link to={`/fights/${game._id}`} >View Game</Link></TableCell>
                            
                        </TableRow>
                        ))}
                    </TableBody> */}
                    </Table>
                </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    </>
  )
};

export default LeagueGameRow;
