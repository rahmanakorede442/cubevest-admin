import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Icon } from '@material-ui/core';

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
  const { className, loading, icons, name, colors, count_users, ...rest } = props;

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} elevation={6}>
      <CardContent>
        <Avatar style={{ backgroundColor:colors, height: 40, width: 40}}>
            {icons}
        </Avatar>
        <Typography variant="h5" style={{marginTop:10}} >
          {name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          variant="body2">
          {count_users}
        </Typography>
      </CardContent>
    </Card>
  );
};

Budget.propTypes = {
  className: PropTypes.string
};

export default Budget;
