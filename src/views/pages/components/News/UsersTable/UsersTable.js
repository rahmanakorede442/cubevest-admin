import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import { getConfig, checkToken, numberFormat } from '../../../../../redux/config/config'
import { authHeader, history } from '../../../../../redux/logic';

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
  Slide,
  CircularProgress
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
  const { className, loading, users,  investments, ...rest} = props;
  const {savings} = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rowsPerPages, setRowsPerPages] = useState(10);
  const [pages, setPages] = useState(0);

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

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };
  const handleModalPageChange = (event, pages) => {
    setPages(pages);
  };

  const handleModalRowsPerPageChange = event => {
    setRowsPerPages(event.target.value);
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
 });
 const [name,setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState();
  const handleOpen = (id) => {
    setIsLoading(true)
    setOpen(true);
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('showSingleMarketNews') + id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    // console.log(data)
    setDetails(data[0])
    setIsLoading(false)
    setName(data[0].market_investment && data[1].news)
    })
    .catch(error => {
    if (error === "Unauthorized") {
        history.push('/login');
        }
        setIsLoading(false)
    console.error('There was an error!', error);
  });
};

const handleDelete = (id) => {
swal({
  title: "Are you sure?",
  text: "Once deleted, you will not be able to recover this file!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    props.admindeleteMarketNews(id);
    swal("Loading...",{   
      buttons:false
    });
  }
});
}
  
const handleSubmitEdit = (event) => {
  event.preventDefault();
  if (details.market_investment, details.news) {
    // console.log(details)
    props.adminUpdateMarketNews(details);
    }
}

  const handleClose = () => {
    setOpen(false);
  };
 const handleChangeEdit = (e) => {
  e.persist();
   setDetails(details=>({ ...details, [e.target.name]:e.target.value}))
 }

  return (
    <Card className={clsx(classes.root, className)}>
      {/* Modal */}
      < Dialog
        open={open}
        // TransitionComponent={Transition}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">News</DialogTitle>  
        <Divider />     
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description" > */}
          <CardContent className={classes.content}>
          {isLoading? <Typography>Loading...</Typography>:
          <form autoComplete="off" noValidate  
          onSubmit={handleSubmitEdit} 
          >
              <Grid>
                <Typography>
                </Typography>
              </Grid>
              <Grid>
                    <label>Select Investment Name</label>
                    <TextField
                      fullWidth
                      select
                      name="market_investment"                       
                      variant="outlined"
                      value={details.market_investment}
                      onChange={handleChangeEdit}
                      SelectProps={{
                        native: true,
                      }}
                      helperText="Please select Investment Name"
                    >
                      {investments.map((option) => (
                        <option key={option.id} 
                        value={option.investment_type}
                        >
                          {option.investment_type}
                        </option>
                      ))}
                    </TextField>
                  </Grid><br/>
                  <Grid>
                    <label>Market New</label>
                    <TextField
                      fullWidth
                      placeholder="Market New"
                      name="news"
                      multiline 
                      margin="dense"
                      rows={4}
                      value={details.news} 
                      onChange={handleChangeEdit}
                      variant="outlined"
                    />
                  </Grid>
              <Grid item md={10} xs={10}>
                {savings && <CircularProgress />}
                <Button color="primary" onClick={handleSubmitEdit} variant="contained" >
                  Update 
                </Button>
                <Button onClick={handleClose} variant="contained" 
                style={{marginLeft:10, color:'white', backgroundColor:'red'}}>
                Cancel
                </Button>
              </Grid>
              </form>}
            </CardContent>      
        </DialogContent>
      </Dialog>
      {/* Modal */}

      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Investment Type</TableCell>
                  <TableCell>News</TableCell>
                  <TableCell>Posted Date</TableCell>
                  <TableCell>Action</TableCell>
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
                    <TableCell>{user.investment_type}</TableCell>
                    <TableCell style={{width:480, textAlign:'justify'}}>{user.news}</TableCell>
                    <TableCell>
                      {moment(user.posted_date).format('DD/MM/YYYY')}
                    </TableCell>                    
                    <TableCell>
                      <Grid style={{display:'flex'}}>
                        <Button color="primary" variant="contained" 
                        onClick={()=> handleOpen(user.id)}
                        > Edit</Button>
                        <Button color="denger" style={{marginLeft:10, background:'red', color:'#fff'}} variant="contained" 
                        onClick={()=> handleDelete(user.id)}
                        > Delete</Button>
                      </Grid>
                    </TableCell>
                  </TableRow>
                )):
                <TableRow>
                <TableCell colSpan="4" style={{textAlign:"center"}}>
                    No Record Found</TableCell>                
                </TableRow>
                }
              </TableBody>
              }
           </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    </Card>
  );
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}

const actionCreators = {
  logout: adminActions.logout,
  adminUpdateMarketNews: adminActions.adminUpdateMarketNews,
  admindeleteMarketNews: adminActions.admindeleteMarketNews,
};
// export default UsersTable;

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,actionCreators)(UsersTable))
);