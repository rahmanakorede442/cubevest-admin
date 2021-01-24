import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

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
    // color:'#fff'
  },
  avatar: {
    backgroundColor:"#59153f",
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

const Regular = props => {
  const { className,savings_balance, ...rest } = props;

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={6} >
      <CardContent>
        <Grid container>
          <Grid item lg={4} md={4} sm={4} xs={4}>
            <Avatar style={{ backgroundColor:"#22591d", height: 40, width: 40}}>
              <MoneyIcon className={classes.icon}/>
            </Avatar>
          </Grid>
          <Grid item lg={8} md={8} sm={8} xs={8}>
           <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
                Total Regular Savings
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h5" >
              {savings_balance}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Regular.propTypes = {
  className: PropTypes.string
};

export default Regular;
