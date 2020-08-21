import React, { useState, useEffect, Component } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { adminActions } from "../../action";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import theme from '../../../../theme';
import validate from 'validate.js'
import Lottie from 'react-lottie';
import BluePreloader from "../../../../assets/lotties/19451-blue-preloader.json";
import { getConfig, checkToken, numberFormat } from '../../config/config'
import { authHeader, history } from '../../logic';
import dummymale from '../../../../assets/img/dummy-male.jpg';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Input,
  Paper
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Sidebar from '../../components/Sidebar';

class AddHalal extends Component {
  constructor(props){
    super(props)
    this.uploadedImage = React.createRef();
    this.imageUploader = React.createRef() ;
    this.state = {
      data:{
        expected_returns : "120000",
        current_values : "100000",
        maturity_date :"2020-09-23",
        unit_type : 5,
        investment_type : "Cattle Sharing",
        start_date : "2020-03-23",
        payout_type : "Wallet",
        insurance_partner : "Paysmosmo Insurance Plc",
        investment_category : "Agriculture",
        investment_pic: null,
        
      },
      image:dummymale,
      categories:[],
      loading: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchCategory = this.fetchCategory.bind(this);
    this.handleProfileImage = this.handleProfileImage.bind(this)
    this.handleClick = this.handleClick.bind(this);

    this.fetchCategory()
  }

fetchCategory = ()=>{
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getMarketCategoryName"), requestOptions)
  .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading:false});
          return Promise.reject(error);
      }
      this.setState({categories:  data, loading:false})
  })
      .catch(error => {
      if (error === "Unauthorized") {
          history.push('/admin/login');
         }
      this.setState({loading:false});
      console.error('There was an error!', error);
  });
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
    if (data.current_values && data.unit_type && data.maturity_date && data.start_date && data.expected_returns && data.insurance_partner && data.investment_pic) {
      // console.log(data);
      
      const fd = new FormData();
        fd.append("investment_pic", data.investment_pic); 
        fd.append("expected_returns", data.expected_returns);
        fd.append("current_values", data.current_values);
        fd.append("maturity_date", data.maturity_date);
        fd.append("unit_type", data.unit_type);
        fd.append("investment_type", data.investment_type);
        fd.append("start_date", data.start_date);
        fd.append("payout_type", data.payout_type);
        fd.append("insurance_partner", data.insurance_partner);
        fd.append("investment_category", data.investment_category);
        console.log(data.investment_pic);
      this.props.adminAddHalal(fd);
    }
} 
handleProfileImage(e){
  const [file, name] = e.target.files;
  const {data} = this.state
  if(file){
      const reader = new FileReader();
      const { current } = this.uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file); 
      this.setState({data:{...data, investment_pic: e.target.files[0]}})
  }
  
}

handleClick(e) {
  this.imageUploader.current.click();
}
  render() {
    const currencies = [
      {value: 'Bank Payment ', label: 'Bank Payment', },
      {value: 'Wallet', label: 'Wallet',}
    ];
    const {data, image, categories} = this.state
    const { savings  } = this.props;
    return (
      <div>
        <Sidebar />
        <Paper style={{marginTop:100}} >
        <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container justify="flex-end" alignItems="flex-end" >
                <Grid item md={10} xs={10}> 
                  <Typography variant="h6">Input All Value correctly to add new Investment</Typography>
                </Grid>
                <Grid item md={10} xs={10}>
                <img src={data.investment_pic ? data.investment_pic:image} ref={this.uploadedImage} alt="" className="profile_pix" onClick={this.handleClick}/>
                <input className="sea" 
                    name="investment_pic" 
                    type="file" 
                    accept="image/*" 
                    multiple="false" 
                    onChange={this.handleProfileImage} 
                    ref={this.imageUploader}
                    style={{display:"none"}}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="unit_type" type="number" style={{width: 500, marginTop:10}}  placeholder="No of Unit"  value={data.unit_type} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="expected_returns" type="number" style={{width: 500, marginTop:10}}  placeholder="Expected Returns" value={data.expected_returns} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="current_values" type="number" style={{width: 500, marginTop:10}}  placeholder="Current Values" value={data.current_values} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="insurance_partner" type="text" style={{width: 500, marginTop:10}}  placeholder="Insurance Partner" value={data.insurance_partner} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="investment_type" type="text" style={{width: 500, marginTop:10}}  placeholder="Investment Type" value={data.investment_type} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="start_date" type="date" style={{width: 500, marginTop:10}}  placeholder="Start Date" value={data.start_date} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input name="maturity_date" type="date" style={{width: 500, marginTop:10}}  placeholder="Maturity Date" value={data.maturity_date} onChange={this.handleChange}/>
                </Grid>
                <Grid item md={10} xs={10}>
                <TextField
                  id="standard-select-currency"
                  select
                  label="Payout type"
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select Payout type"
                  name="payout_type" type="text" style={{width: 500, marginTop:10}}
                  value={data.payout_type} onChange={this.handleChange}
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                </Grid>
                <Grid item md={10} xs={10}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select Category"
                  name="investment_category" type="text" style={{width: 500, marginTop:10}}
                  value={data.investment_category} onChange={this.handleChange}
                >
                  {categories.map((option) => (
                    <option key={option.id} >
                      {option.category_name}
                    </option>
                  ))}
                </TextField>
                </Grid>
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
                  style={{marginBottom:10}}
                >
                  Add Investment
                </Button>
                </Grid>
              
          </Grid>
        </form>
        </Paper>
      </div>
    )
  }
}

function mapState(state) {
  const { savings } = state.savings;
    return { savings };
}

const actionCreators = {
  adminAddHalal: adminActions.adminAddHalal,
};

const connectedAddHalal = connect(mapState, actionCreators)(AddHalal);
export { connectedAddHalal as AddHalal };
