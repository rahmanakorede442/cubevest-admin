import React, { Component } from 'react'
import SimpleTabs from '../components/Tabs/HalalTabsPanel'
// import { userActions } from '../../_actions';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { adminActions } from "../../../redux/action";

class MarketTab extends Component {
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
  
//   const actionCreators = {
//     getNotifications: userActions.getAll,
//     getUserDetails: userActions.getUserDetails,
//   };
export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(MarketTab))
  );
//   const connectedMarketTab = connect(mapState, actionCreators)(MarketTab);
//   export { connectedMarketTab as MarketTab };