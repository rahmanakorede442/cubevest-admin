import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader} from '../../../redux/logic';
import { SearchInput } from 'components';

import { UsersToolbar, UsersTable } from '../components/Report';
import { Typography, Grid, MenuItem, Select, TextField, Button } from '@material-ui/core';
import ExportCSV from 'helpers/export';


class Report extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:{
        from_date : "",
        to_date:"",
        search_term:"",
        package:"",
        deposit_type:""
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
    fetch(getConfig('depisitReport'), requestOptions)
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
  const filename = `Deposited Report-${new Date().getTime()}`
  return (
      <div style={{padding: theme.spacing(1)}}>
        <UsersToolbar url='depisitReport' data={data} fileName={filename} name='deport' handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        {/* <ExportCSV url='depisitReport' data={data} fileName={filename}  name='deport' /> */}

        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users.transaction_record} total={users.total} loading={loading} />
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
  withRouter(connect(mapState,  actionCreators)(Report))
);