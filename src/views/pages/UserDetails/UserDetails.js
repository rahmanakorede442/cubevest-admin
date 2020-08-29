import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter, Link } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken} from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid, Card, Button, ButtonGroup, Hidden, Icon, Fab, CardActions, Typography } from '@material-ui/core';
import UserAccount from './compnent/UserAccount/UserAccount';
// import Loading from "matx/components/MatxLoading/MatxLoading";
import swal from 'sweetalert'

import { UsersToolbar, UsersTable } from '../components/Savings';
import UserProfile from './compnent/UserAccount/UserProfile';
// import { UserDetails } from 'views';


class UserDetails extends Component {
  constructor(props){
    super(props)
    const id = this.props.match.params.id;
    this.state ={
      users: [],
      bank: [],
      all: [],
      loading: true,
      search: "",
      user_status:'',
      open:false,
      id
    }
    this.searchChange = this.searchChange.bind(this);
    this.handleEnable = this.handleEnable.bind(this);
    this.handleDeclaine = this.handleDeclaine.bind(this);
  }   

  componentDidMount(){
    let user = JSON.parse(localStorage.getItem('admin'));
    const id = this.props.match.params.id;
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('getSingleUserDetails') + id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }    
    if(data[0].length == 0){
      this.setState({users: []});
    }else{
      this.setState({users: data[0][0]});
    }
    if(data[1].length == 0){
      this.setState({bank: [], loading:false });
    }else{
      this.setState({bank: data[1][0], loading:false });
    }
    console.log(data)
  })
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout()
       }
    this.setState({loading:false, err : "internet error" });
    console.error('There was an error!', error);
  });
}


handleDeclaine = () => {
  const id = this.props.match.params.id;
  swal({
    title: "Are you sure?",
    text: "Do you to Disable this User?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
  if (willDelete) {
    this.props.disableUsers(id);
    swal("Loading...",{   
      buttons:false
    });
  }
});
}

handleEnable = () => {
  const id = this.props.match.params.id;
  swal({
    title: "Are you sure?",
    text: "Do you to Enable this User?",
    icon: "success",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
  if (willDelete) {
    this.props.enableUsers(id);
    swal("Loading...",{   
      buttons:false
    });
  }
});
}
searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.last_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.first_name.toLowerCase().indexOf(value.toLowerCase())  !== -1 
  || q.frequency.toLowerCase().indexOf(value.toLowerCase())  !== -1 )});
}

render(){
  const {theme} = this.props
  const {users, bank, loading, search, open, id} = this.state
    return (
      <div style={{padding: theme.spacing(3)}}>
    
    {loading?
      <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <img
              img
              alt=""
              className="loader"
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
            />
      </div>:    
        <div style={{marginTop: theme.spacing(2)}}>
        <Grid
            container
            spacing={4}
          >
            <Grid
              item
              lg={4}
              md={6}
              xl={4}
              xs={12}
            >
              <UserAccount users={users} loading={loading}/>
              
              <Grid style={{display:'flex'}}>
                <CardActions>
                <Link to="/users">
                  <Button
                    color="secondary"
                    variant="contained"
                  >
                    Back
                  </Button> 
                  </Link>
                </CardActions>
                <CardActions>
                  {users.user_status == 1 ?
                  <Button
                    style={{background:'red', color:'white'}}
                    variant="contained"
                    onClick={()=>this.handleDeclaine()}>Disable
                  </Button> :
                  <Button
                    style={{color:'white',background:'blue'}}
                    variant="contained"
                  onClick={()=>this.handleEnable()}>Enable
                  </Button>
                  }
                </CardActions>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="h6">Savings Account</Typography>
                  <div className="py-5" />
                  <Link to={`/regulardetails/${id}`}><Button style={{width:"100%"}} variant="outlined">Regular Savings</Button></Link>
                  <Link to={`/target_details/${users.id}`}><Button style={{width:"100%"}} variant="outlined">Target Savings</Button></Link>
                  <Link to={`/savetoloan_details/${id}`}><Button style={{width:"100%"}} variant="outlined">Save To Loan</Button></Link>
                  <Typography variant="h6">Investments Account</Typography>
                  <Link to="/"><Button style={{width:"100%"}} variant="outlined">Market Investment</Button></Link>
                  <Link to="/"><Button style={{width:"100%"}} variant="outlined">Halal Investment</Button></Link>
                  <Typography variant="h6">Loans</Typography>
                  <Link to="/"><Button style={{width:"100%"}} variant="outlined">Loans</Button></Link>
              </Grid>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xl={8}
              xs={12}
            >
              <UserProfile users={users} bank={bank} loading={loading}/>
            </Grid>
            </Grid>
          </div>
      }
      </div>
    );
  };
}
  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  disableUsers: adminActions.disableUsers,
  enableUsers: adminActions.enableUsers,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(UserDetails))
);