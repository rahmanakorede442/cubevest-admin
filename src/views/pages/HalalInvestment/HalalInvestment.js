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
import { UsersTable, UsersToolbar } from 'views/pages/components/AddInvestment';
// import { UsersToolbar } from '../components/Savings';
import { Grid, Card, Button, CardActions } from '@material-ui/core';
import {Link } from "react-router-dom";


class HalalInvestment extends Component {
  constructor(props){
    super(props)
    this.state ={
      users: [],
      all: [],
      search: "",
      loading:true,
      open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);
    // this.submitSearch = this.submitSearch.bind(this);

  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('showHalaiInvestments'), requestOptions)
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
  q.last_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.first_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.frequency.toLowerCase().indexOf(value.toLowerCase())  !== -1 )});}


render(){
  const {theme} = this.props
  const {users, loading, search, open} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
        <CardActions>
              <Link to="/investment_tab">
                <Button
                color="secondary"
                variant="contained"
              >
                Back
              </Button> 
              </Link>
          </CardActions>
        <div style={{height: '42px',alignItems: 'center',marginTop: theme.spacing(1)}}>
        <SearchInput
          value={search}
          onChange={this.searchChange}
          style={{marginRight: theme.spacing(1), width:300, float:'left'}}
          placeholder="Search user"
        />
        <UsersToolbar style={{float:'right'}} />
        </div>
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading} />
        </div>
        {/* <div style={{marginTop: theme.spacing(2)}}>
          <CategoryTable users={users} />
        </div> */}
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
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(HalalInvestment))
);