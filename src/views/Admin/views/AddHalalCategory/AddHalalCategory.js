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

class AddHalalCategory extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state = {
      data:{
        category_name : "",
        entry_date: entry_date,
      },
      loading: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
    if ( data.category_name) {
      this.props.adminAddHalalCategory(data);
    }
} 

  render() {
    const {data} = this.state
    const { savings  } = this.props;
    return (
      <div>
        <Sidebar />
        <Paper style={{marginTop:100}} >
        <form  noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Grid container justify="flex-end" alignItems="flex-end" >
                <Grid item md={10} xs={10}> 
                  <Typography variant="h6">Add New Category</Typography>
                </Grid>
                <Grid item md={10} xs={10}> 
                  <input 
                  name="category_name" 
                  type="text" 
                  style={{width: 500, marginTop:10, marginBottom:10}}  
                  placeholder="Category Name" 
                  value={data.category_name} 
                  onChange={this.handleChange}/>
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
                  Add Category
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
  adminAddHalalCategory: adminActions.adminAddHalalCategory,
};

const connectedAddHalalCategory = connect(mapState, actionCreators)(AddHalalCategory);
export { connectedAddHalalCategory as AddHalalCategory };
