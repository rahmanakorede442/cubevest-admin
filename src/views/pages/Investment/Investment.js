import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter, Link } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { Grid, Button, TextField } from '@material-ui/core';
import { SearchInput } from 'components';

import { UsersToolbar, UsersTable } from '../components/Investment';

class Investment extends Component {
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
    this.searchChange = this.searchChange.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
    
  }

componentDidMount(){
  this.fetchUsers("");
}

fetchUsers = (search_term) =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({search_term})
    };
    fetch(getConfig('getAllHalalInvestor'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({users:[], all:[], loading:false });
    }else{
      this.setState({users: data.data, all:data, loading:false });
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
  q.first_name.toLowerCase().indexOf(value.toLowerCase())  !== -1  
  || q.last_name.toLowerCase().indexOf(value.toLowerCase())  !== -1
  )});
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
  const {users, loading, search, all} = this.state
    return (
      <div style={{padding: theme.spacing(3)}}>
      <div style={{height: '42px',alignItems: 'center',marginTop: theme.spacing(1)}}>
      <TextField
        name="search"
        value={search}
        onChange={this.searchChange}
        style={{marginRight: theme.spacing(1), width:300, float:'left'}}
        placeholder="Search user"
      />
      <UsersToolbar style={{float:'right'}} />
      </div>
      <Grid container className='formLabels'>
        <Grid item style={{paddingRight:4, paddingTop:12}}>
            <Link to ="/halal_categories">
              <Button color="primary" variant="contained" 
              // onClick={()=> handleOpen(user.id)}
              > Caterogies</Button>
            </Link>
        </Grid>
        <Grid item style={{paddingRight:4, paddingTop:12}}>
           <Link to ="/halal_investment">
              <Button color="primary" variant="contained" 
              // onClick={()=> handleOpen(user.id)}
              > Investment</Button>
            </Link>
        </Grid>
        <Grid item style={{paddingRight:4, paddingTop:12}}>
           <Link to ="/halal_news">
              <Button color="primary" variant="contained" 
              // onClick={()=> handleOpen(user.id)}
              > News</Button>
            </Link>
        </Grid>
      </Grid>
      <div style={{marginTop: theme.spacing(2)}}>
        <UsersTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} />
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
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Investment))
);