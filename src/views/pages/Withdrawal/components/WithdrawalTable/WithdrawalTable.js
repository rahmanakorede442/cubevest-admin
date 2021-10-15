import React, { useState } from 'react';
import clsx from 'clsx';
import { Link, withRouter } from "react-router-dom";
import { adminActions } from "redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import { numberFormat } from 'redux/config/config'

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle, CardActions, Checkbox, CircularProgress
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import WithdrawalToolbar from '../WithdrawalToolbar';
import Paginate from 'views/pages/components/Users/UsersTable/paginate';

const useStyles = makeStyles(theme => ({
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
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const WithdrawalTable = (props) => {
  const { className, loading, total, data, table, handleChange, ...rest} = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({})
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectAll = event => {
    let selectedUsers;
    if (event.target.checked) {
      selectedUsers = data.map(user => user.id);
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
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithdraw = () =>{
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.makeWithdrawal(selectedUsers);
        swal("Loading...", {buttons: false})
      }
    })
  }

  const handleOpen = (id) => {
    let elementsIndex = data.find(element => element.id == id )
    // console.log(elementsIndex)
    setDetails(elementsIndex)
    setOpen(true);
  };

  return (
    <Card
       
      className={clsx(classes.root, className)}>
      <WithdrawalToolbar handleChange={handleChange}/>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
          <Table>
              <TableHead>
                <TableRow>
                  {table =="pending"&&<TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === data.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < data.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>}
                  <TableCell>ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Account Name</TableCell>
                  {table === "pending" ?
                    <TableCell>Bank Name</TableCell>:
                    <TableCell>Approved By</TableCell>
                    }
                  <TableCell>Requested Date</TableCell>
                  {table === "approved" &&
                    <TableCell>Transfer Date</TableCell>
                  }
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {loading?<CircularProgress />: 
              <TableBody>
                {data.length !== 0 ?
                data.map((user, i) => (
                 <TableRow className={classes.tableRow} hover key={i}>
                    {table == "pending"&&
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell>}
                    <TableCell>{i+1}</TableCell>
                    <TableCell>{user.last_name + " " + user.first_name}</TableCell>
                    <TableCell>{user.amount == 0 || user.amount == null ? 0 : numberFormat(user.amount)}</TableCell> 
                    <TableCell>{user.account_name}</TableCell>
                    {table === "pending" ?
                      <TableCell>{user.bank_name}</TableCell>:
                      <TableCell>{user.approved_by}</TableCell>
                    }
                    <TableCell>{user.request_date}</TableCell>
                    {table === "approved" &&
                      <TableCell>{user.transfered_date}</TableCell>
                    }
                    <TableCell>
                        <Button size="small" variant="contained" color="primary"
                        onClick={ ()=>handleOpen(user.id)}>
                          Details
                        </Button>
                    </TableCell>
                  </TableRow>
                )):
                <TableRow>
                <TableCell colSpan={8} style={{textAlign:"center"}}>
                    No Record Found
                </TableCell>                
                </TableRow>
                }
               {table === "pending" &&
                  <TableCell colSpan={4} style={{fontSize:16, fontWeight:'bold', paddingLeft:20}}>Total Amount:</TableCell>
                }
                {table === "pending" &&
                  <TableCell style={{fontSize:18, fontWeight:'bold'}}>{numberFormat(total)}</TableCell>
                }
              </TableBody>
            }
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
        {table == "pending" && data.length !== 0 &&<Button variant="contained" color="primary" onClick={handleWithdraw}>Make Withdraw</Button>}
      </CardActions>

      {/* Modal Add New start*/}
      <Dialog
          open={open}
          fullWidth={true}
          maxWidth = {'xs'}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle bold id="alert-dialog-slide-title">Withdrawal Details</DialogTitle>  
          <Divider />
        <DialogContent>
          <CardContent className="content">
            <Typography variant="h6">User Name: {details.last_name + " " + details.first_name}</Typography><br/>
            <Typography variant="h6">Bank Name: {details.bank_name}</Typography><br/>
            <Typography variant="h6">Account Name: {details.account_name}</Typography><br/>
            <Typography variant="h6">Account Number: {details.account_no}</Typography><br/>
            <Typography variant="h6">Requested Amount: {numberFormat(details.amount)}</Typography>
            
          </CardContent>
        </DialogContent>
      </Dialog>
      {/* Modal Add New end */}
    </Card>
  );
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}

const actionCreators = {
  logout: adminActions.logout,
  makeWithdrawal: adminActions.makeWithdrawal,
};
export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,actionCreators)(WithdrawalTable))
);