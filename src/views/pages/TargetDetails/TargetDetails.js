import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { Grid, Button, Typography, Card, CardContent} from '@material-ui/core';
import {Link } from "react-router-dom";
import { UsersToolbar, UsersTable } from '../components/TranscationTable';


class TargetDetails extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    const user_id = this.props.match.params.user_id;
    // console.log(this.props.match.params)
    this.state ={
      data:{
        id:id,
        from_date : "",
        to_date:"",
      },
      user_id,
      users: [],
      details: null,
      all: [],
      search: "",
      loading: true,
      open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUserDetails = this.fetchUserDetails.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.target_name = this.props.match.params.target_name
  }
  
componentDidMount(){
  this.fetchUsers();
  this.fetchUserDetails();
}

fetchUsers = () =>{
    const {data} = this.state
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    };
    fetch(getConfig('targetTransactionsAdmin')+ data.id + `?token=`+user.token, requestOptions)
      .then(async response => {
          const data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.statusText;
              return Promise.reject(error);
          }
          this.setState({users: data, all:data.data, loading:false });
      })
      .catch(error => {
          if (error === "Unauthorized") {
                this.props.logout()
            }
          this.setState({loading:false, err : "internet error" });
          console.error('There was an error!', error);
      });
}

fetchUserDetails = () =>{
  const {user_id} = this.state
  this.setState({loading:false });
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getSingleUserDetails')+ user_id, requestOptions)
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      this.setState({details: data[0][0], loading:false });
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
  const { value } = event.target;
  const {all } = this.state;
  
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.from_date.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.to_date.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  )})
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
    // console.log(data)
}

handleSubmit(event) {
  event.preventDefault();
  this.fetchUsers()
} 

render(){
  const {theme} = this.props
  const {users, loading, details} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
        <Grid container >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div style={{float:'left'}}>
              <UsersToolbar handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            </div>
            <div style={{float:'right'}}>
              <Link to="/targetsavings_tab">
                <Button
                  color="primary"
                  variant="contained"
                >
                  Back
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography style={{marginTop:20}} variant="h4">User Account Details</Typography>
            <Card elevation={3} style={{marginBottom:5}}>
              <CardContent>
                <Typography variant="h5" style={{marginTop:10, textAlign:"center"}} >
                  User Name: {details == null ?"": `${details.first_name} ${details.last_name}`} 	&nbsp;	&nbsp;
                  Email: {details !== null && details.email}	&nbsp;	&nbsp;
                  Phone Number :{ details !== null && details.phone_no}
                </Typography>
              </CardContent>
            </Card>
            <Typography style={{marginTop:20}} variant="h6">{this.target_name.toUpperCase()} Target Savings Account Transactions</Typography>
            <UsersTable users={users} loading={loading}/>
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
  targetTransactionsAdmin: adminActions.targetTransactionsAdmin,
  
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(TargetDetails))
);