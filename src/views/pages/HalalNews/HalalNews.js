import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { SearchInput } from 'components';

import { HalalUsersTable } from 'views/pages/components/News';
// import { UsersToolbar } from '../components/Savings';
import { Grid, Card, Button, Typography, TextField,
  CardContent, DialogTitle, DialogContent,
   DialogActions, Divider, Dialog, MenuItem, CardActions, CircularProgress } from '@material-ui/core';
import {Link } from "react-router-dom";


class HalalNews extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={  
      data:{
        // invetment_type: '',
        halai_investment : "",
        news : "",
        posted_date : entry_date
      },
      users: [],
      investments:[],
      all:[],
      search: "",
      open:false,
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
    // this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    // this.onChange = this.onChange.bind(this);

  }

fetchUsers = (search_term) =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({search_term: this.state.search})
    };
    fetch(getConfig('getHalalNews'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success === false){
      this.setState({users: [], all:[], loading:false });
    }else{
      this.setState({users: data.data, all:data, loading:false });
    }
  })
  .catch(error => {
    if (error === "Unauthorized") {
      this.props.logout()
    }
    this.setState({loading:false, err : "internet error" });
  });
}

componentDidMount() {
  this.fetchUsers("");
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('getHalalNewsType'), requestOptions)
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

searchChange(event) {
	const { name, value } = event.target;
	  this.setState({ search:value, loading:true},()=>{
	  this.fetchUsers()
	});
}

handleOpen= () =>{
  this.setState({open:true})
}

handleClose= () =>{
  this.setState({open:false})
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

handleSubmit(event) {
  event.preventDefault();
  const { data } = this.state;
  console.log(data);
    if ( data.halai_investment && data.news) {
      this.props.adminAddHalalNews(data);
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
  const {users, data, loading, all, search, open, investments} = this.state
    return (
      <div style={{padding: theme.spacing(3)}}>
        <CardActions>
          <Link to="/investment_tab/halal_tab">
            <Button
            color="secondary"
            variant="contained"
            >
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
            fullWidth={true}
            maxWidth = {'xs'}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle bold id="alert-dialog-slide-title">Add New Category</DialogTitle>  
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
                            value={data.halai_investment} 
                            onChange={this.handleChange}
                            SelectProps={{
                              native: true,
                            }}
                            helperText="Please select Investment Name"
                            name="halai_investment"                       
                          >
                            {this.state.investments.map((option) => (
                              <option key={option.id} 
                              value={option.investment_type}>
                                {option.investment_type}
                              </option>
                            ))}

                        </TextField>
                        </Grid><br/>
                        <Grid>
                          <label>Market New</label>
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
                  {savings &&<CircularProgress />}
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
       </div>
      <div style={{marginTop: theme.spacing(2)}}>
        <HalalUsersTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} investments={investments} />
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
  adminAddHalalNews: adminActions.adminAddHalalNews,
  adminUpdateHalalNews: adminActions.adminUpdateHalalNews,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(HalalNews))
);