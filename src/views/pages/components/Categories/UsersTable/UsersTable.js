import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import { getConfig} from '../../../../../redux/config/config'
import { authHeader, history } from '../../../../../redux/logic';

import {
  Card,
  CardContent,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Divider,
  Dialog,
  Grid,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress
} from '@material-ui/core';
import Paginate from '../../Users/UsersTable/paginate';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  bash:{
    width: 1020
  },
  formLabel: {
    alignItems: 'center',
    paddingLeft:10,
    paddingTop:15
  },
  formLabels: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
    alignItems: 'right'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, loading, users, ...rest} = props;
  const {savings} = props;
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name,setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();

const handleOpen = (id) => {
    setIsLoading(true)
    setOpen(true);
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('showSingleCategory') + id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    // console.log(data)
    setDetails(data[0])
    setIsLoading(false)
    setName(data[0].category_name)
    })
    .catch(error => {
    if (error === "Unauthorized") {
        history.push('/login');
        }
        setIsLoading(false)
    console.error('There was an error!', error);
  });
};

// const handleDelete = (id) => {
//   // alert(id)
//   props.admindeleteCategory(id);
//   // this.setState({exit:"Loading..."})
// }
const handleDelete = (id) => {
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    props.admindeleteCategory(id);
    swal("Loading...",{   
      buttons:false
    });
  }
});
}
  
const handleSubmitEdit = (event) => {
  event.preventDefault();
  if (details.category_name) {
    props.submit(details);
  }
}

const handleClose = () => {
  setOpen(false);
};

const handleChangeEdit = (e) => {
   e.persist();
   setDetails(details=>({ ...details, [e.target.name]:e.target.value}))
 }

  return (
    <Card className={clsx(classes.root, className)}>

       {/* Modal */}
       < Dialog
        open={open}
        // TransitionComponent={Transition}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Category</DialogTitle>  
        <Divider />     
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description" > */}
          <CardContent className={classes.content}>
          {isLoading? <Typography>Loading...</Typography>:
          <form autoComplete="off" noValidate  
          onSubmit={handleSubmitEdit} 
          >
              <Grid>
                <Typography>
                    Category Name
                </Typography>
              </Grid>
              <Grid>
                <TextField
                fullWidth
                // label="Category Name"
                placeholder="Category Name"
                margin="dense"
                name="category_name"
                onChange={handleChangeEdit}
                required
                value={details.category_name}
                variant="outlined"
              />
            </Grid>  
            
              <Grid item md={10} xs={10}>
                {savings &&
                    <div className="loader">   
                        <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    </div>
                }
              <Button color="primary" onClick={handleSubmitEdit} variant="contained" >
                Update 
              </Button>
            {/* </Grid> */}
            {/* <Grid> */}
              <Button onClick={handleClose} variant="contained" 
              style={{marginLeft:10, color:'white', backgroundColor:'red'}}>
               Cancel
          </Button>
          </Grid>
        {/* </DialogActions> */}

          </form>}
            </CardContent>        
            <Divider /> 
          <DialogActions> 
          </DialogActions>      
          {/* </DialogContentText> */}        
        </DialogContent>
      </Dialog>
      
      {/* Modal */}

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Entry Date</TableCell>
                  <TableCell>Entered By</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {loading?<CircularProgress />: 
              <TableBody>
                {users.length != 0 ?
                users.map(user => (
                 <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                    selected={selectedUsers.indexOf(user.id) !== -1}
                  >
                    <TableCell>{user.category_name}</TableCell>
                    <TableCell>
                      {moment(user.created_at).format('DD/MM/YYYY')}
                    </TableCell>                    
                    <TableCell>{user.enter_by}</TableCell>
                    <TableCell>
                      <Grid style={{display:'flex'}}>
                        <Button color="primary" variant="contained" 
                        onClick={()=> handleOpen(user.id)}
                        > Edit</Button>
                          <Button color="denger" style={{marginLeft:10, background:'red', color:'#fff'}} variant="contained" 
                          onClick={()=> handleDelete(user.id)}
                          > Delete</Button>
                        </Grid>
                      
                    </TableCell>
                  </TableRow>
                )):
                <TableRow>
                <TableCell style={{textAlign:"center"}}>
                    No Record Found
                </TableCell>                
                </TableRow>
                }
              </TableBody>
            }
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    </Card>
  );
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}

const actionCreators = {
  logout: adminActions.logout,
  adminUpdateMarketCategory: adminActions.adminUpdateMarketCategory,
  admindeleteCategory: adminActions.admindeleteCategory,
};
// export default UsersTable;

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,actionCreators)(UsersTable))
);