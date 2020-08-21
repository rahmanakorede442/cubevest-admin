import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid, Card, Button, Typography, TextField,
        CardContent, DialogTitle, DialogContent,
         DialogActions, Divider, Dialog, CardActions } from '@material-ui/core';
import {Link } from "react-router-dom";

import { UsersToolbar, SaveLoanTable } from '../components/TranscationTable';
import { userConstants } from 'redux/_constants';
import { users } from 'redux/_reducers/users.reducer';


class SaveToLoanDetails extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={
      data:{
        id:id,
        from_date : "",
        to_date:"",
      },
      users: [],
      all: [],
      search: "",
      loading: true,
      open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);;

  }

  fetchUsers = () =>{
    const {data} = this.state
    console.log(data)
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    fetch(getConfig('saveLoanTransactionsAdmin')+ data.id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({users: data, all:data.data, loading:false });
})
.catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
       }
    this.setState({loading:false, err : "internet error" });
    console.error('There was an error!', error);
  });
}

searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.from_date.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.to_date.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  // || q.frequency.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  )});}

  handleChange(event) {
    const { name, value } = event.target;
    const { data } = this.state;
    
        this.setState({
            data: {
                ...data,
                [name]: value
            }
        });
    console.log(data)
}

handleSubmit(event) {
  event.preventDefault();
  this.fetchUsers()
} 



render(){
  const {theme} = this.props
  const {users, loading, search, handleSubmit, handleChange, data, open, searchChange} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
      {/* <div style={{height: '42px',display: 'flex',alignItems: 'center',marginTop: theme.spacing(0),marginBottom: theme.spacing(4)}}> */}
      <Grid container lg={12} md={12} sm={12} xs={12}>
      <Grid item lg={12} md={12} sm={12} xs={12}>
      <Grid style={{float:'left'}}>
          <UsersToolbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
        </Grid>
        <Grid style={{float:'right'}}>
        <Link to="/savetoloan_tab">
          <Button
            color="primary"
            variant="contained"
          >
           Back
        </Button>
      </Link>
      </Grid>
        </Grid>
       
        {/* </div> */}
        {/* <div style={{marginTop: theme.spacing(2)}}> */}
        <Grid item lg={12} md={12} sm={12} xs={12}>
        <SaveLoanTable users={users} loading={loading}/>
        </Grid>
      </Grid>
      {/* </div> */}
    </div>
  
    );
  };
}
  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
  saveLoanTransactionsAdmin: adminActions.saveLoanTransactionsAdmin,
  
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(SaveToLoanDetails))
);