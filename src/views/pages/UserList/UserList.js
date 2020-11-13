import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { UsersToolbar, UsersTable } from '../components/Users';
import { SearchInput } from 'components';


class UserList extends Component{
  constructor(props){
    super(props)
    this.state={
        users: [],
        loading:true,
        all: [],
        search: "",
        open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);

  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  fetch(getConfig('getAllUsers'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data);
    this.setState({users: data, all:data, loading:false});
})
.catch(error => {
 
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
    console.error('There was an error!', error);
});
}

searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.last_name.toLowerCase().indexOf(value)  !== -1 
  || q.first_name.toLowerCase().indexOf(value)  !== -1 
  || q.email.toLowerCase().indexOf(value)  !== -1 )});
}

render(){
  let {theme} = this.props
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

// export default UserList;
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
  withRouter(connect(mapState,  actionCreators)(UserList))
);