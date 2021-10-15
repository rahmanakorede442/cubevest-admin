import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import { getConfig, numberFormat, checkToken } from '../../../../../redux/config/config';
import { authHeader, history } from '../../../../../redux/logic';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  Divider,
  Dialog,
  Grid,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Slide,
  CircularProgress
} from '@material-ui/core';
import {Link} from 'react-router-dom';

import { getInitials } from 'helpers';
import Paginate from 'views/pages/components/Users/UsersTable/paginate';

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
  const { className, loading, users,  investments, status, ...rest} = props;
  const {savings} = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(10);
  const [pages, setPages] = useState(0);

  const handleSelectAll = event => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };


  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
      console.log("index is 0")
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
      console.log("index is - user length -1")
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleModalPageChange = (event, pages) => {
    setPages(pages);
  };

  const handleModalRowsPerPageChange = event => {
    setRowsPerPages(event.target.value);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
 });

const [open, setOpen] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [details, setDetails] = useState([]);

const handleOpen = (id) => {
  setIsLoading(true)
  // console.log(id)
  setOpen(true);
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getAllGuarantor') + id + `?token=`+user.token, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  // console.log(data)
  if(data.success == false){
    setDetails([])
  }else{
    setDetails(data)
  }
  setIsLoading(false)
  })
  .catch(error => {
  if (error === "Unauthorized") {
      history.push('/login');
      }
      setIsLoading(false)
      console.error('There was an error!', error);
  });
};

  const handleClose = () => {
    setOpen(false);
  };

  const handleDisburst = () =>{
    if(selectedUsers.length != 0){
      props.adminApproveLoans(selectedUsers)
    }
    
  }
 return (
  <Card
     
    className={clsx(classes.root, className)}
  >
      {/* Modal */}
      < Dialog
        open={open}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Guarantors</DialogTitle>  
        <Divider />     
        <DialogContent>
          {isLoading? <Typography>Loading...</Typography>:
          <List>
            {details.map((det, i) =>( 
            <ListItem
              divider={i < details.length - 1}
              key={det.id}
            >
              <ListItemText
                primary={`Guarantors Name: ${det.first_name + " " + det.last_name}`}
                secondary={`Guaranteed Amount: ${det.guaranteed_amount}`}
              />
            </ListItem>
            ))}
           </List>}
          
            <Grid container>
              <Grid item md={10} xs={10} style={{ marginTop: '1rem' }}>
                <Button onClick={handleClose} variant="contained" 
                  style={{marginLeft:10, color:'white', backgroundColor:'red'}}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
        </DialogContent>
      </Dialog>
      {/* Modal */}

    <CardContent className={classes.content}>
      <PerfectScrollbar>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                {status && <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>}
                <TableCell>Name</TableCell>
                <TableCell>Group Name</TableCell>
                <TableCell>Loan Amount</TableCell>
                <TableCell>Repayment Amount</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
            {loading?<CircularProgress />: 
            users.length != 0 ?
            users.map(user => (
              <TableRow
                className={classes.tableRow}
                hover
                key={user.id}
                selected={selectedUsers.indexOf(user.id) !== -1}
              >
                {status && <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.indexOf(user.id) !== -1}
                    color="primary"
                    onChange={event => handleSelectOne(event, user.id)}
                    value="true"
                  />
                </TableCell>}
                 <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                 <TableCell>{user.group_name}</TableCell>
                <TableCell>{numberFormat(user.loan_amount)}</TableCell>
                <TableCell>{numberFormat(user.repayment_amount)}</TableCell>
                <TableCell>{user.frequency}</TableCell>
                <TableCell>{moment(user.start_date).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <Grid style={{display:'flex'}}>
                      <Button color="primary" variant="contained" 
                      onClick={()=> handleOpen(user.loan_group)}
                      > View Guarantor</Button>
                      </Grid>
                  </TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan={8} style={{textAlign:"center"}}>
                No Record Found
              </TableCell> 
            </TableRow>
            }
          </TableBody>
         </Table>
        </div>
      </PerfectScrollbar>
    </CardContent>
    <CardActions className={classes.actions}>
      <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
      {props.savings && <CircularProgress />}
      {status && users.length != 0 &&<Button variant="contained" color="primary" onClick={handleDisburst} >Disburse</Button>}
    </CardActions>
  </Card>
);
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}

const actionCreators = {
  logout: adminActions.logout,
  modifyTargetCommission: adminActions.modifyTargetCommission,
  adminApproveLoans: adminActions.adminApproveLoans,
  deleteTargetCommission: adminActions.deleteTargetCommission,
};
// export default UsersTable;

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,actionCreators)(UsersTable))
);