import React, { Component } from "react";
import { adminActions } from "../../../../redux/action";
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import swal from 'sweetalert'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';


class Password extends Component {
  constructor(props){
    super(props)
    var currentDate = new Date();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    let entry_date = currentDate.getFullYear() + "-" + month + "-" + day;
    this.state ={  
      data:{
        // invetment_type: '',
        old_password : "",
        new_password : "",
        password_confirmation : ""
      },
      open:false,
      show:false,
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

// handleSubmit(event) {
//   event.preventDefault();
//   const { data } = this.state;
//   console.log(data);
//     if ( data.old_password && data.new_password && data.password_confirmation) {
//       this.props.adminChangePassword(data);
//       console.log(data);

//     }
// }

handleSubmit = event => {
    event.preventDefault();
      const { data} = this.state;
    console.log(data)
      if (data.old_password && data.new_password && data.password_confirmation) {
        if(data.new_password == data.password_confirmation){
          this.props.adminChangePassword(data);
        //   console.log(data);
        }else{
          swal(
            `Password Not Match`
          );
        }
      }else{
        swal(
            `${"All fields are required"}`
        );
    }
  };

render(){
  const {theme, savings} = this.props
  const {data} = this.state
    return (
      <div>
        
        <Card
        >
        <form>
          <CardHeader
            subheader="Update password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Old Password"
              name="old_password"
              onChange={this.handleChange}
              type="password"
              value={data.old_password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              name="new_password"
              onChange={this.handleChange}
              style={{ marginTop: '1rem' }}
              type="password"
              value={data.new_password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm password"
              name="password_confirmation"
              onChange={this.handleChange}
              style={{ marginTop: '1rem' }}
              type="password"
              value={data.password_confirmation}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <CardActions>
            {savings &&
                <div className="loader">   
                    <img img alt=""  src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                </div>
            }
            <Button
              color="primary"
              variant="outlined"
              type="submit"
              onClick={this.handleSubmit}
            >
              Update
            </Button>
          </CardActions>
        </form>
        </Card>
        
      </div>
    
    );
  };
}
  

// function mapState(state) {
//     const { savings } = state.savings;
//     return { savings };
//   }
  
//   const actionCreators = {
//     adminChangePassword: adminActions.adminChangePassword,
//   };

// export default ChangePassword;
function mapState(state) {
    const { savings } = state.savings;
    return { savings };
  }
  const actionCreators = {
    saveWallet: adminActions.saveWallet,
    logout: adminActions.logout,
    adminChangePassword: adminActions.adminChangePassword,
    adminAddHalalNews: adminActions.adminAddHalalNews,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(Password))
  );