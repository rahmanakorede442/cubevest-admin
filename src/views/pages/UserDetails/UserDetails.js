import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { Grid, Dialog, Button, TextField, DialogContent, CardContent, DialogTitle, Divider, DialogActions, CardActions, Typography, CircularProgress } from '@material-ui/core';
import UserAccount from './compnent/UserAccount/UserAccount';
import swal from 'sweetalert'

import UserProfile from './compnent/UserAccount/UserProfile';

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
      id,
      data:{
        id,
        port_no:"",
        member_id:""
      }
    }
    this.handleEnable = this.handleEnable.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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


handleDecline = () => {
  const id = this.props.match.params.id;
  swal({
    title: "Are you sure?",
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

handleSubmit = () => {
  // const id = this.props.match.params.id;
  const {data} =this.state
  swal({
    title: "Press ok to continue",
    icon: "success",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
  if (willDelete) {
    this.props.addUserPort(data);
    swal("Loading...",{   
      buttons:false
    });
  }
});
}

handleOpen = () =>{
  this.setState({open:true})
}

handleClose = () =>{
  this.setState({open:false })
}

handleChange = (event) =>{
  const {name, value} = event.target
  const {data} = this.state
  this.setState({data:{...data, [name]: value}})
}

render(){
  const ports = [1,2,3,4,5,6,7,8,9,10]
  const {theme} = this.props
  const {users, bank, loading, data, open, id} = this.state
    return (
      <div style={{padding: theme.spacing(3)}}>
    
    {loading?
      <div style={{marginTop:150, display:"flex", alignItems:"center", flexDirection:"column", justifyItems:"center"}}>
          <CircularProgress />
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
                    onClick={()=>this.handleDecline()}>Disable
                  </Button> :
                  <Button
                    style={{color:'white',background:'blue'}}
                    variant="contained"
                  onClick={()=>this.handleEnable()}>Enable
                  </Button>
                  }
                  <Button
                    style={{color:'white',background:'blue'}}
                    variant="contained"
                  onClick={()=>this.handleOpen()}>Update
                  </Button>
                </CardActions>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Typography variant="h6">Savings Account</Typography>
                  <div className="py-5" />
                  <Link to={`/regulardetails/${id}`}><Button style={{width:"100%"}} variant="outlined">Regular Savings</Button></Link>
                  {/* <Link to={`/target_details/${users.id}`}><Button style={{width:"100%"}} variant="outlined">Target Savings</Button></Link> */}
                  <Link to={`/savetoloan_details/${id}`}><Button style={{width:"100%"}} variant="outlined">Save To Loan</Button></Link>
                  <Link to={`/infinito_details/${id}`}><Button style={{width:"100%"}} variant="outlined">Infinito Savings</Button></Link>
                  <Typography variant="h6">Investments Account</Typography>
                  <Link to="/"><Button style={{width:"100%"}} variant="outlined">Market Investment</Button></Link>
                  <Link to="/"><Button style={{width:"100%"}} variant="outlined">Halal Investment</Button></Link>
                  <Typography variant="h6">Loans</Typography>
                  <Link to="/loan"><Button style={{width:"100%"}} variant="outlined">Loans</Button></Link>
                  <Typography variant="h6">Wallet</Typography>
                  <Link to="/wallet"><Button style={{width:"100%"}} variant="outlined">Wallet</Button></Link>
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
        <DialogTitle id="alert-dialog-slide-title">Add User Port</DialogTitle>  
        <Divider />     
        <DialogContent>
          <CardContent className="content">
            <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Grid >
                    <Grid>
                    <label>Choose Port number</label>
                    <TextField
                        fullWidth
                        select
                        variant="outlined"
                        value={data.port_no}
                        name="port_no"
                        onChange={this.handleChange}
                        SelectProps={{
                          native: true,
                        }}
                    >
                        <option >select port</option>
                        {ports.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                    </TextField>
                    </Grid><br/>
                    <Grid>
                    <label>Change Member Id</label>
                    <TextField
                      fullWidth
                      placeholder="Category Name"
                      name="member_id"
                      type="text"
                      value={data.member_id} 
                      onChange={this.handleChange}
                      variant="outlined"
                      helperText="Enter Member Id"
                    />
                  </Grid>                   
              </Grid>
            </form>
            </CardContent>              
          {/* </DialogContentText> */}
          <Divider /> 
        <DialogActions>
          <Grid item md={10} xs={10}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{marginLeft:8}}
              onClick={this.handleSubmit}>
              Add Port
            </Button>
            </Grid> 
            <Button onClick={this.handleClose} 
              variant="contained"
              style={{color:'white', marginRight:8, backgroundColor:'red'}}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      {/* Modal */}
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
  addUserPort: adminActions.addUserPort,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(UserDetails))
);