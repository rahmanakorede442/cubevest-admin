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
      data:{new_search:""},
      users: [],
      all: [],
      loading: true,
    }  

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

componentDidMount(){
  this.fetchUsers(this.state.data);
}

fetchUsers = (data) =>{
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
      body:data
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

handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
    this.setState({ data: { ...data, [name]: value }, loading:true},()=>{
      this.fetchUsers(data)
    });
}

render(){
  const {theme} = this.props
  const {users, loading, data} = this.state
    return (
      <div style={{padding: theme.spacing(4)}}>
        <Grid container spacing={4} >
          <Grid item md={12} xs={12} >
            <div style={{alignItems: 'center',marginTop: theme.spacing(1)}}>
              <SearchInput
                name="new_search"
                value={data.new_search}
                onChange={this.handleChange}
                style={{marginRight: theme.spacing(1), width:300, float:'left'}}
                placeholder="Search users"/>      
            </div>
          </Grid>

          <Grid item md={12} xs={12} >
            <WalletBalanceTable users={users} loading={loading} status={true}/>
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