import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFights as getAllFightsAPI } from "../../api/fights/fightApi";

const LeagueFightRow = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {

    }, []);

    const fetchData = (season) => {
        getAllFightsAPI(`season=${season}&league=NHL`).then(response => {
            console.log(response);
        })
    }

    return (
    <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                    setOpen(!open)
                    // console.log(row)
                }}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon onClick={() => fetchData(row)} />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row}
            </TableCell>
            {/* <TableCell align="right">{actionRating === 0 ? 'No Votes' : actionRating.toFixed(2)}</TableCell> */}
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
                        <TableCell align='center'>Game</TableCell>
                        <TableCell align="center">Players</TableCell>
                        <TableCell align="center">Event</TableCell>
                        <TableCell align="center">Action</TableCell>
                        <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
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
                            <TableCell align="right"><Link to={`/games/${fight.game}`} >{fight.teams[0].city}-{fight.teams[1].city}</Link></TableCell>
                            <TableCell align="right">
                                {fight.players.length > 0 &&
                                   <> <Link to={`/players/${fight.players[0].id}`}>{`${fight.players[0].lastName}`}</Link> VS <Link to={`/players/${fight.players[1].id}`}>{`${fight.players[1].lastName}`}</Link></>
                                }                                
                            </TableCell>
                            <TableCell align="right">{fight.fightType}</TableCell>
                            <TableCell align="right">{fight.actionRating.average === 0 ? `` : fight.actionRating.average}</TableCell>
                            <TableCell align="right"><Link to={`/fights/${fight._id}`}>{fight.players.length > 0 ? 'View Fight' : 'View Event'}</Link></TableCell> 
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

export default LeagueFightRow;
