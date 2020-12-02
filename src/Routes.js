import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Loan as LoanView,
  AwaitingLoanTab as AwaitingLoanTabView,
  ApprovedLoanTab as ApprovedLoanTabView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  ForgetPassword as ForgetPasswordView,
  ResetPassword as ResetPasswordView,
  NotFound as NotFoundView,
  SavingsTab as SavingsTabView,
  TargetTab as TargetTabView,
  LoanTab as LoanTabView,
  MarketTab as MarketTabView,
  HalalTab as HalalTabView,
  RegularSavings as RegularSavingsView,
  TargetSavings as TargetSavingsView,
  SaveToLoanSavings as SaveToLoanSavingsView,
  MarketPlace as MarketPlaceView,
  Report as ReportView,
  Investment as InvestmentView,
  UserLists as UserListsView,
  UserDetails as UserDetailsView,
  RegularTranscationDetails as RegularTranscationDetailsView,
  SaveToLoanDetails as SaveToLoanDetailsView,
  TargetDetails as TargetDetailsView,
  MarketCategory as MarketCategoryView,
  HalalCategory as HalalCategoryView,
  MarketNews as MarketNewsView,
  HalalNews as HalalNewsView,
  MarketInvestment as MarketInvestmentView,
  HalalInvestment as HalalInvestmentView,
  Transactions as TransactionsView,
  Log as LogView,
  Admin as AdminView,
  PendingWithdrawalTab as PendingWithdrawalTabView,
  ApprovedWithdrawalTab as ApprovedWithdrawalTabView,
  WalletBalance as WalletBalanceView,
  WalletHistory as WalletHistoryView,
  WalletBalanceDetails as WalletBalanceDetailsView,
  WalletBalanceDetails,
  ApprovedWithdrawalTab,
} from './views';
import MarketTab  from "../src/views/pages/MarketPlace/index";


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={RegularSavingsView}
        exact
        layout={MainLayout}
        path="/regular-savings"
      />
      <RouteWithLayout
        component={TargetSavingsView}
        exact
        layout={MainLayout}
        path="/target-savings"
      />
      <RouteWithLayout
        component={SavingsTabView}
        exact
        layout={MainLayout}
        path="/savings_tab"
      />
      <RouteWithLayout
        component={HalalTabView}
        exact
        layout={MainLayout}
        path="/investment_tab/halal_tab"
      />
      <RouteWithLayout
        component={MarketTabView}
        exact
        layout={MainLayout}
        path="/investment_tab"
      />
      <RouteWithLayout
        component={ApprovedWithdrawalTabView}
        exact
        layout={MainLayout}
        path="/approved-withdrawal"
      />
      <RouteWithLayout
        component={PendingWithdrawalTabView}
        exact
        layout={MainLayout}
        path="/pending-withdrawal"
      />
      <RouteWithLayout
        component={LoanTabView}
        exact
        layout={MainLayout}
        path="/savetoloan_tab"
      />
      <RouteWithLayout
        component={TargetTabView}
        exact
        layout={MainLayout}
        path="/targetsavings_tab"
      />
      <RouteWithLayout
        component={SaveToLoanSavingsView}
        exact
        layout={MainLayout}
        path="/save-to-loan-savings"
      />
      <RouteWithLayout
        component={MarketPlaceView}
        exact
        layout={MainLayout}
        path="/market-place"
      />  
      <RouteWithLayout
        component={MarketTab}
        exact
        layout={MainLayout}
        path="/market_tab"
      />
      <RouteWithLayout
        component={WalletBalanceView}
        exact
        layout={MainLayout}
        path="/wallet"
      />
      <RouteWithLayout
        component={WalletHistoryView}
        exact
        layout={MainLayout}
        path="/wallet-history"
      />
      <RouteWithLayout
        component={WalletBalanceDetails}
        exact
        layout={MainLayout}
        path="/walletBalanceDetails/:id"
      />
      <RouteWithLayout
        component={UserListsView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AwaitingLoanTabView}
        exact
        layout={MainLayout}
        path="/loan"
      />
      <RouteWithLayout
        component={ApprovedLoanTabView}
        exact
        layout={MainLayout}
        path="/loan-approved"
      />
      <RouteWithLayout
        component={ReportView}
        exact
        layout={MainLayout}
        path="/report"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={UserDetailsView}
        exact
        layout={MainLayout}
        path="/userdetails/:id"
      />
       <RouteWithLayout
        component={RegularTranscationDetailsView}
        exact
        layout={MainLayout}
        path="/regulardetails/:id"
      />
      <RouteWithLayout
        component={SaveToLoanDetailsView}
        exact
        layout={MainLayout}
        path="/savetoloan_details/:id"
      />
      <RouteWithLayout
        component={TargetDetailsView}
        exact
        layout={MainLayout}
        path="/target_details/:id"
      />
      <RouteWithLayout
        component={MarketNewsView}
        exact
        layout={MainLayout}
        path="/market_news"
      /> 
      <RouteWithLayout
        component={HalalNewsView}
        exact
        layout={MainLayout}
        path="/halal_news"
      /> 
      <RouteWithLayout
        component={AdminView}
        exact
        layout={MainLayout}
        path="/admin"
      /> 
      <RouteWithLayout
        component={TransactionsView}
        exact
        layout={MainLayout}
        path="/transactions"
      />            
      <RouteWithLayout
        component={LogView}
        exact
        layout={MainLayout}
        path="/logs"
      />
      <RouteWithLayout
        component={MarketInvestmentView}
        exact
        layout={MainLayout}
        path="/market_investment"
      /> 
      <RouteWithLayout
        component={HalalInvestmentView}
        exact
        layout={MainLayout}
        path="/halal_investment"
      /> 
      <RouteWithLayout
        component={MarketCategoryView}
        exact
        layout={MainLayout}
        path="/market_categories"
      /> 
      <RouteWithLayout
        component={HalalCategoryView}
        exact
        layout={MainLayout}
        path="/halal_categories"
      />       
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ForgetPasswordView}
        exact
        layout={MinimalLayout}
        path="/forget_password"
      />
      <RouteWithLayout
        component={ResetPasswordView}
        exact
        layout={MinimalLayout}
        path="/reset_password/:id"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
