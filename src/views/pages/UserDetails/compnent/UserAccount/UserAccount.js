import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import swal from 'sweetalert'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2),
    color:"#fff"
  }
}));

const UserAccount = props => {
  const { className, loading, users, ...rest } = props;
console.log(users)
  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };

  // const handleDelete = (users,id) => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //   .then((willDelete) => {
  //     if (willDelete) {
  //       props.disableUsers(users,id);
  //       swal("Loading...",{   
  //         buttons:false
  //       });
  //     }
  //   });
  //   }

  return (
    <div>
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
    {/* {loading? <Typography>Loading...</Typography>: */}
    <Grid>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h3"
            >
              {users.first_name + " " + " " + users.last_name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {users.address}
            </Typography>
            {/* <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              ({user.timezone})
            </Typography> */}
          </div>
          <Avatar
            className={classes.avatar}
            src={users.profile_pic}
          />
        </div>        
      </CardContent>
    {/* } */}
    </Grid>
    
      <Divider />     
    </Card>
     {/* <Grid style={{display:'flex'}}>
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
                {users.user_status !=0 ?
                <Button
                  style={{background:'red', color:'white'}}
                  // color="secondary"
                  variant="contained"
                  // onClick={()=>this.exitSavings(user.id)}
                  onClick={()=> handleDelete(users.id)}
                  >
                  Disable
                </Button> :
                <Button
                  style={{color:'white',background:'blue'}}
                  // color="secondary"
                  variant="contained"
                  // onClick={()=>this.exitSavings(user.id)}
                  onClick={()=>this.handleDelete(users.id)}
                  >
                  Enable
                </Button>
                }
              </CardActions>
              </Grid>
            */}
    </div>
  );
};

UserAccount.propTypes = {
  className: PropTypes.string
};

export default UserAccount;
