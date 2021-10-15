import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CircularProgress,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  Button,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import {Link} from 'react-router-dom';

import { getInitials } from 'helpers';
import { numberFormat } from 'redux/config/config';

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
  actions: {
    justifyContent: 'flex-end'
  }    
}));

const UsersWithdTable = props => {
  
  const { className, total, loading, users, ...rest } = props;
  // console.log(total)
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
                  <TableCell>Amount</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Requested Date</TableCell>
                  <TableCell>Approved By</TableCell>
                  <TableCell>Disbursed Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {loading?<TableRow><TableCell><CircularProgress /></TableCell></TableRow>: 
              users.length != 0 ?
               users.map((user, index) => (
                 <TableRow
                    className={classes.tableRow}
                    hover
                    key={index}
                  >
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.profile_pic}
                        >
                          {getInitials(user.last_name)}
                        </Avatar>
                        <Typography variant="body1">{user.last_name + " " + user.first_name }</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{numberFormat(user.amount)}</TableCell>
                    <TableCell>{user.bank_name}</TableCell>
                    <TableCell>{user.account_no}</TableCell>
                    <TableCell>{user.account_name}</TableCell>
                    <TableCell>
                      {moment(user.request_date).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{user.approved_by}</TableCell>
                    <TableCell>
                      {moment(user.transfered_date).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                )):
                <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell style={{textAlign:"center"}}>
                    No Record Found
                  </TableCell>                
                </TableRow>
                }
                <TableCell style={{fontSize:16, fontWeight:'bold', paddingLeft:20}}>Total Amount:</TableCell>
                <TableCell style={{fontSize:18, fontWeight:'bold'}}>{numberFormat(total)}</TableCell>
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/> */}
    </Card>
  );
};

UsersWithdTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersWithdTable;
