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
    backgroundColor: theme.palette.default,
    backgroundColor:"#22591d",
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

const Savings = props => {
  const { className,save_loans, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
       
      className={clsx(classes.root, className)}
      // style={{backgroundColor:"#22591d"}}
       elevation={6}
    >
      <CardContent>
        <Grid
          container
          // justify="space-between"
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Total Save to Loan
            </Typography>
            <Typography variant="h2" 
            // style={{color:'#fff'}}
            >{save_loans}
            </Typography>
          </Grid>
          
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

Savings.propTypes = {
  className: PropTypes.string
};

export default Savings;
