// import { Link } from 'react-router-dom';
// import { MenuItem, Select } from '@material-ui/core';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        padding: '15px',
        minWidth: '500px'
    }
}));

const UsersTable = ({ userData, updateUserRole, deleteUser, pageChange, totalDocuments, currPage }) => {

    const columns = [
        { 
          id: 'createdAt',
          label: 'Joined', 
          minWidth: 150,
          format: (date) => new Date(date).toDateString()   
        },
        { 
          id: 'username',
          label: 'Username', 
          minWidth: 80,
        },
        { 
          id: 'email', 
          label: 'E-Mail', 
          minWidth: 170,
        },
        {
          id: 'role',
          label: 'Role',
          minWidth: 150,
          align: 'right',
        },
        {
            id: '_id',
            label: '',
            minWidth: 100,
            align: 'right',
            format: (id) => {
                
                return (
                    <Button
                        onClick={() => {
                            getSelectedUser(id);
                            setOpenDialog(true);
                        }}
                        >Edit</Button>
                )
            }
        }
      ];

      const classes = useStyles();

  const [page, setPage] = useState(currPage - 1);
  const [selectedUser, setSelectedUser] = useState({});
  const [newSelectedUserRole, setNewSelectedUserRole] = useState('')
  const [openDialog, setOpenDialog] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);  
  const [unsuccessUpdate, setUnsuccessUpdate] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    pageChange(newPage + 1);
    // console.log(newPage);
  };

  const getSelectedUser = (id) => {
      userData.forEach(user => {
          if(user._id === id){
              setSelectedUser(user);
              setNewSelectedUserRole(user.role);
          }
      });
  }

  const handleDialogClose = () => {
      setOpenDialog(false);
  }

  const submitUserRoleChange = () => {
      
      if(newSelectedUserRole === selectedUser.role){
          return;
      }

      let reqBody = {
        role: newSelectedUserRole
      } 

      updateUserRole(selectedUser._id, reqBody).then(response => {
        if(response.success){  
            setSuccessUpdate(true);
    
            setTimeout(() => {
                setSelectedUser({});
                setNewSelectedUserRole('');
                handleDialogClose();
                setSuccessUpdate(false);
            }, 2000);
        }
        if(!response.success){
            setUnsuccessUpdate(true);

            setTimeout(() => {
                setUnsuccessUpdate(false);
            }, 2000);
        }
      });
  }

  const submitDeleteUser = () => {
    let confirmed = window.confirm(`Are you sure you want to delete ${selectedUser.username} from the database?`);

    if(confirmed){
        deleteUser(selectedUser._id).then(response => {
            if(response.success){
                setSuccessUpdate(true);

                setTimeout(() => {
                    setSelectedUser({});
                    setNewSelectedUserRole('');
                    handleDialogClose();
                    setSuccessUpdate(false);
                }, 2000);
            }
            if(!response.success){
                setUnsuccessUpdate(true);

                setTimeout(() => {
                    setUnsuccessUpdate(false);
                }, 2000);
            }
        });
    }
  }

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
            {userData.length > 0 &&
            
            userData
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
      />
      <Dialog classes={{paper: classes.dialogContainer}} open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Change User's Role</DialogTitle>
          <DialogContent>
              <Grid container>
                  <Grid item xs={6}>
                      <Typography style={{marginBottom: '5px'}}>Username:</Typography>
                      <Typography>{selectedUser.username}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                      <Typography style={{marginBottom: '5px'}}>Role:</Typography>
                      <Select
                        value={newSelectedUserRole}
                        onChange={(e) => setNewSelectedUserRole(e.target.value)}
                        fullWidth
                      >
                          <MenuItem value='user'>user</MenuItem>
                          <MenuItem value='admin'>admin</MenuItem>
                          <MenuItem value='super'>super</MenuItem>
                      </Select>
                  </Grid>
                    {successUpdate &&
                        <Grid item xs={12}>
                            <Alert severity='success'>User role updated</Alert>
                        </Grid>
                    }
                    {unsuccessUpdate &&
                        <Grid item xs={12}>
                            <Alert severity='error'>Cannot update user - try again later</Alert>
                        </Grid>
                    }
              </Grid>
          </DialogContent>
          <DialogActions>
            <Button
                variant='outlined'
                // color='warning'
                onClick={submitDeleteUser}
                fullWidth
            >
                Delete User
            </Button> 
              
            <Button
                color='secondary'
                variant='contained'
                onClick={submitUserRoleChange}
                fullWidth
            >
                Save Changes
            </Button>                  
            
          </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UsersTable;