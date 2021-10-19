import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid,TextField,MenuItem} from '@material-ui/core';
// import { UsersToolbar } from '../components/TranscationTable';
import {TransactionTable, UsersToolbar } from '../components/Table';
import ExportCSV from 'helpers/export';


class Transactions extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:{
        from_date : "",
        to_date:"",
        search_term:"",
        account_type:""
      },
      users: [],
      all: [],
      search: "",
      loading: true,
      open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleChangeFilter = this.handleChangeFilter.bind(this);    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);

  }

componentDidMount(){
	this.fetchUsers()
}

fetchUsers = () =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.data),
    };
    fetch(getConfig('transactions'), requestOptions)
    .then(async response => {
		const data = await response.json();
		if (!response.ok) {
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}
		if (data.success == false){
			this.setState({users:[], loading:false });
		}else{
			this.setState({users:data.data, all:data, loading:false });
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


// handleChangeFilter(event) {
//   const { name, value } = event.target;
//   const { data } = this.state;
//   if(name == "account_type"){
//     this.setState({data: { ...data, account_type: value}, loading:true},()=>{
//       this.fetchUsers()
//     });
//   }else{
//     this.setState({data: { ...data,  [name]: value } });
//   }
// }

// handleChange(event) {
//     const { name, value } = event.target;
//     const { data } = this.state;
//     if(name == "from_date"||name == "to_date"){
//       this.setState({ data: { ...data, [name]: value } });
//     }else{
//       this.setState({ data: { ...data, search_term: value }, loading:true},()=>{
//         this.fetchUsers()
//       });
//     }
// }
handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
  if(name == "from_date"||name == "to_date"){
    this.setState({ data: { ...data, [name]: value } });
  }else{
    this.setState({data: { ...data,[name]: value }});
  }
}

// handleSubmit(event) {
//   event.preventDefault();
//   this.setState({loading:true });
//   this.fetchUsers()
// }
handleSubmit(event) {
  const { data } = this.state;
  event.preventDefault();
  this.setState({loading:true });
  this.fetchUsers(data)
}  

fetch_next_page = ()=>{
	const {all} = this.state
	this.setState({ loading: true});
	const requestOptions = {
	  method: "POST",
	  headers: { ...authHeader(), "Content-Type": "application/json" },
	};
	fetch(all.next_page_url, requestOptions).then(async (response) =>{
	  const data =await response.json();
	  this.setState({ loading: false, users:data.data, all:data });
	}).catch(error=>{
	  if (error === "Unauthorized") {
		this.props.logout();
	  }
	})
}

fetch_prev_page = ()=>{
const {all} = this.state
this.setState({ loading: true});
	const requestOptions = {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};
    fetch(all.prev_page_url, requestOptions).then(async (response) =>{
	const data =await response.json();
	this.setState({ loading: false, users:data.data, all:data });
	}).catch(error=>{
		if (error === "Unauthorized") {
			this.props.logout();
		}
	})
}

fetch_page = (index)=>{
	const {all} = this.state
	this.setState({ loading: true});
	const requestOptions = {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};
	fetch(all.path+"?page="+index, requestOptions).then(async (response) =>{
		const data =await response.json();
		this.setState({ loading: false, users:data.data, all:data });
	}).catch(error=>{
		if (error === "Unauthorized") {
		this.props.logout();
		}
	})
}


render(){
  const {theme} = this.props
  const {users, loading, all, data} = this.state
  const filename = `transactions-${new Date().getTime()}`
  
    return (
      <div style={{padding: theme.spacing(3)}}>
        <UsersToolbar url='exportTransactions' data={data} fileName={filename} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
        <div style={{marginTop: theme.spacing(2)}}>
          <TransactionTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading}/>
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
  transactions: adminActions.transactions,
  
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Transactions))
);