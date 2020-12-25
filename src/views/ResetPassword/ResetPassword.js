import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { adminActions } from "../../redux/action";
import { connect } from "react-redux";
import validate from 'validate.js';
import log_banner from '../../assets/log_banner.png';
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert';
import { getConfig, checkToken, numberFormat } from '../../redux/config/config'
import { authHeader, history } from '../../redux/logic';
// import theme from '../../../../theme';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Card,
  Link,
  Typography
} from '@material-ui/core';

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
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
    height: 'auto',
    display: 'flex',
    width: '75%',
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
    paddingBottom: 70,
    flexBasis: 600,
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
  subTitle: {
    marginTop: theme.spacing(1),
    textAlign:"center"
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
    marginTop: theme.spacing(4),      
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ForgetPasswordButton: {
    margin: theme.spacing(4, 0),
    backgroundColor: "Green",    
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    color:'white'
  }
}));

const ResetPassword = props => {
  const { history } = props;

  const classes = useStyles();

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

  const [name,setName] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([]);

  const handleOpen = () => {
    setIsLoading(true)
    setOpen(true);
    let user = JSON.parse(localStorage.getItem('admin'));
    const id = this.props.match.params.id;
    const requestOptions = {
      method: 'GET',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
    fetch(getConfig('') + id + `?token=`+user.token, requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    setDetails(data[0])
    setIsLoading(false)
    setName(data[0])
    })
    .catch(error => {
    if (error === "Unauthorized") {
        history.push('/login');
        }
        setIsLoading(false)
    console.error('There was an error!', error);
  });
};

  const handleChanges = (e) => {
    e.persist();
     setDetails(details=>({ ...details, [e.target.name]:e.target.value}))
   }

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

  const handleForgetPassword = event => {
    event.preventDefault();
    var email = formState.values.email;
    if(email){
    props.resetpassword(email)
    }
  };
  
  const handleSubmits = (event) => {
    event.preventDefault();
    if (details.email && details.password && details.password_confirmation) {
      if(details.new_password == details.password_confirmation){
        this.props.adminChangePassword(details);
      //   console.log(details);
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
                onSubmit={handleSubmits}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Forgot Password
                </Typography>
                <Typography
                  className={classes.subTitle}
                >
                  {/* Enter your email to reset your password */}
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
                  onChange={handleChanges}
                  type="text"
                  value={details.email}
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
                  onChange={handleChanges}
                  type="password"
                  value={details.password}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password_confirmation')}
                  fullWidth
                  helperText={
                    hasError('password_confirmation') ? formState.errors.password_confirmation[0] : null
                  }
                  label="Confirm Password"
                  name="password_confirmation"
                  onChange={handleChanges}
                  type="text"
                  value={details.password_confirmation}
                  variant="outlined"
                />
                <Button
                  className={classes.ForgetPasswordButton}
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {props.loggingIn ?"Loading...": " Reset Password"}
                </Button>
                <Grid item lg={12} md={12} sm={12} xs={12} className=" mb-4" style={{textAlign:"center"}}>                
                  <Button><Link
                  style={{textDecoration:'none'}}
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                   Back to Signin?
                  </Link></Button>
              </Grid>
              </form>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

ResetPassword.propTypes = {
  history: PropTypes.object
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  resetpassword: adminActions.resetpassword,
};

const connectedResetPassword = connect(mapState, actionCreators)(ResetPassword);
export { connectedResetPassword as ResetPassword };