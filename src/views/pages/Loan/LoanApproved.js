import React, { Component } from "react";
import { adminActions } from "../../../redux/action";
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import swal from 'sweetalert';
import {UsersTable } from './components';
import {
  Grid,
} from '@material-ui/core';
import { SearchInput } from "components";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class LoanApproved extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={  
      data:{
        commission : "",
        package_name : ""
      },
      open:false,
      users: [],
      all: [],
      search: "",
      show:false,
      loading: true,
    }  

    this.fetchUsers = this.fetchUsers.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
  }

componentDidMount(){
  this.fetchUsers();
}

fetchUsers = () =>{
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body:JSON.stringify({search_term:this.state.search})
  };
  fetch(getConfig('getAllApprovedLoan'), requestOptions)
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

searchChange(event) {
	const { name, value } = event.target;
	  this.setState({ search:value, loading:true},()=>{
	  this.fetchUsers()
	});
}

 handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
  
      this.setState({
          data: {
              ...data,
              [name]: value
          }
      });
  
}
handleClose= () =>{
  this.setState({open:false})
}
handleOpen= () =>{
  this.setState({open:true})
}

handleSubmit(event) {
event.preventDefault();
const { data } = this.state;
  // console.log(data);
  if ( data.commission && data.package_name) {
    this.props.addTargetCommission(data);
  }
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
  const {theme, savings} = this.props
  const {search,data,users, all, loading} = this.state
    return (
      <div style={{padding: theme.spacing(4)}}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
          <div style={{alignItems: 'center',marginTop: theme.spacing(1)}}>
          <SearchInput
            value={search}
            onChange={this.searchChange}
            style={{marginRight: theme.spacing(1), width:300, float:'left'}}
            placeholder="Search Package Name"
          />      
          </div>
          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >
            <UsersTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} status={false}/>
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
    withRouter(connect(mapState,  actionCreators)(LoanApproved))
  );