import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../../redux/config/config'
import { authHeader, history } from '../../../redux/logic';
import { SearchInput } from 'components';

import { userConstants } from 'redux/_constants';
import { users } from 'redux/_reducers/users.reducer';
import CategoryTable from 'redux/components/CategoryTable';
import { UsersTable, UsersToolbar } from 'views/pages/components/AddInvestment';
// import { UsersToolbar } from '../components/Savings';
import { Grid, Card, Button, CardActions, TextField, Divider, DialogActions, DialogContent, DialogTitle, Dialog, CardContent } from '@material-ui/core';
import {Link } from "react-router-dom";


class MarketInvestment extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={
      data:{
        market_investment : "",
        news : "",
        posted_date : entry_date
      },
      investments:[],
      users: [],
      all: [],
      search: "",
      loading:true,
      open:false,
      open_news:false
    }
    this.searchChange = this.searchChange.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
componentDidMount() {
    this.fetchUsers();
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getMarketNewsType'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  this.setState({investments: data, loading:false})
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.logout()
      }
  });
}

fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('showMarketInvestments'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({users: data, all:data, loading:false });
})
.catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
       }
    this.setState({loading:false});
    console.error('There was an error!', error);
  });
}
searchChange(event) {
  const { name, value } = event.target;
  const { search, users, all } = this.state;
  this.setState({ search: value, users: value == "" ? all : all.filter((q)=>
  q.category_name.toLowerCase().indexOf(value.toLowerCase())  !== -1  
  || q.insurance_partner.toLowerCase().indexOf(value.toLowerCase())  !== -1
  || q.investment_type.toLowerCase().indexOf(value.toLowerCase())  !== -1
  )});
}

handleChange(event) {
  const { name, value } = event.target;
  const { data } = this.state;
    this.setState({ data: { ...data, [name]: value }}); 
}

handleOpen= () =>{
  this.setState({open_news:true})
}

handleClose= () =>{
this.setState({open_news:false})
}

handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  console.log(data);
    if ( data.market_investment && data.news) {
      this.props.adminAddMarketNews(data);
    }
}

render(){
  const {theme, savings} = this.props
  const {users, loading, search, open, open_news, data, investments} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
        <CardActions>
              <Link to="/investment_tab">
                <Button
                color="secondary"
                variant="contained"
              >
                Back
              </Button> 
              </Link>
        </CardActions>
        <Grid  container justify="space-between" >
          <TextField
            name="search"
            value={search}
            onChange={this.searchChange}
            style={{marginRight: theme.spacing(1), width:200, float:'left'}}
            placeholder="Search Investment"/>
          <UsersToolbar category={"getMarketCategoryType"} adminAddInvestment={this.props.adminAddMarket} loader={this.props.savings}/>
        </Grid>
          
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading} data={"singleMarketInvestment"} category={"getMarketCategoryType"} loader={this.props.savings} adminUpdateInvestment={this.props.adminUpdateMarket} handleOpen={this.handleOpen} hideOrShow={this.props.hideOrShowMarketInvestment} />
        </div>
        <Dialog
            open={open_news}
            fullWidth={true}
            maxWidth = {'xs'}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description">
          <DialogTitle bold id="alert-dialog-slide-title">Add Market News</DialogTitle>  
          <Divider />     
        <DialogContent>
          <CardContent className="content">
            <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid >
                  <Grid>
                      <label>Select Investment Name</label>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        value={data.market_investment} 
                        onChange={this.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Please select Investment Name"
                        name="market_investment"                       
                      >
                        {investments.map((option) => (
                          <option key={option.id} value={option.investment_type}>
                            {option.investment_type}
                          </option>
                        ))}

                    </TextField>
                    </Grid><br/>
                    <Grid>
                      <label>Market News</label>
                    <TextField
                      fullWidth
                      placeholder="Category Name"
                      name="news"
                      multiline 
                      margin="dense"
                      rows={4}
                      value={data.news} 
                      onChange={this.handleChange}
                      variant="outlined"
                    />
                  </Grid>                   
              </Grid>
            </form>
            </CardContent>              
          {/* </DialogContentText> */}
          <Divider /> 
        <DialogActions>
          <Grid item md={10} xs={10}>
            {savings &&
                <div className="loader">   
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            }
                <Button
                type="submit"
                  variant="contained"
                  color="primary"
                  style={{marginLeft:8}}
                  onClick={this.handleSubmit}
                >
                  Add News
                </Button>
              </Grid> 
              <Button onClick={this.handleClose} 
                      variant="contained"
                      style={{color:'white', marginRight:8, backgroundColor:'red'}}
              >
            Cancel
          </Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
      </div>
    );
  };
}
  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  adminAddMarketNews: adminActions.adminAddMarketNews,
  adminAddMarket: adminActions.adminAddMarket,
  adminUpdateMarket: adminActions.adminUpdateMarket,
  hideOrShowMarketInvestment: adminActions.hideOrShowMarketInvestment,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(MarketInvestment))
);