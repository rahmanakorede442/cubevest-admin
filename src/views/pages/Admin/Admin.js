import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';

import { userConstants } from 'redux/_constants';
import { users } from 'redux/_reducers/users.reducer';
import CategoryTable from 'redux/components/CategoryTable';
import { UsersTable } from '../components/Table';
// import { UsersToolbar } from '../components/Savings';
import { Grid, Card, Button, Typography, TextField,
  CardContent, DialogTitle, DialogContent,
   DialogActions, Divider, Dialog, MenuItem, CardActions, CircularProgress } from '@material-ui/core';
import {Link } from "react-router-dom";


class Admin extends Component {
  constructor(props){
    super(props)
    this.state ={  
      data:{
        // invetment_type: '',
        name : "",
        email : "",
        password : ""
      },
      users: [],
      all:[],
      investments:[],
      search: "",
      open:false,
      show:false,
      loading: true,
    }
    
    this.fetchUsers = this.fetchUsers.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    // this.onChange = this.onChange.bind(this);

  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('getAdminShow'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    this.setState({users: data, all:data, loading:false });
  })
  .catch(error => {
      if (error === "Unauthorized") {
        this.props.logout()
      }
      this.setState({loading:false, err : "internet error" });
      console.error('There was an error!', error);
    });
  }

componentDidMount() {
  this.fetchUsers();
}

searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.name.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.email.toLowerCase().indexOf(value.toLowerCase())  !== -1)});}

handleOpen= () =>{
    this.setState({open:true})
 }

handleClose= () =>{
  this.setState({open:false})
 }

 handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
  
      this.setState({
          data: {
              ...data,
              [name]: value
          }
      });
  
}

handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  // console.log(data);
    if ( data.name && data.email && data.password) {
      this.props.addAdmin(data);
    }
}

render(){
  const {theme, savings} = this.props
  const {users, loading, data, datat, handleClose, handleOpen, search, open, investments} = this.state
    return (
      <div style={{padding: theme.spacing(3)}}>
        <div style={{height: '42px',alignItems: 'center', display:'flex', marginTop: theme.spacing(1)}}>
          <SearchInput
            value={search}
            onChange={this.searchChange}
            style={{marginRight: theme.spacing(1), width:300, float:'left'}}
            placeholder="Search user"
          />
         
          <div style={{float:'right'}}>
            <div className="row">
              <span className="spacer" />
              <Button
                color="primary"
                variant="contained"
                onClick={()=>this.handleOpen()}
              >
                Add Admin
              </Button>
            </div>
          </div>          
        </div>
      
       
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading}/>
        </div>
          {/* Modal */}
          <Dialog
            open={open}
            // TransitionComponent={Transition}
            fullWidth={true}
            maxWidth = {'xs'}
            keepMounted
            // value=""
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle bold id="alert-dialog-slide-title">Add Admin</DialogTitle>  
            <Divider />     
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-slide-description" > */}
                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                  <CardContent className="content">
                    <Grid >
                      <Grid>
                        <TextField
                        fullWidth
                        label="Admin Name"
                        placeholder="Admin Name"
                        margin="dense"
                        name="name"
                        onChange={this.handleChange}
                        required
                        value={data.name}
                        variant="outlined"
                        />
                      </Grid> 
                      <Grid>
                        <TextField
                        fullWidth
                        label="Email"
                        placeholder="Email"
                        margin="dense"
                        name="email"
                        onChange={this.handleChange}
                        required
                        value={data.email}
                        variant="outlined"
                      />
                    </Grid> 
                    <Grid>
                      <TextField
                        fullWidth
                        label="Password"
                        placeholder="Password"
                        margin="dense"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        required
                        value={data.password}
                        variant="outlined"
                      />
                  </Grid>                    
                </Grid>
              </CardContent>
              <Divider /> 
              <DialogActions>
                <Grid item md={10} xs={10}>
                  {savings &&<CircularProgress />}
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{marginLeft:8}}
                  >
                    Submit
                  </Button>
                </Grid> 
                <Button onClick={this.handleClose} 
                  variant="contained"
                  style={{color:'white', marginRight:8, backgroundColor:'red'}}
                >
                  Cancel
                </Button>
              </DialogActions>
            </form>
            </DialogContent>
          </Dialog>
          {/* Modal */}
      </div>
    );
  };
}
  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
  addAdmin: adminActions.addAdmin,
  // adminUpdateMarketCategory: adminActions.adminUpdateMarketCategory,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Admin))
);