import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Loan from '../../Loan';
import LoanApproved from '../../Loan/LoanApproved';

function TabPanel(props) {
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

TabPanel.propTypes = {
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
            <Tab label="Awaiting Loans" {...a11yProps(0)} />
            <Tab label="Approved Loans" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <Loan />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <LoanApproved/>           
        </TabPanel>
      </div>
    );
  }
  