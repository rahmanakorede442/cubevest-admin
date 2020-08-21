import React, { Component } from 'react'
import SimpleTabs from '../components/Tabs/TabsPanel'
import { adminActions } from "../../../redux/action";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Sidebar from '../../components/Sidebar/sidebar';
// import Topbar from '../../components/Header/topbar';

class SavingsTab extends Component {
    render() {
        return (
            <div>
                {/* <Topbar /> */}
                {/* <div class="wrapper">
                    <Sidebar /> */}
                    <SimpleTabs />
                {/* </div> */}
            </div>
        )
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
  }
  
  const actionCreators = {
    saveWallet: adminActions.saveWallet,
    logout: adminActions.logout,
  };
  
  
//   const connectedSavingsTab = connect(mapState, actionCreators)(SavingsTab);
//   export { connectedSavingsTab as SavingsTab };
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(SavingsTab))
  );