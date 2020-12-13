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
  const classes = useStyles();

 
  return (
    <div>
    <Card
       
      className={clsx(classes.root, className)}
    >
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
          </div>
          <Avatar
            className={classes.avatar}
            src={users.profile_pic}
          />
        </div>        
      </CardContent>
    </Grid>
    <Divider />     
    </Card>
    </div>
  );
};

UserAccount.propTypes = {
  className: PropTypes.string
};

export default UserAccount;
