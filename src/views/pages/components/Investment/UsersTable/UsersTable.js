import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  CircularProgress
} from '@material-ui/core';

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
                  <TableCell>Investment Image</TableCell>
                  <TableCell>Investor Name</TableCell>
                  <TableCell>Current Values</TableCell>
                  <TableCell>Expected Returns</TableCell>
                  <TableCell>Insurance Partner</TableCell>
                  <TableCell>Maturity Date</TableCell>
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
                >
                  <TableCell>
                    <div className={classes.nameContainer}>
                      <Avatar
                        className={classes.avatar}
                        src={user.investment_pic}
                      >
                        {getInitials(user.first_name)}
                      </Avatar>
                    </div>
                  </TableCell>
                  <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                  <TableCell>{user.current_values} </TableCell>
                  <TableCell>{user.expected_returns} </TableCell>
                  <TableCell>{user.insurance_partner}</TableCell>
                  <TableCell>
                    {moment(user.maturity_date).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
                )):
                <TableRow>
                  <TableCell colSpan="6" style={{textAlign:"center"}}>
                    No Record Found
                  </TableCell>                
                </TableRow>}
              </TableBody>
              }
            </Table>
          </div>
        </PerfectScrollbar>
        <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
      </CardContent>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
