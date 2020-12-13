import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700,
    fontSize:15
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 58,
    width: 58
  },
  icon: {
    height: 42,
    width: 42
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

const TotalInvestment = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
       
      className={clsx(classes.root, className)}
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
              REGULAR SAVINGS
            </Typography>
            <Typography variant="h1">₦24,000</Typography>
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

TotalInvestment.propTypes = {
  className: PropTypes.string
};

export default TotalInvestment;
