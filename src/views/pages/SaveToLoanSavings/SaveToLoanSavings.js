import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader} from '../../../redux/logic';
import { SearchInput } from 'components';

import { UsersToolbar, SaveToLoan } from '../components/Savings';


class SaveToLoanSavings extends Component {
  constructor(props){
    super(props)
    this.state ={
      users: [],
      all: [],
      search: "",
      loading: true,
      open:false    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);
  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('getAllSaveToLoanSavings'), requestOptions)
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
        this.setState({loading:false });
        console.error('There was an error!', error);
    });
}

searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
      this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
      q.last_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 || q.first_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 || q.frequency.toLowerCase().indexOf(value.toLowerCase())  !== -1 )});
}

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
          <SaveToLoan users={users} loading={loading}/>
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
  withRouter(connect(mapState,  actionCreators)(SaveToLoanSavings))
);