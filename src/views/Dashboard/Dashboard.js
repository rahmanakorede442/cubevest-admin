import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { withRouter, Link } from "react-router-dom";
import { adminActions } from "../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig, checkToken, numberFormat } from '../../redux/config/config'
import { authHeader, history } from '../../redux/logic';
import {
  Budget,
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
import { TransactionTable } from 'views/pages/components/Table';
import MoneyIcon from '@material-ui/icons/Money';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// import TotalInvestment from './components/TotalRegular';

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state={
        transactions:[],
        savingsData:[],
        histogramSavings:"",
        histogramLoans:"",
        histogramMarkets:"",
        loans:[],
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
        open:false,
        loading:true
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchTransac = this.fetchTransac.bind(this);
    this.fetchLoanApproved = this.fetchLoanApproved.bind(this);
    
  }

componentDidMount(){
  const requestOptions = {
    method: 'GET',
    headers: { ...authHeader(), 'Content-Type': 'application/json' },
};
  this.fetchUsers(requestOptions);
  this.fetchLoanApproved(requestOptions)
  this.fetchTransac();
}

fetchUsers = (requestOptions) =>{
  fetch(getConfig('getAllDashboard'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    this.setState({count_users: data[0], savings_balance:data[1], save_loans:data[2],
       target_balance:data[3],market_balance:data[4],halal_balance:data[5], wallet_balance:data[6]});
})
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
});

fetch(getConfig('histogramData'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({histogramSavings: Object.values(data.month.savings), histogramLoans: Object.values(data.month.loan), histogramMarkets: Object.values(data.month.market) })
  })
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
});

fetch(getConfig('savingsData'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data)
    this.setState({savingsData: data});
})
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
});

}

fetchLoanApproved = (requestOptions)=>{
  fetch(getConfig('getAllApprovedLoan'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  console.log(data)
  if (data.success == false){
    this.setState({loans:[]});
  }else{
    this.setState({loans:data});
  }

})
.catch(error => {
  if (error === "Unauthorized") {
        this.props.logout()
     }
  this.setState({loading:false});
});
}

fetchTransac = () =>{
  const requestOptions = {
      method: 'POST',
      headers: { ...authHeader(), 'Content-Type': 'application/json' },
  };
  fetch(getConfig('transactions'), requestOptions)
  .then(async response => {
  const data = await response.json();
  if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
  }
  this.setState({transactions: data.data, loading:false});
})
.catch(error => {
  if (error === "Unauthorized") {
        this.props.logout()
     }
  this.setState({loading:false});
  console.error('There was an error!', error);
});
}
render(){
  const {theme} = this.props
  const {count_users,savings_balance, loading, transactions, histogramSavings, histogramLoans, histogramMarkets, loans, save_loans,target_balance,wallet_balance,market_balance,halal_balance, savingsData} = this.state
  return (
    <div style={{padding: theme.spacing(4)}}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Link to="/users">
            <Budget colors={"#4fa647"} icons={<SupervisorAccountIcon />} name={"Total Active Users"} count_users={count_users}/>
          </Link>
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Link to="/investment_tab/halal_tab">
            <Budget colors={"#22591d"} icons={<SupervisorAccountIcon />} name={"Total Investments"} count_users={halal_balance}/>
          </Link>
        </Grid>
        <Grid
          item
          lg={4}
          sm={6}
          xl={4}
          xs={12}
        >
          <Link to="/investment_tab">
            <Budget colors={"#7446f2"} icons={<SupervisorAccountIcon />} name={"Total Market Investment"} count_users={market_balance}/>
          </Link>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Link to="/savings_tab">
            <Budget colors={"#59153f"} icons={<SupervisorAccountIcon />} name={"Total Regular Savings"} count_users={numberFormat(savings_balance)}/>
          </Link>          
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Link to="/targetsavings_tab">
            <Budget colors={"#a64782"} icons={<SupervisorAccountIcon />} name={"Total Target Savings"} count_users={numberFormat(target_balance)}/>
          </Link>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Link to="/savetoloan_tab">
            <Budget colors={"#22591d"} icons={<MoneyIcon />} name={"Total Save to Loan"} count_users={numberFormat(save_loans)}/>
          </Link>
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Link to="/wallet">
            <Budget colors={"#4fa647"} icons={<MoneyIcon />} name={"Total Wallet"} count_users={numberFormat(wallet_balance)}/>
          </Link>
        </Grid>
         
         <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales savings={histogramSavings} loans={histogramLoans} markets={histogramMarkets} />
        </Grid>
        {savingsData.length == 0 ?
        <img
        style={{width:10, height:10, alignItems:"center"}}
        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />:
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice savingsData={savingsData}/>
        </Grid>}
        {loans.length != 0 && <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts loans={loans}/>
        </Grid>}
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders users={transactions} loading={loading}/>
        </Grid>
      </Grid>
    </div>
  );
};
}
  
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(Dashboard))
);
