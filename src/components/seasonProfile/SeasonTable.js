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
    id: 'season',
    label: 'Season', 
    minWidth: 120,
    format: (season) => `${season.season}`
  },
  { 
    id: 'teams', 
    label: 'Teams', 
    minWidth: 170,
    format: (teams) => {
      return (<><Link style={{cursor: 'pointer'}} to={`/teams/${teams[0].id}`}>{teams[0].city}</Link> Vs <Link style={{cursor: 'pointer'}} to={`/teams/${teams[1].id}`}>{teams[1].city}</Link></>)
    } 
  },
  {
    id: 'gameType',
    label: 'Game Type',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'fights',
    label: 'No. of Events',
    minWidth: 80,
    align: 'right',
    format: (fights) => fights ? fights.length : 0
  },
  {
    id: '_id',
    label: '',
    minWidth: 100,
    align: 'right',
    format: (id) => {
      return (
        <>
          <Link style={{cursor: 'pointer'}} to={`/games/${id}`}>View Game</Link>
        </>
      )
    }
  },
];

const SeasonTable = ({ seasonData, pageChange, totalDocuments, currPage }) => {

  const [page, setPage] = useState(currPage - 1);
  // const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChange(newPage + 1);
  }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

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
            {seasonData
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
        rowsPerPageOptions={[]}
        component="div"
        count={totalDocuments}
        rowsPerPage={50}
        page={currPage === 1 ? 0 : page}
        onPageChange={handleChangePage}
        // onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default SeasonTable;