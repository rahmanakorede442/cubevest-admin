import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { adminActions } from "../../redux/action";
import { connect } from "react-redux";
import validate from 'validate.js';
import log_banner from '../../assets/log_banner.png';
import { makeStyles } from '@material-ui/styles';
// import theme from '../../../../theme';
import {
  Grid,
  Button,
  Modal,
  TextField,
  Card,
  Link,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
  CardContent
} from '@material-ui/core';
import swal from 'sweetalert';
// import { data } from 'views/Dashboard/components/LatestSales/chart';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  code: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 7
    }
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.default,
    backgroundImage: `url(${log_banner})`,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '80%',
    display: 'flex',
    width: '80%',
    margin:'auto',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  // logoImage: {
  //   marginLeft: theme.spacing(4)
  // },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 70,
    paddingRight: 70,
    // marginTop:0,
    paddingBottom: 120,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    textAlign:"center",
    color: "Green"
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(4)
  },
  signInButton: {
    margin: theme.spacing(4, 0),
    backgroundColor: "Green",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    color:'white'
  }
}));

const SignIn = props => {

  const classes = useStyles();

  const [modal, setModal] = useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    var email = formState.values.email;
    var password = formState.values.password;
    if(email && password ){
      props.validateLogin(email, password)
    }
    setModal(true)
  };

  const handleSubmitValidate =(event)=>{
    event.preventDefault();
    var email = formState.values.email;
    var password = formState.values.password;
    var code = formState.values.code;
    if(code && email && password){
      props.adminlogin({email, password, code})
    }else{
      swal({
        icon: "warning",
        text: "All fields are required",
    })
    }
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
        justify="center" 
        direction="row"
      >
        <Grid
          className={classes.content}
          item
          lg={6}
          xs={12}
          md={12}
        >
          <Card className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Admin Login
                </Typography>
               
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  // disabled={!props.loggingIn}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {props.loggingIn ?"Loading...": "Sign in now"}
                </Button>
                <Grid item lg={12} md={12} sm={12} xs={12} className=" mb-4" style={{textAlign:"center"}}>                
                  <Link
                    component={RouterLink}
                    to="/forget_password"
                    variant="h6"
                  >
                   Forgot password?
                  </Link>
              </Grid>
              </form>
            </div>
          </Card>
        </Grid>
      </Grid>
      {/* Modal */}
      <Dialog
        open={modal}
        fullWidth={true}
        maxWidth = {'xs'} 
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle bold id="alert-dialog-slide-title">Input OTP </DialogTitle>  
        <Divider />
        <DialogContent>
          <form onSubmit={handleSubmitValidate}>
            <CardContent className="content">
              <TextField
                className={classes.textField}
                error={hasError('code')}
                fullWidth
                helperText={
                  hasError('code') ? formState.errors.code[1] : null
                }
                label="Enter OTP"
                name="code"
                onChange={handleChange}
                disabled={props.loggingIn}
                type="text"
                value={formState.values.code || ''}
                variant="outlined"
              />
            </CardContent>            
            <Divider /> 
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                disabled={props.loggingIn}
                color="primary"
                style={{marginLeft:8}}
                >
                {props.loggingIn ?"Loading...": "Validate Token"}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* Modal */}
    </div>
  );
};

function mapState(state) {
  const { loggingIn, user } = state.authentication;
  return { loggingIn, user };
}

const actionCreators = {
  adminlogin: adminActions.adminlogin,
  validateLogin: adminActions.validateLogin,
};

const connectedSignIn = connect(mapState, actionCreators)(SignIn);
export { connectedSignIn as SignIn };