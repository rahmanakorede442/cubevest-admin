import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Button } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import { adminActions } from "../../../../redux/action";
import { withStyles } from "@material-ui/styles";
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PaymentIcon from '@material-ui/icons/Payment';
import MoneyIcon from '@material-ui/icons/Money';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { IconButton, Icon } from "@material-ui/core";
import { Profile, SidebarNav, UpgradePlan } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    },
    backgroundColor:"#4fa648"
  },
  root: {
    backgroundColor: '#4fa648',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, staticContext, logout, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <HomeIcon />
    },
    {
      title: 'Admin',
      href: '/admin',
      icon: <PeopleIcon />
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Savings',
      href: '/savings_tab',
      icon: <MoneyIcon />
    },
    {
      title: 'Withdrawals',
      href: '/pending-withdrawal',
      icon: <BusinessCenterIcon />
    },
    {
      title: 'Investment',
      href: '/investment_tab',
      icon: <BusinessCenterIcon />
    },
    {
      title: 'Loan',
      href: '/loan',
      icon: <MoneyIcon />
    },
    {
      title: 'Make Payment',
      href: '/payment',
      icon: <PaymentIcon />
    },
    {
      title: 'Transactions',
      href: '/transactions',
      icon: <PaymentIcon />
    },
    {
      title: 'Wallet',
      href: '/wallet',
      icon: <PaymentIcon />
    },
    {
      title: 'Activity Log',
      href: '/logs',
      icon: <AssignmentIcon />
    },
    
    {
      title: 'Transaction Log',
      href: '/transaction-logs',
      icon: <AssignmentIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
          <div className="px-4">
          <IconButton
              aria-label="Delete"
              className=""
              size="small"
              // onClick={this.handleSignOut}
            ></IconButton>
        <Button
          type="submit"
          startIcon={<PowerSettingsNewIcon />}
            variant="contained"
            variant="outlined" 
            size="small" 
            style={{marginTop:60, color:'#fff',borderColor:'#fff'}}
            onClick={props.logout}
          >
        Logout
        </Button>
        </div>
        {/* <UpgradePlan /> */}
      </div>     
    
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  logout: adminActions.logout,
};

export default withRouter(connect(mapState,  actionCreators)(Sidebar));
