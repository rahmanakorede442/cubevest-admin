import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getConfig, numberFormat, checkToken } from '../../../../../redux/config/config';
import { makeStyles } from '@material-ui/styles';
// import TextField from '@material-ui/core/TextField';

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
  Dialog,
  Grid,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide,
  CircularProgress,
  Chip
} from '@material-ui/core';
import {Link} from 'react-router-dom';

import { getInitials } from 'helpers';
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
  const { className, loading, users, ...rest } = props;
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Total Balance</TableCell>
                  <TableCell colSpan="5" style={{textAlign:"center"}}>Auto Save</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  {props.link =="target_details"&& <TableCell>Status</TableCell>}
                  <TableCell>Frequency</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {loading?
              <TableRow><TableCell><CircularProgress /></TableCell></TableRow>: 
              users.length != 0 ?
              users.map(user => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={user.id}>
                  <TableCell>
                    <div className={classes.nameContainer}>
                      <Avatar
                        className={classes.avatar}
                        src={user.profile_pic}
                      >
                        {getInitials(user.first_name)}
                      </Avatar>
                      <Typography variant="body1">{user.first_name}{' '}{user.last_name}</Typography>
                    </div>
                  </TableCell>
                  <TableCell>{props.link ==="savetoloan_details"?numberFormat(user.balance+user.balance1):numberFormat(user.balance)}</TableCell>
                  {props.link =="target_details"&& <TableCell>
                    <Chip label={user.status === 0 ?"Closed":"Active"} style={{background:user.status === 0 ? "red":"green", color:"white"}}/>
                  </TableCell>}
                  <TableCell>{user.frequency}</TableCell>
                  <TableCell>{numberFormat(user.amount)}</TableCell>
                  <TableCell>{user.payment_method}</TableCell>
                  <TableCell>{moment(user.created_at).format('DD/MM/YYYY')} </TableCell>
                  <TableCell>{user.transaction_time}</TableCell>
                  <TableCell>
                    <Link to ={props.link =="target_details"?`/${props.link}/${user.id}/${user.user_id}/${user.target_name}`:`/${props.link}/${user.user_id}`}>
                      <Button color="primary" variant="contained" > Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )):
              <TableRow>
                <TableCell colSpan="8" style={{textAlign:"center"}}>
                  No Record Found
                </TableCell>                
              </TableRow>}
            </TableBody>
           </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
