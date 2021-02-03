import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { numberFormat } from '../../../../../redux/config/config';
import {
  Card,
  CardContent,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
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

const WalletHistoryTable = props => {
  const { className, loading, users,  investments, status, ...rest} = props;
  const {savings} = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);

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
                <TableCell>Amount</TableCell>
                <TableCell>Wallet Type</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Paystack ID</TableCell>
                <TableCell>Entry Date</TableCell>
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
                <TableCell>{numberFormat(user.amount)}</TableCell>
                <TableCell>{user.wallet_type}</TableCell>
                <TableCell>{user.payment_method}</TableCell>
                <TableCell>{user.paystack_id}</TableCell>
                <TableCell>{moment(user.entry_date).format('DD/MM/YYYY')}</TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell colSpan={8} >
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


export default WalletHistoryTable;