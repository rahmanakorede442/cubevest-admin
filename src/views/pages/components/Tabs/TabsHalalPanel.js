import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
// import { RegularSavings } from '../';
// import { TargetSavings } from '../TargetSavings';
// import { SaveToLoanSavings } from '../SaveToLoanSavings';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { UsersToolbar, UsersTable } from './Savings';
import RegularSavings from '../../RegularSavings';
import TargetSavings from '../../TargetSavings';
import SaveToLoanSavings from '../../SaveToLoanSavings';

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
          <Typography>{children}</Typography>
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


export default function SimpleTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [opened, setOpened] = React.useState(false);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const togglemenu = (e) => {
        setOpened(!opened);
     }
    return (
      <div className={classes.root} style={{alignItems:"center"}}>
        {/* <Topbar onClick={togglemenu} back={true}/>   */}
        <div class="wrapper">
        {/* <Sidebar isOpened={opened}/> */}
        <div class="main_content">
        <AppBar position="static" style={{background:"#ffffff"}}>
          <Tabs value={value} onChange={handleChange} center aria-label="simple tabs example" 
            color="black" indicatorColor="primary" textColor="primary">
            <Tab label="Regular Savings" {...a11yProps(0)} />
            <Tab label="Target Savings" {...a11yProps(1)} />
            <Tab label="Save To Loan" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {/* <RegularSavings /> */}
          Table
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <TargetSavings /> */}
           New
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <SaveToLoanSavings /> */}
          React
        </TabPanel>
        </div>
      </div>
      </div>
    );
  }
  