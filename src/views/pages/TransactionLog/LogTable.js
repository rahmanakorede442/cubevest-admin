import React, { useState } from 'react';
import clsx from 'clsx';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import moment from 'moment';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  CardHeader,
  Divider,
  DialogContent,
  DialogTitle,
  Dialog,
  Typography,
} from '@material-ui/core';
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
    justifyContent: 'flex-end'
  }
}));

const LogTable = props => {
  const { className, loading, logs,  investments, banks, status, ...rest} = props;
  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false)
  const [singleLog, setSingleLog] = useState({})

  const handleSelectAll = event => {
    const { logs } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = logs.map(log => log.id);
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

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
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

  const handleView = (id) =>{
    const data = logs.find(log=>(log.id === id))
    setSingleLog(data)
    setOpen(true)
  }

  const handleClose = () =>{
    setOpen(false)
  }
  
 return (
  <Card className={clsx(classes.root, className)}>
    <CardContent className={classes.content}>
      <CardHeader title="Transaction Log Table"/>
      <PerfectScrollbar>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Account Name </TableCell>
                <TableCell>Bank Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
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
            logs.length !== 0 ?
            logs.map((log, index) => (
              <TableRow
                className={classes.tableRow}
                hover
                key={log.id}
                selected={selectedUsers.indexOf(log.id) !== -1}
              >
                 <TableCell>{index+1 }</TableCell>
                 <TableCell>{log.account_name}</TableCell>
                 <TableCell>{log.bank }</TableCell>
                 <TableCell>{log.status }</TableCell>
                 <TableCell>{moment(log.created_at).format('DD/MM/YYYY')}</TableCell>
                 <TableCell><Button variant="contained" color="primary" onClick={()=>handleView(log.id)}>View</Button></TableCell>
              </TableRow>
            )):
            <TableRow>
              <TableCell style={{textAlign:"center"}} colSpan={6} >
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
    {/* Modal */}
    < Dialog
        open={open}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Trasanction Log Details</DialogTitle>  
        <Divider />     
        <DialogContent>
          <CardContent className="content">
            <Typography variant="h5">Name: {singleLog.first_name+ " " +singleLog.last_name}</Typography> <br />
            <Typography variant="h5">Email: {singleLog.email}</Typography> <br />
            <Typography variant="h5">Reference Number: {singleLog.reference}</Typography> <br />
            <Typography variant="h5">Account Name: {singleLog.account_name}</Typography> <br />
            <Typography variant="h5">Bank Name: {singleLog.bank}</Typography> <br />
            <Typography variant="h5">Card Type: {singleLog.card_type}</Typography> <br />
            <Typography variant="h5">Message Response: {singleLog.gateway_response}</Typography> <br />
            <Typography variant="h5">Phone: {singleLog.phone}</Typography>
          </CardContent>
        </DialogContent>
      </Dialog>
    {/* Modal */}
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