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
import { UsersTable, UsersToolbar } from 'views/pages/components/Categories';
import { Grid, Card, Button, Typography, TextField,
        CardContent, DialogTitle, DialogContent,
         DialogActions, Divider, Dialog, CardActions } from '@material-ui/core';
import {Link } from "react-router-dom";


class MarketCategory extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={  
      data:{
        category_name : "",
        entry_date: entry_date,
      },
      users: [],
      all: [],
      search: "",
      open:false,
      show:false,
      loading: true,
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
    this.searchChange = this.searchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    // this.handleChangeEdit = this.handleChangeEdit.bind(this);

  }

  componentDidMount() {
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getMarketCategoryName'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  this.setState({users: data.data, all:data.data, loading:false });
})
.catch(error => {
  if (error === "Unauthorized") {
        this.props.logout()
     }
  this.setState({loading:false, err : "internet error" });
  console.error('There was an error!', error);
});
}

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('getMarketCategoryName'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({users: data.data, all:data.data, loading:false });
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
  q.category_name.toLowerCase().indexOf(value.toLowerCase())  !== -1
   )});}

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
    if ( data.category_name) {
      this.props.adminAddMarketCategory(data);
    }
} 


render(){
  const {theme, savings} = this.props
  const {users, loading, data, datat, handleClose, handleOpen, search, open} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
          <CardActions>
              <Link to="/investment_tab">
                <Button
                color="secondary"
                variant="contained">
                Back
              </Button> 
              </Link>
          </CardActions>
        <div style={{height: '42px',alignItems: 'center',marginTop: theme.spacing(1)}}>
        <SearchInput
          value={search}
          onChange={this.searchChange}
          style={{marginRight: theme.spacing(1), width:300, float:'left'}}
          placeholder="Search user"
        />
         
       <div style={{float:'right'}}>
          {/* Modal */}
          
       < Dialog
        open={open}
        // TransitionComponent={Transition}
        fullWidth={true}
        maxWidth = {'xs'}
        keepMounted
        // value=""
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Category</DialogTitle>  
        <Divider />     
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description" > */}
          <CardContent className="content">
          <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid>
                <Typography>
                    Category Name
                </Typography>
              </Grid>
              <Grid>
                <TextField
                fullWidth
                // label="Category Name"
                placeholder="Category Name"
                margin="dense"
                name="category_name"
                onChange={this.handleChange}
                required
                value={data.category_name}
                variant="outlined"
              />
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
                  Add Category
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
      
      {/* Modal */}
      <div className="row">
        <span className="spacer" />
        {/* <Button className="exportButton">Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={()=>this.handleOpen()}
        >
          Add Categories
        </Button>
      </div>
       </div>
       
       </div>
       
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} loading={loading} submit={this.props.adminUpdateMarketCategory} />
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
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
  adminAddMarketCategory: adminActions.adminAddMarketCategory,
  adminUpdateMarketCategory: adminActions.adminUpdateMarketCategory,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(MarketCategory))
);