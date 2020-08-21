import React, { Component } from "react";
import { adminActions } from "../../redux/action";
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../redux/config/config'
import { authHeader, history } from '../../redux/logic';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import swal from 'sweetalert';
import { Notifications, Password, UsersTable } from './components';
import {
  DialogActions,
  DialogContent,
  Typography,
  CardContent,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { SearchInput } from "components";


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

class Settings extends Component {
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
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

fetchUsers = () =>{
  const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('adminShowAllCommission'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  this.setState({users: data, loading:false });
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
  if ( data.commission && data.package_name) {
    this.props.addTargetCommission(data);
  }
} 

render(){
  const {theme, savings} = this.props
  const {search,data,users,open} = this.state
    return (
      <div style={{padding: theme.spacing(4)}}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
          <Notifications />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Password />
        </Grid>

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
        <DialogTitle bold id="alert-dialog-slide-title">Add Commission</DialogTitle>  
        <Divider />     
        <DialogContent>
        <CardContent className="content">
            <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid >
                    <Grid>
                      <label>Select Package Name</label>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        value={data.package_name} 
                        onChange={this.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                        helperText="Please select Package Name"
                        name="package_name"                       
                      >
                          <option> </option>
                          <option>Target Savings</option>
                          <option>table</option>

                    </TextField>
                    </Grid><br/>
                    <Grid>
                      <label>Commission</label>
                    <OutlinedInput
                      fullWidth
                      placeholder="Commission"
                      name="commission"
                      type="number"
                      endAdornment={<InputAdornment position="end" style={{fontWeight:'bold',fontSize:28}}>%</InputAdornment>}
                      margin="dense"
                      value={data.commission} 
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
                  Add Commission
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
        <Button
          color="primary"
          variant="contained"
          onClick={()=>this.handleOpen()}
        >
          Add Commission
        </Button>
      </div>
       </div>
       
       </div>
       </Grid>

        <Grid
          item
          md={12}
          xs={12}
        >
          <UsersTable users={users}/>
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
    // adminChangePassword: adminActions.adminChangePassword,
    addTargetCommission: adminActions.addTargetCommission,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(Settings))
  );