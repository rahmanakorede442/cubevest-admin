import React, { useState, useEffect, createRef} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { authHeader } from '../../../../../redux/logic';
import { getConfig, numberFormat, } from '../../../../../redux/config/config';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import swal from 'sweetalert';

import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button,
  Dialog,
  Divider,
  Grid,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Slide,
  Icon,
  Tooltip,
  CircularProgress
} from '@material-ui/core';
import { Add, Edit, Visibility, VisibilityOff } from '@material-ui/icons';
import {Link} from 'react-router-dom';
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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [id, setId] = useState();
  const uploadedImage = createRef();
  const imageUploader = createRef();
  const [data, setData] = useState({});
  const [category, setcategory] = useState([]);
  const [loader, setloader] = useState(false)
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
      };
      fetch(getConfig(props.category), requestOptions)
      .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      setcategory(data)
      })
      .catch(error => {
        console.log(error)
      });
}, []);

const fetchSingleInvestment =(id)=>{
  setloader(true)
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig(props.data)+id, requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  setData(data[0])
  setloader(false)
  })
  .catch(error => {
    console.log(error)
  });
}

const handleSubmit = (event)=>{
  event.preventDefault();
  let fd = new FormData();
  fd.append('investment_pic', data.investment_pic);
  fd.append('expected_returns', data.expected_returns);
  fd.append('current_values', data.current_values);
  fd.append('maturity_date', data.maturity_date);
  fd.append('start_date', data.start_date);
  fd.append('application_date', data.application_date);
  fd.append('payout_type', data.payout_type);
  fd.append('unit_type', data.unit_type);
  fd.append('insurance_partner', data.insurance_partner);
  fd.append('investment_type', data.investment_type);
  fd.append('category_name', data.category_name);
  props.adminUpdateInvestment(data, id);
  
}
const handleProfileImage=(e)=>{
  const [file, name] = e.target.files;
  if(file){
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setData(data=>({ ...data, investment_pic: e.target.files[0], id:id}))
  }
}
const handleChange = (event) =>{
  const { name, value } = event.target;
  event.persist();
  setData(data=>({ ...data, [name]:value, id:id}))
}
 
  const handleOpen = (id) => {
    fetchSingleInvestment(id)
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const hideOrShow = (id, status) =>{
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete){
        if(status == "hide"){
          props.hideOrShow({id, status})
          swal("Loading...",{   
            buttons:false
          });
        }else{
          props.hideOrShow({id, status})
          swal("Loading...",{   
            buttons:false
          });
        }
      }
    });
  }

  let currentDate = new Date();
  
  return (
    <Card className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Picture</TableCell>
                  <TableCell> Name</TableCell>
                  <TableCell> Returns</TableCell>
                  <TableCell> Partner</TableCell>
                  <TableCell> Type</TableCell>
                  <TableCell>Entry Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell colSpan={3}>Action</TableCell>
                </TableRow>
              </TableHead>
          {loading?
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} style={{alignItems:"center"}}>
                <CircularProgress />  
              </TableCell>
            </TableRow>
          </TableBody>: 
          <TableBody>
          {users.length != 0 ?
          users.map(user => (
          <TableRow
            className={classes.tableRow}
            hover
            key={user.id}>
                  <TableCell><img style={{width:150,height:100}} src={user.investment_pic}/></TableCell>
                  <TableCell>{user.investment_type}</TableCell>
                  <TableCell>{numberFormat(user.expected_returns)}</TableCell>
                  <TableCell>{user.insurance_partner}</TableCell>
                  <TableCell>{user.category_name}</TableCell>
                  <TableCell>{moment(user.created_at).format('DD/MM/YYYY')}</TableCell>     
                  <TableCell>{ new Date(user.maturity_date) < currentDate? "Closed": "Active"}</TableCell>               
                  <TableCell colSpan={4}>
                    <Tooltip title="Edit Investment">
                      <IconButton aria-label="edit" onClick={()=> handleOpen(user.id)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Add News">
                      <IconButton aria-label="add news" onClick={props.handleOpen}>
                        <Add />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={user.status == 1?"Hide":"Show"}>
                      <IconButton aria-label="enable" onClick={()=>{hideOrShow(user.id, user.status==1?"hide":"show")}}>
                        {user.status == 1?<Visibility />:<VisibilityOff />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )):
              <TableRow>
              <TableCell colSpan={8} style={{textAlign:"center"}}>
                  No Record Found
              </TableCell>     
              </TableRow>
              }
            </TableBody>
            }
          </Table>
        </div>
      </PerfectScrollbar>
    </CardContent>
    <Paginate pagination={props.pagination} fetch_prev_page={props.fetch_prev_page} fetch_next_page={props.fetch_next_page} fetch_page={props.fetch_page}/>
    {/* Modal update investment start*/}
    <Dialog
        open={open}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Update Investment</DialogTitle>  
        <Divider />     
        {loader ?
        <Typography variant="h6" className="mx-5">Loading...</Typography>:
        <DialogContent>
          <CardContent className={classes.content}>
          <ValidatorForm autoComplete="off" noValidate onSubmit={handleSubmit}>
          <img
            style={{marginLeft: 'auto', height: 110, width: 100, flexShrink: 0, flexGrow: 0, borderRadius:50}}
            src={data.investment_pic == null ? "/images/avatars/avatar_11.png":data.investment_pic} ref={uploadedImage}/>
            <Grid>
            <TextValidator
                fullWidth
                placeholder="Current Value"
                margin="dense"
                name="investment_pic"
                variant="outlined"
                type="file"
                ref={imageUploader}
                helperText="Please select investment image"
                onChange={handleProfileImage}
              />
              <TextValidator
                fullWidth
                placeholder="Current Value"
                margin="dense"
                name="current_values"
                validators={[
                    "required"
                  ]}
                value={data.current_values}
                variant="outlined"
                type="number"
                helperText="Please enter current values"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Expected Returns"
                margin="dense"
                name="expected_returns"
                validators={[
                    "required"
                  ]}
                value={data.expected_returns}
                variant="outlined"
                type="number"
                helperText="Please enter expected returns"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Unit Type"
                margin="dense"
                name="unit_type"
                validators={[
                    "required"
                  ]}
                value={data.unit_type}
                variant="outlined"
                type="number"
                helperText="Please enter unit amount"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                select
                placeholder="Payout Type"
                margin="dense"
                name="payout_type"
                value={data.payout_type}
                validators={[
                    "required"
                  ]}
                helperText="Please select payout type"
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
                variant="outlined">
                  <option value="Debit Card">Debit Card</option>
                  <option value="Wallet">Wallet</option>
              </TextValidator>
              <TextValidator
                fullWidth
                placeholder="Insurance Partner"
                margin="dense"
                name="insurance_partner"
                validators={[
                    "required"
                  ]}
                value={data.insurance_partner}
                variant="outlined"
                helperText="Please enter investment partner "
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Investment Type"
                margin="dense"
                name="investment_type"
                validators={[
                    "required"
                  ]}
                value={data.investment_type}
                variant="outlined"
                helperText="Please enter Investment type "
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                select
                placeholder="Investment Category"
                margin="dense"
                name="category_name"
                validators={[
                    "required"
                  ]}
                value={data.category_name}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                helperText="Please select Investment Category"
                onChange={handleChange}>
                  <option value={data.category_name}>{data.category_name}</option>
                  {category.map((option) => (
                    <option key={option.id} 
                    value={option.category_name}>
                      {option.category_name}
                    </option>
                  ))}
              </TextValidator>
              <TextValidator
                fullWidth
                placeholder="Start Date"
                margin="dense"
                name="start_date"
                validators={[
                    "required"
                  ]}
                value={data.start_date}
                variant="outlined"
                type="date"
                helperText="Please select Start date"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Maturity Date"
                margin="dense"
                name="maturity_date"
                validators={[
                    "required"
                  ]}
                value={data.maturity_date}
                variant="outlined"
                type="date"
                helperText="Please select Maturity date"
                onChange={handleChange}
              />
              <TextValidator
                fullWidth
                placeholder="Application Date"
                margin="dense"
                name="application_date"
                validators={[
                    "required"
                  ]}
                value={data.application_date}
                variant="outlined"
                type="date"
                helperText="Please select Application date"
                onChange={handleChange}
              />
            </Grid>
            {props.loader &&
                <div className="loader">   
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            }
            <Grid>
              <Button type="submit" color="primary" variant="contained">
                Submit 
              </Button>
            </Grid>
          </ValidatorForm>
        </CardContent>
      </DialogContent>}
    </Dialog>
    {/* Modal update investment end */}
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
