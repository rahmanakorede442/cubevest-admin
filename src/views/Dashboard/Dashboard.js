import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../redux/config/config'
import { authHeader, history } from '../../redux/logic';
import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  TotalInvestment,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  TotalRegular,
  LatestOrders,
  Savings,
  Target,
  Regular,
} from './components';
import WalletBalance from './components/WalletBalance';
// import TotalInvestment from './components/TotalRegular';

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={
        count_users: 0,
        savings_balance: 0,
        save_loans:0,
        target_balance:0,
        market_balance:0,
        halal_balance:0,
        wallet_balance:0,
        loading:true,
        all: [],
        search: "",
        open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchUsers();
  }

  fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  fetch(getConfig('getAllDashboard'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({count_users: data[0], savings_balance:data[1], save_loans:data[2],
       target_balance:data[3],market_balance:data[4],halal_balance:data[5], wallet_balance:data[6], loading:false });
})
.catch(error => {
 
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
    console.error('There was an error!', error);
});
}
render(){
  const {theme} = this.props
  const {count_users,savings_balance,save_loans,target_balance,wallet_balance,market_balance,halal_balance} = this.state
  return (
    <div style={{padding: theme.spacing(4)}}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={12}
        >
          <Budget count_users={count_users}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={12}
        >
          <Regular savings_balance={numberFormat(savings_balance)}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={12}
        >
          <Savings save_loans={numberFormat(save_loans)}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={12}
        >
          <Target target_balance={numberFormat(target_balance)}/>
        </Grid>
        <Grid
          item
          lg={3}
          sm={4}
          xl={3}
          xs={12}
        >
          <WalletBalance wallet_balance={numberFormat(wallet_balance)}/>
        </Grid>
        <Grid
          item
          lg={4}
          sm={4}
          xl={3}
          xs={12}
        >
          <TotalUsers market_balance={numberFormat(market_balance)}/>
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalInvestment halal_balance={numberFormat(halal_balance)}/>
        </Grid>
        {/* //  <Grid
        //   item
        //   lg={3}
        //   sm={6}
        //   xl={3}
        //   xs={12}
        // >
        //   <TotalRegular />
        // </Grid>  */}
         
         <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};
}
  
// export default UserList;
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Dashboard))
);
