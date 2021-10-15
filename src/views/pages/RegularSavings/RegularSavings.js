import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid} from '@material-ui/core';

import { UsersTable } from '../components/Savings';
import ExportCSV from 'helpers/export';


class RegularSavings extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:{
        search_term:"",
      },
      users: [],
      all: [],
      search: "",
      open:false,
      loading: true,
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
  }

componentDidMount(){
  this.fetchUsers()
}

handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
    this.setState({ data: { ...data, search_term: value }, loading:true},()=>{
      this.fetchUsers()
    });
}

fetchUsers = () =>{
    const {data} = this.state
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    fetch(getConfig('getAllRegularSavings'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({users: [], loading:false });
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
  
    return (
      <div >
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item lg={11} md={11} sm={12} xs={12}>
            <SearchInput
              // style={{width:"30%"}}
              label="search"
              name="search_term"
              margin="dense"
              value={data.search_term}
              onChange={this.handleChange}/>
          </Grid>
          <Grid item lg={1} md={1} sm={12} xs={12}>
            <div style={{height: '42px', display: 'flex'}}>
              <ExportCSV url="exportTransactions" data={data} />
            </div>
          {/* <ExportCSV url="exportTransactions" fileName={filename} data={data} /> */}
          </Grid>
        </Grid>
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} link={"regulardetails"}/>
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
  withRouter(connect(mapState,  actionCreators)(RegularSavings))
);