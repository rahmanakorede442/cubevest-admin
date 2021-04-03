import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WalletBalance from 'views/pages/Wallet/components/WalletBalanceTab';
import WalletHistory from 'views/pages/Wallet/components/WalletHistoryTab';
// import { WalletHistory } from 'views/pages/Wallet';

function WalletHistoryTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

WalletHistoryTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function SimpleTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const [opened, setOpened] = React.useState(false);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const togglemenu = (e) => {
        setOpened(!opened);
     }
    return (
      <div className={classes.root} style={{alignItems:"center"}}>
        <AppBar position="static" style={{background:"#ffffff"}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" 
            color="black" indicatorColor="primary" textColor="primary">
            <Tab label="Wallet Balance" {...a11yProps(0)} />
            <Tab label="Wallet History" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <WalletHistoryTabPanel value={value} index={0}>
          <WalletBalance />
        </WalletHistoryTabPanel>
        <WalletHistoryTabPanel value={value} index={1}>
          <WalletHistory/>           
        </WalletHistoryTabPanel>
      </div>
    );
  }
  