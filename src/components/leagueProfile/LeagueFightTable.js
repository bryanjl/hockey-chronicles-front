import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const columns = [
  { 
    id: 'date',
    label: 'Date', 
    minWidth: 150,
    format: (date) => new Date(date).toDateString()   
  },
  { 
    id: 'league',
    label: 'League', 
    minWidth: 80,
    format: (league) => `${league.name}`
  },
  { 
    id: 'players', 
    label: 'Players', 
    minWidth: 170,
    format: (players) => {
        if(players.length === 0){
            return ``;
        }
      return (<><Link style={{cursor: 'pointer'}} to={`/players/${players[0].id}`}>{players[0].lastName}</Link> Vs <Link style={{cursor: 'pointer'}} to={`/players/${players[1].id}`}>{players[1].lastName}</Link></>)
    } 
  },
  {
    id: 'fightType',
    label: 'Fight Type',
    minWidth: 150,
    align: 'right',
  },
//   {
//     id: 'fights',
//     label: 'No. of Events',
//     minWidth: 170,
//     align: 'right',
//     format: (fights) => fights ? fights.length : 0
//   },
  {
    id: '_id',
    label: '',
    minWidth: 100,
    align: 'right',
    format: (id) => {
      return (
        <>
          <Link style={{cursor: 'pointer'}} to={`/fights/${id}`}>View Fight</Link>
        </>
      )
    }
  },
];

const LeagueFightTable = ({ seasonData }) => {

    

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px' }}>
      <TableContainer sx={{ maxHeight: '90vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {seasonData.length > 0 &&
            
            seasonData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={seasonData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default LeagueFightTable;