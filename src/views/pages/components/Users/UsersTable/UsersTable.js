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
                  <TableCell>Member ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Location</TableCell> */}
                  <TableCell>Phone</TableCell>
                  <TableCell>Port No</TableCell>
                  <TableCell>Reg date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {loading?<TableRow><TableCell><CircularProgress /></TableCell></TableRow>: 
              users.length != 0 ?
               users.map(user => (
                 <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.id}
                  >
                    <TableCell>{user.member_id}</TableCell>
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
                    <TableCell>{user.email}</TableCell>
                    {/* <TableCell> {user.address}</TableCell> */}
                    <TableCell>{user.phone_no}</TableCell>
                    <TableCell>{user.port}</TableCell>
                    <TableCell>
                      {moment(user.date_entered).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>{user.user_status==0?<span style={{color:'red',fontWeight:'bold'}}>Unactive</span>:
                                user.user_status==1?<span style={{color:'green',fontWeight:'bold'}}>Active</span>:
                                <span style={{color:'red',fontWeight:'bold'}}>Unactive</span>}                      
                    </TableCell>
                    <TableCell>
                       <Link  to={`/userdetails/${user.id}`}>
                       <Button color="primary" variant="contained"> Details</Button>
                       </Link>
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
