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
import Paginate from './paginate';
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

const UsersTable = props => {
  
  const { className, loading, total, users, ...rest } = props;
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
                  <TableCell>Package Name</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transaction Type</TableCell>
                  <TableCell>Entry Date</TableCell>
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
                    <TableCell>{user.package_name}</TableCell>
                    <TableCell>{user.payment_method}</TableCell>
                    <TableCell>{user.transaction_type}</TableCell>
                    <TableCell>
                      {moment(user.entry_date).format('DD/MM/YYYY')}
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
