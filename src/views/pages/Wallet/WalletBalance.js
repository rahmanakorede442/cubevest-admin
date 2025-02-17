import React, { Component } from "react";
import { adminActions } from "../../../redux/action";
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import {WalletBalanceTable } from './components';
import {
  Grid,
} from '@material-ui/core';
import { SearchInput } from "components";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class WalletBalance extends Component {
  constructor(props){
    super(props)
    this.state ={  
      data:{search_term:""},
      users: [],
      all: [],
      loading: true,
    }  

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
  }

componentDidMount(){
  this.fetchUsers(this.state.data);
}

fetchUsers = (data) =>{
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body:JSON.stringify(data)
  };
  fetch(getConfig('walletBalance'), requestOptions)
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

handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
    this.setState({ data: { ...data, search_term: value }, loading:true},()=>{
      this.fetchUsers(data)
    });
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
  const {users, loading, data, all} = this.state
    return (
      <div style={{padding: theme.spacing(4)}}>
        <Grid container spacing={4} >
          <Grid item md={12} xs={12} >
            <div style={{alignItems: 'center',marginTop: theme.spacing(1)}}>
              <SearchInput
                name="search_term"
                value={data.search_term}
                onChange={this.handleChange}
                style={{marginRight: theme.spacing(1), width:300, float:'left'}}
                placeholder="Search users"/>
            </div>
          </Grid>
          <Grid item md={12} xs={12}>
            <WalletBalanceTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} status={true}/>
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
    logout: adminActions.logout,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(WalletBalance))
  );