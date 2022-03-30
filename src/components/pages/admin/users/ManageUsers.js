import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
// api
import { 
  getAllUsers as getAllUsersAPI,
  setUserRole as setUserRoleAPI,
  deleteUser as deleteUserAPI
 } from "../../../../api/admin/adminApi";

const useStyles = makeStyles((theme) => ({
  manageUsersTitle: {
    marginTop: '20px'
  }
}));

const ManageUsers = () => {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getAllUsersAPI().then(response => {
      console.log(response);
      setUserData(response.data);
    })
  }, []);

  const updateUserRole = (userId, reqBody) => {
    // console.log(reqBody);
    return new Promise((resolve, reject) => {
      setUserRoleAPI(userId, reqBody).then(response => {
        resolve(response);
        if(response.success){
          let index = userData.findIndex(user => user._id === response.data._id);
          let newData = [...userData];
          newData.splice(index, 1, response.data);
          setUserData(newData);
        }
      });
    });
  }

  const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      deleteUserAPI(userId).then(response => {
        resolve(response);
        if(response.success){
          let index = userData.findIndex(user => user._id === userId);
          let newData = [...userData];
          newData.splice(index, 1);
          setUserData(newData);
        }
      })
    });
  }

  const handlePageChange = () => {
    
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.manageUsersTitle} variant='h4'>
            Manage Users
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <UsersTable userData={userData} updateUserRole={updateUserRole} deleteUser={deleteUser} pageChange={handlePageChange} totalDocuments={userData.length} currPage={1} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ManageUsers;