import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { numberFormat } from '../../../../../redux/config/config';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress
} from '@material-ui/core';
import {Link} from 'react-router-dom';
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

const WalletBalanceTable = props => {
  const { className, loading, users,  investments, status, ...rest} = props;
  const {savings} = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

 return (
  <Card className={clsx(classes.root, className)}>
    <CardContent className={classes.content}>
      <PerfectScrollbar>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Balance</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {loading?
              <TableRow>
                <TableCell>
					<CircularProgress />
                </TableCell>
              </TableRow>: 
              users.length != 0 ?
              users.map(user => (
              <TableRow
                className={classes.tableRow}
                hover
                key={user.id}
                selected={selectedUsers.indexOf(user.id) !== -1}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                <TableCell>{numberFormat(user.balance)}</TableCell>
                <TableCell>
                  <Link to ={`/walletBalanceDetails/${user.user_id}`}>
                    <Button color="primary" variant="contained" > Details</Button>
                  </Link>
                </TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan={5} >
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


export default WalletBalanceTable;