import React, { Component } from 'react'
import SimpleTabs from '../components/Tabs/HalalTabsPanel'
import { adminActions } from "../../../redux/action";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Sidebar from '../../components/Sidebar/sidebar';
// import Topbar from '../../components/Header/topbar';

class HalalTab extends Component {
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
  
  
//   const connectedLoanTab = connect(mapState, actionCreators)(HalalTab);
//   export { connectedLoanTab as HalalTab };
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(HalalTab))
  );