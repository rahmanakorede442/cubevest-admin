import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader} from '../../../redux/logic';
import { SearchInput } from 'components';

import { UsersToolbar, UsersWithdTable } from '../components/Report';
import { Typography, Grid, MenuItem, Select, TextField, Button } from '@material-ui/core';
import ExportCSV from 'helpers/export';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';


class WithdReport extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:{
        from_date : "",
        to_date:"",
        search_term:"",
      },
      users: [],
      all: [],
      search: "",
      loading: true,
      open:false    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchChange = this.searchChange.bind(this);
  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data),
    };
    fetch(getConfig('withdrawalReport'), requestOptions)
    .then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		if (data.success == false){
			this.setState({users:[], loading:false });
		}else{
			this.setState({users:data, loading:false });
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

searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
      this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
      q.last_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 || q.first_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 || q.frequency.toLowerCase().indexOf(value.toLowerCase())  !== -1 )});
}
handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
  if(name == "from_date"||name == "to_date"){
    this.setState({ data: { ...data, [name]: value } });
  }else{
    this.setState({data: { ...data,[name]: value }});
  }
}
handleSubmit(event) {
  const { data } = this.state;
  event.preventDefault();
  this.setState({loading:true });
  this.fetchUsers(data)
} 

render(){
  const {theme} = this.props
  const {users, loading, data, open} = this.state
  const filename = `Approved Withdrawal-${new Date().getTime()}`
    return (
      <div style={{padding: theme.spacing(1)}}>
        <div>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <Grid container spacing={1} >
              <Grid item lg={4} md={4} sm={4} xs={6}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  helperText="From Date"
                  name="from_date"
                  onChange={this.handleChange}
                  value={data.from_date}
                  type="date"
                  variant="outlined"
                  validators={[
                      "required"
                    ]}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={6}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  helperText="To Date"
                  name="to_date"
                  onChange={this.handleChange}
                  value={data.to_date}
                  type="date"
                  variant="outlined"
                  validators={[
                      "required"
                    ]}
                />
              </Grid>
              <Grid item lg={4} md={4} sm={4} xs={6}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  label="Enter User Name"
                  name="search_term"
                  onChange={this.handleChange}
                  value={data.search_term}
                  variant="outlined"
                  validators={[
                      "required"
                    ]}
                />
              </Grid>
            </Grid>
          </ValidatorForm>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Button variant="contained" onClick={this.handleSubmit} color="secondary">Search</Button>
              <ExportCSV url="withdrawalReport" fileName={filename} data={data} />
            </Grid>
        </div>
         
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersWithdTable users={users} loading={loading} />
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
  withRouter(connect(mapState,  actionCreators)(WithdReport))
);