import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig } from '../../../redux/config/config'
import { authHeader} from '../../../redux/logic';
import { Grid, Button, TextField, Card, Typography, MenuItem, CircularProgress, Tooltip, IconButton} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import swal from 'sweetalert';
import DeleteIcon from '@material-ui/icons/Delete';

class Application extends Component {
  constructor(props){
    super(props)
    this.state ={
      data:[
        {
        product_id:"",
        user_id:"",
        amount:0,
        product_type:"",
        packages:[],
        product_name:""
      },],
      banks:[],
      users: [],
      packages:[],
      packages_name:[],
      all: [],
      search: "",
      loading: true,
      open:false,
      search:{term:""},
      total:0
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

fetchUsers = (search) =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(search),
    };
    fetch(getConfig('autoSearchUsers'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    this.setState({users: data});
})
.catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
       }
    this.setState({loading:false, err : "internet error" });
    console.error('There was an error!', error);
  });
}

fetchUsersPackage = (search, id, arr) =>{
  const {packages, data} = this.state
  const requestOptions = {
    method: 'POST',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(search),
  };
  fetch(getConfig('allUserPackages'), requestOptions)
  .then(async response => {
    const dat = await response.json();
    if (!response.ok) {
      const error = (dat && dat.message) || response.statusText;
      return Promise.reject(error);
    }
    // let arr = [...data]
    const index = data.findIndex((e,i)=>i === id)
    var packs = [];
    dat.products.forEach(prod => {
      if(prod.id !== 0){
        packs.push(prod.name)
      }
    });
    arr[index] = {...arr[index], packages:packs}
    this.setState({data:arr, all:dat.products});
  })
  .catch(error => {
    if (error === "Unauthorized") {
          this.props.logout()
      }
  });
}

handleChange(event, id) {
  const { name, value } = event.target;
  const { data, all } = this.state;
  const elementsIndex = data.findIndex((element, i) => i === id )
  let newArray = [...data]
  if(name === "products"){
    const d = all.find((dat, index)=> dat.name === value)
    console.log(d)
    newArray[elementsIndex] = {...newArray[elementsIndex], product_name:d.name, product_type: d.product_type, product_id: d.id }
  }else{
    newArray[elementsIndex] = {...newArray[elementsIndex], [name]: value}
  }
  this.setState({data: newArray});
}

handleSubmit(event) {
  event.preventDefault();
  const {data} = this.state
  console.log(data)
  if( data.length > 0){
    this.props.multipleTransaction({data})
  }else{
    swal("Atleast one transaction has to be filled")
  }
}

handleIncrement = () =>{
  const {data} = this.state
  this.setState({
    data:[...data, {
      product_id:"",
      product_type:"",
      user_id:"",
      amount:0,
      packages:[],
      product_name:""
    },]
  })
}
handleRemove = (id) =>{
  const {data} = this.state
  data.splice(id, 1)
  this.setState({
    data:data
  })
}

handleChangeUser = (event, values, id) =>{
  const {name, value } = event.target;
    const { data, users } = this.state;
    this.fetchUsers({term: value});
    let newArray = [...data];
    users.forEach(user => {
    if(values === user.first_name + " " + user.last_name){
      const elementsIndex = data.findIndex((element, i) => i === id)
      newArray[elementsIndex] = {...newArray[elementsIndex], user_id : user.id}
      // this.setState({data: newArray});
      this.fetchUsersPackage({user_id:user.id}, id, newArray);
    }
  });
}

render(){
  const style = {
    cards:{
      padding:10,
      margin:10
    },
    title: {
      marginTop: 5,
      marginBottom:25,
      textAlign:"center",
      color: "Green"
    }
  }
  const {theme} = this.props
  const {users, packages, data} = this.state
  
    return (
      <div style={{padding: theme.spacing(3)}}>
      <ValidatorForm onSubmit={this.handleSubmit} >
        <Card elevation={5} style={style.cards}>
          <Typography
            style={style.title}
            variant="h4">
            Multiple Payment Transaction 
          </Typography>
          {data.map((dat, index) =>(
          <Grid container spacing={2} key={index}>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                onChange={(event, value) => this.handleChangeUser(event, value, index)}
                options={users.map((option) =>option.first_name + " " + option.last_name )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(event, value) => this.handleChangeUser(event, value, index)}
                    label="Search users"
                    margin="normal"
                    variant="outlined"
                    InputProps={{ ...params.InputProps, type: 'search' }}
                  />
                )}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
                <TextValidator
                  label="Search input"
                  fullWidth
                  name="products"
                  margin="normal"
                  variant="outlined"
                  value={dat.product_name}
                  onChange={(e)=>this.handleChange(e, index)}
                  select>
                    {dat.packages.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextValidator>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
                <TextValidator
                  fullWidth
                  margin="normal"
                  helperText="Enter amount value"
                  label="Amount"
                  name="amount"
                  onChange={(e)=>this.handleChange(e, index)}
                  value={dat.amount}
                  type="number"
                  variant="outlined"
                  validators={[
                      "required"
                    ]}
                />
            </Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}>
              {index !== 0 &&
              <Tooltip title="Add News">
                <IconButton aria-label="Remove" onClick={()=>this.handleRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>}
              {/* // <Button margin="normal" type="button" variant="contained" color="primary"  >Remove</Button>} */}
            </Grid>
          </Grid>))}
          <Grid container direction="row" justify="space-between" alignItems="center">
              <Button variant="contained" type="button" color="secondary" onClick={this.handleIncrement} >Add New</Button>
              {this.props.savings && <CircularProgress />}
              <Button variant="contained" type="submit" color="primary">Submit</Button>
          </Grid>
        </Card>
      </ValidatorForm>
      </div>
  
    );
  };
}
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  multipleTransaction: adminActions.multipleTransaction,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Application))
);