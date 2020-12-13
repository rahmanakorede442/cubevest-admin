import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.default
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
    backgroundColor:"#7446f2",
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

const TotalUsers = props => {
  const { className,market_balance, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
       
      className={clsx(classes.root, className)}
      // style={{}} 
      elevation={6}
    >
      <CardContent>
        <Grid
          container
          // justify="space-between"
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShoppingCartIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item style={{paddingLeft:5}}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Total Market Investment
            </Typography>
            <Typography variant="h2" 
            // style={{color:'#fff',}}
            >
              {market_balance}
            </Typography>
          </Grid>
          
        </Grid>
        {/* <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            16%
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

TotalUsers.propTypes = {
  className: PropTypes.string
};

export default TotalUsers;
