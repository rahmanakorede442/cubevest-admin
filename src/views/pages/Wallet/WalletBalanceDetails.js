import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';
import { Grid, Card, Button, } from '@material-ui/core';
import {Link } from "react-router-dom";

import { WalletDetailsTable } from './components';


class WalletBalanceDetails extends Component {
  constructor(props){
    super(props)
    this.state ={
      data: [],
      all: [],
      search: "",
      loading: true,
    }
    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount(){
      this.fetchUsers();
  }

  fetchUsers = () =>{
    this.setState({loading:false });
    let user = JSON.parse(localStorage.getItem('admin'));
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    const id = this.props.match.params.id;
    fetch(getConfig('walletBalanceDetails')+ id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    // console.log(data.data)
    this.setState({data: data.data, all:data.data, loading:false });
})
.catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
       }
    this.setState({loading:false });
  });
}

render(){
  const {data, loading} = this.state
  
    return (
      <div style={{padding: 10}}>
        <Grid container >
            <Grid item lg={12} md={12} sm={12} xs={12}>
                <Link to="/wallet">
                    <Button
                    color="primary"
                    variant="contained" >
                        Back
                    </Button>
                </Link>
            </Grid>
            <Grid item md={12} xs={12} >
                <WalletDetailsTable data={data} loading={loading} status={false}/>
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

export default connect(mapState,  actionCreators)(WalletBalanceDetails)
