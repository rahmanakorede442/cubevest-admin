import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, TextField, MenuItem } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { SearchInput } from 'components';
import { UsersToolbar, UsersTable } from '../components/Savings';


class TargetSavings extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:{
        new_search:"",
      },
      users: [],
      all: [],
      search: "",
      loading: true,
      open:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
  }

fetchUsers = () =>{
  const {data} = this.state
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(getConfig('getAllTargetSavings'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    if(data.success == false){
      this.setState({users: [], loading:false });
    }else{
      this.setState({users: data, loading:false });
    }
})
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout()
       }
    this.setState({loading:false, err : "internet error" });
    console.error('There was an error!', error);
});
}
handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
    this.setState({ data: { ...data, [name]: value }, loading:true},()=>{
      this.fetchUsers()
    });
}
render(){
  const {theme} = this.props
  const {users, loading, search, open, data} = this.state
    return (
      <div >
        <Grid container spacing={4} justify="center" >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              style={{width:"30%"}}
              select
              label="search"
              name="new_search"
              margin="dense"
              value={data.new_search}
              onChange={this.handleChange}>
                <MenuItem value={""}>Select an option</MenuItem>
                <MenuItem value={"Daily"}>Daily</MenuItem>
                <MenuItem value={"Weekly"}> Weekly</MenuItem>
                <MenuItem value={"Monthly"}>Monthly</MenuItem>
                <MenuItem value={"Wallet"}> Wallet</MenuItem>
                <MenuItem value={"Bank Account"}> Bank Account </MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading} link={"target"}/>
        </div>
      </div>
    );
  };
}


  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(TargetSavings))
);