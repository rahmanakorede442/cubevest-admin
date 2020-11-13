import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { adminActions } from 'redux/action';
import { authHeader } from 'redux/logic';
import { getConfig } from 'redux/config/config';
import { tokenToString } from 'typescript';
import { Button, Grid } from '@material-ui/core';
import WithdrawalTable from './WithdrawalTable';

class WithdrawalDetails extends Component {
    constructor(props){
        super(props)
        this.state ={
            data: [],
            all: [],
            loading:true
        }
        this.fetchOrders = this.fetchOrders.bind(this);
        this.fetch_next_page = this.fetch_next_page.bind(this);
        this.fetch_page = this.fetch_page.bind(this);
        this.fetch_prev_page = this.fetch_prev_page.bind(this);
}

componentDidMount(){
    this.fetchOrders()
}
      
fetchOrders = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    const id = this.props.match.params.id;
    const action = this.props.match.params.action;
    const name = action == 'ongoing'? 'ongoingBusinessDetails':'completedBusinessDetails';
    let token = JSON.parse(localStorage.getItem('admin'));
    fetch(getConfig(name)+id+'?token='+token.token, requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            this.setState({loading:false });
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log(data);
        if(data.success == false){
            this.setState({data: [], loading:false});
        }else{
            this.setState({data: data.data, all:data, loading:false});
        }
    })
    .catch(error => {
        if (error === "Unauthorized") {
            this.props.logout();
            }
        this.setState({loading:false });
    });
}

fetch_next_page = ()=>{
    const {all} = this.state
    this.setState({ loading: true});
    const requestOptions = {
      method: "GET",
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
    method: "GET",
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
    method: "GET",
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
    render() {
        const {investment, cart, theme} = this.props
        const {loading, data, all} = this.state
        return (
            <div style={{padding: theme.spacing(3)}}>
                <Grid container lg={12} md={12} sm={12} xs={12}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Grid style={{float:'left'}}>
                            <Link to="/business">
                                <Button
                                color="primary"
                                variant="contained"
                                >
                                Back
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <div >
                    <WithdrawalTable data={data} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} />
                </div>
            </div>
        )
    }
}

const actionCreators = {
    logout: adminActions.logout,
  };

function mapState(state) {
    const { savings } = state.savings;
    return { savings };
  }
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(WithdrawalDetails))
  );