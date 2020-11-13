import { AppBar, Tab, Tabs } from '@material-ui/core'
import React from 'react'


function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  

const CustomTab = ({value, handleChange})=> {
    return (
        <AppBar position="static" style={{background:"#ffffff"}}>
          <Tabs value={value} onChange={handleChange} center aria-label="simple tabs example" 
            color="black" indicatorColor="primary" textColor="primary">
            <Tab label="Pending Withdrawal" {...a11yProps(0)} />
            <Tab label="Approved Withdrawal" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
    )
}
export default CustomTab