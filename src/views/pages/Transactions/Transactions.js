import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid, MenuItem, TextField} from '@material-ui/core';
import {Link } from "react-router-dom";

import { UsersToolbar, SaveLoanTable } from '../components/TranscationTable';
import { userConstants } from 'redux/_constants';
import { users } from 'redux/_reducers/users.reducer';
import TransactionTable from '../components/Table/TransactionTable';


class Transactions extends Component {
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
        new_search:"",
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
    this.handleSubmit = this.handleSubmit.bind(this);

  }

fetchUsers = () =>{
    const {data} = this.state
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    fetch(getConfig('transactions'), requestOptions)
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
    if(name == "from_date"||name == "to_date"){
      this.setState({ data: { ...data, [name]: value } });
    }else{
      this.setState({ data: { ...data, [name]: value }, loading:true},()=>{
        this.fetchUsers()
      });
    }
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
        <Grid container spacing={4} >
          <Grid item lg={8} md={8} sm={12} xs={12}>
              <UsersToolbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextField
              style={{width:"100%"}}
              select
              label="search"
              name="new_search"
              margin="dense"
              value={data.new_search}
              onChange={this.handleChange}>
                <MenuItem value={""}>Select an option</MenuItem>
                <MenuItem value={"Bank Account"}>Bank Account</MenuItem>
                <MenuItem value={"Wallet"}> Wallet</MenuItem>
                <MenuItem value={"Regular Savings"}>Regular Savings</MenuItem>
                <MenuItem value={"Target Savings"}> Target Savings</MenuItem>
                <MenuItem value={"Save To Loan"}> Save To Loan</MenuItem>
                <MenuItem value={"Loan"}> Loan</MenuItem>
                <MenuItem value={"Market Investment"}> Market Investment</MenuItem>
                <MenuItem value={"Halal Financing"}> Halal Financing</MenuItem>
                <MenuItem value={"Credit"}>Credit</MenuItem>
                <MenuItem value={"Debit"}> Debit</MenuItem>
            </TextField>
            </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TransactionTable users={users} loading={loading}/>
          </Grid>
        </Grid>
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
  transactions: adminActions.transactions,
  
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Transactions))
);