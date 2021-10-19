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
import { UsersToolbar } from '../components/TranscationTable';
import TransactionTable from '../components/Table/TransactionTable';
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
    this.handleChangeFilter = this.handleChangeFilter.bind(this);    
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


handleChangeFilter(event) {
  const { name, value } = event.target;
  const { data } = this.state;
  if(name == "account_type"){
    this.setState({data: { ...data, account_type: value}, loading:true},()=>{
      this.fetchUsers()
    });
  }else{
    this.setState({data: { ...data,  [name]: value } });
  }
}

handleChange(event) {
    const { name, value } = event.target;
    const { data } = this.state;
    if(name == "from_date"||name == "to_date"){
      this.setState({ data: { ...data, [name]: value } });
    }else{
      this.setState({ data: { ...data, search_term: value }, loading:true},()=>{
        this.fetchUsers()
      });
    }
}

handleSubmit(event) {
  event.preventDefault();
  this.setState({loading:true });
  this.fetchUsers()
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
        <Grid container spacing={1} >
          <Grid item lg={6} md={6} sm={12} xs={12}>
              <UsersToolbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12}>
            <div style={{height: '42px'}}>
              <SearchInput
                style={{ marginRight: theme.spacing(1)}}
                select
                label="search"
                name="search_term"
                margin="dense"
                value={data.search_term}
                onChange={this.handleChange}/>
            </div>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <ExportCSV url="exportTransactions" fileName={filename} data={data} />
          </Grid>
          <Grid item lg={3} md={3} sm={6} xs={12}>
            <TextField
              label="Search by Account Type"
              fullWidth
              name="account_type"
              margin="normal"
              variant="outlined"
              value={data.account_type}
              onChange={this.handleChangeFilter}
              select
              id="outlined-basic"
    >
              <MenuItem value="1">
                Regular Savings
              </MenuItem>
              <MenuItem value="2">
                Target Savings
              </MenuItem>
              <MenuItem value="3">
                Save to Loan 
              </MenuItem>
              <MenuItem value="11">
                Infinto
              </MenuItem>
              </TextField>
            </Grid>
            
            {/* <UsersToolbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> */}

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TransactionTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading}/>
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