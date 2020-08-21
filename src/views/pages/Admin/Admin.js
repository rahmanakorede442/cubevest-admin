import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';

import { UsersToolbar, UsersTable } from '../components/Savings';
import { userConstants } from 'redux/_constants';
import { users } from 'redux/_reducers/users.reducer';


class Admin extends Component {
  constructor(props){
    super(props)
    this.state ={
      users: [],
      all: [],
      search: "",
      open:false,
      loading: true,
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
    fetch(getConfig('getAllRegularSavings'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({users: data.data, all:data.data, loading:false });
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
        <div style={{height: '42px',display: 'flex',alignItems: 'center',marginTop: theme.spacing(1)}}>
        <SearchInput
          value={search}
          onChange={this.searchChange}
          style={{marginRight: theme.spacing(1)}}
          placeholder="Search user"
        />
        </div>
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading}/>
        </div>
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
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Admin))
);