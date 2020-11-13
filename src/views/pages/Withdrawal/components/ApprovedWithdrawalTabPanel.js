import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import CustomTab from './CustomTab';
import CustomTabPanels from './CustomTabPanels';
import PendingWithdrawal from '../PendingWithdrawal';
import ApprovedWithdrawal from '../ApprovedWithdrawal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const [opened, setOpened] = React.useState(false);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <div className={classes.root} style={{alignItems:"center"}}>
        <div class="wrapper">
        <div class="main_content">
        <CustomTab value={value} handleChange={handleChange}/>
        <CustomTabPanels value={value} index={0}>
          <PendingWithdrawal />
        </CustomTabPanels>
        <CustomTabPanels value={value} index={1}>
          <ApprovedWithdrawal />
        </CustomTabPanels>
        </div>
      </div>
      </div>
    );
  }
  