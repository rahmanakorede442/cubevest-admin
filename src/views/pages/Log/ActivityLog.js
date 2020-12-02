import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { Grid, MenuItem, TextField} from '@material-ui/core';
import LogTable from './LogTable';
import { UsersToolbar } from '../components/TranscationTable';


class ActivityLog extends Component {
  constructor(props){
    super(props)
    this.state ={
      users: [],
      all: [],
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount(){
    this.fetchUsers();
  }

fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('activitiesLog'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({users: data.data, all:data, loading:false });
})
.catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
       }
    this.setState({loading:false});
    console.error('There was an error!', error);
  });
}

  handleChange(event) {
    const { name, value } = event.target;
    const { users } = this.state;
    if(name === "from_date"||name === "to_date"){
      this.setState({ users: { ...users, [name]: value } });
    }else{
      this.setState({ users: { ...users, [name]: value }, loading:true},()=>{
        this.fetchUsers()
      });
    }
}
render(){
  const {theme} = this.props
  const {users, loading} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
        <Grid container spacing={4} >
          <Grid item lg={8} md={8} sm={12} xs={12}>
              <UsersToolbar handleChange={this.handleChange}/>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <LogTable users={users} loading={loading}/>
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
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
  transactions: adminActions.transactions,
  
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(ActivityLog))
);