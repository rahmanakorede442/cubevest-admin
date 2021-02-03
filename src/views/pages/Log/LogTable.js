import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import { getConfig, numberFormat, checkToken } from '../../../redux/config/config';
import { authHeader, history } from '../../../redux/logic';
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
import { single } from 'validate.js';
import Paginate from '../components/Users/UsersTable/paginate';

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
    justifyContent: 'space-between'
  }
}));

const LogTable = props => {
  const { className, loading, users,  investments, banks, status, ...rest} = props;
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  const handleSubmit = () =>{
    swal({
      title: "Are you sure you want to delete this log?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        props.deleteActivities(selectedUsers)
        swal("Loading...",{   
          buttons:false
        });
      }
    });
  }

 return (
  <Card className={clsx(classes.root, className)}>
    <CardContent className={classes.content}>
      <PerfectScrollbar>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell> Created Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {loading?
			<TableRow>
				<TableCell>
					<CircularProgress />
				</TableCell>
			</TableRow>: 
            users.length !== 0 ?
            users.map(user => (
              <TableRow
                className={classes.tableRow}
                hover
                key={user.id}
                selected={selectedUsers.indexOf(user.id) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.indexOf(user.id) !== -1}
                    color="primary"
                    onChange={event => handleSelectOne(event, user.id)}
                    value="true"
                  />
                </TableCell>
				<TableCell>{user.first_name + " " + user.last_name}</TableCell>
				<TableCell>{user.description}</TableCell>
                <TableCell>{user.created_at}</TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell style={{textAlign:"center"}} colSpan={4} >
                No Record Found
              </TableCell> 
            </TableRow>}
          </TableBody>
         </Table>
        </div>
      </PerfectScrollbar>
    </CardContent>
    <CardActions className={classes.actions}>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Delete</Button>
        {props.savings && <CircularProgress />}
	  <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    </CardActions>
  </Card>
);
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}

const actionCreators = {
  deleteActivities: adminActions.deleteActivities,
};
// export default UsersTable;

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,actionCreators)(LogTable))
);