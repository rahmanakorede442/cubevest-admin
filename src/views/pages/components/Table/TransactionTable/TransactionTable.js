import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { numberFormat} from '../../../../../redux/config/config';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress
} from '@material-ui/core';
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

const TransactionTable = props => {
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
                  <TableCell>Amount</TableCell>
                  <TableCell>Paystack ID</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transcation Type</TableCell>
                  <TableCell>Transcation Category</TableCell>
                  <TableCell>Date</TableCell>
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
                    <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                    <TableCell>{numberFormat(user.amount)}</TableCell>
                    <TableCell>{user.paystack_id}</TableCell>
                    <TableCell>{user.payment_method}</TableCell>
                    <TableCell>{user.transaction_type}</TableCell>
                    <TableCell className="px-0 capitalize" align="left">
                    {user.transaction_category == 1 ? "Regular Savings": 
                      (user.transaction_category == 2) ? "Target Savings":
                      (user.transaction_category == 3) ? "Save To Loan":
                      (user.transaction_category == 4) ? "Loan":
                      (user.transaction_category == 5) ? "Market Investment":
                      (user.transaction_category == 6) ? "Halal Financing":
                      (user.transaction_category == 11) ? "Infinito Savings":
                      (user.transaction_category == 7) ? 
                      (user.transaction_type == "credit")?"Wallet Funding":" Wallet Withdrawal": ""}
                    </TableCell>
                    <TableCell>
                      {moment(user.entry_date).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                )):
                <TableRow>
					<TableCell style={{textAlign:"center"}}>
						No Record Found
					</TableCell>                
                </TableRow>}
              </TableBody>}
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
	  <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    </Card>
  );
};

TransactionTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default TransactionTable;
