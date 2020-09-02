import React, { Component } from "react";
import { adminActions } from "../../../redux/action";
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
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

class Loan extends Component {
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
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

fetchUsers = () =>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getLoansForApproval'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
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
  q.package_name.toLowerCase().indexOf(value.toLowerCase())  !== -1
   )});
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
  console.log(data);
  if ( data.commission && data.package_name) {
    this.props.addTargetCommission(data);
  }
} 

render(){
  const {theme, savings} = this.props
  const {search,data,users,open, loading} = this.state
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
          <UsersTable users={users} loading={loading} status={true}/>
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
    withRouter(connect(mapState,  actionCreators)(Loan))
  );