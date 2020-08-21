import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.default,
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    fontSize:15,
    // color: '#fff'
  },
  avatar: {
    backgroundColor:"#4fa647",
    height: 58,
    width: 58
  },
  icon: {
    height: 34,
    width: 34
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Budget = props => {
  const { className, loading, count_users, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
      // style={{backgroundColor:"#4fa647"}} 
      elevation={6}
    >
      <CardContent>
        <Grid
          container
          // justify="space-between"
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <SupervisorAccountIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Total Active Users 
            </Typography>
            <Typography variant="h2" 
            // style={{color:'#fff'}}
            >{count_users}</Typography>
          </Grid>
          {/* <Grid item>
            <Avatar className={classes.avatar}>
              <SupervisorAccountIcon className={classes.icon} />
            </Avatar>
          </Grid> */}
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowDownwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography>
        </div>
      */}
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
