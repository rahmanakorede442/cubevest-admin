import React, { Component } from 'react'
import AwaitingLoanTabPanel from '../../../components/Tabs/AwaitingLoanTabPanel'
// import { adminActions } from "../../../redux/action";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

class AwaitingLoanTab extends Component {
    render() {
        return (
            <div>
              <AwaitingLoanTabPanel />
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
    // saveWallet: adminActions.saveWallet,
    // logout: adminActions.logout,
  };
  
  export default withStyles({}, { withTheme: true })(
    withRouter(connect(mapState,  actionCreators)(AwaitingLoanTab))
  );