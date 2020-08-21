import React, { Component } from 'react'
import SimpleTabs from '../components/Tabs/MarketTabPanel'
import { adminActions } from "../../../redux/action";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// import Sidebar from '../../components/Sidebar/sidebar';
// import Topbar from '../../components/Header/topbar';

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
  
  
//   const connectedLoanTab = connect(mapState, actionCreators)(MarketTab);
//   export { connectedLoanTab as MarketTab };
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(MarketTab))
  );