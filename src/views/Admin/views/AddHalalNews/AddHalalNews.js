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
import { getConfig, checkToken, numberFormat } from '../../config/config'
import { authHeader, history } from '../../logic';

class AddHalalNews extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {
      data:{
        halai_investment : "",
        news : "",
        posted_date : entry_date
      },
      loading: true,
      investments:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchInvestment = this.fetchInvestment.bind(this);
    this.fetchInvestment()

  }

fetchInvestment = ()=>{
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig("getHalalNewsType"), requestOptions)
  .then(async response => {
      const data = await response.json();
      if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          this.setState({loading:false});
          return Promise.reject(error);
      }
      console.log(data)
      this.setState({investments:  data, loading:false})
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
    if ( data.halai_investment && data.news) {
      this.props.adminAddHalalNews(data);
    }
} 

  render() {
    const {data, investments} = this.state
    const { savings  } = this.props;
    return (
      <div>
        <Sidebar />
        <Paper style={{marginTop:100}} >
        <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container justify="flex-end" alignItems="flex-end" >
                <Grid item md={10} xs={10}> 
                  <Typography variant="h6">Add Latest News</Typography>
                </Grid>
                <Grid item md={10} xs={10}>
                <TextField
                  id="standard-select-currency-native"
                  select
                  SelectProps={{
                    native: true,
                  }}
                  helperText="Please select Investment Name"
                  name="halai_investment" 
                  type="text" 
                  style={{width: 500, marginTop:10}}
                  value={data.halai_investment} 
                  onChange={this.handleChange}
                >
                  {investments.map((option) => (
                    <option key={option.id} >
                      {option.investment_type}
                    </option>
                  ))}
                </TextField>
                </Grid>
                <Grid item md={10} xs={10}>
                <TextField
                  id="standard-multiline-flexible"
                  label="Latest News"
                  name="news" 
                  multiline
                  style={{width: 500, marginTop:10, marginBottom:10}}  
                  rowsMax={4}
                  value={data.news} 
                  onChange={this.handleChange}
                />
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
                  Add News
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
  adminAddHalalNews: adminActions.adminAddHalalNews,
};

const connectedAddHalalNews = connect(mapState, actionCreators)(AddHalalNews);
export { connectedAddHalalNews as AddHalalNews };
