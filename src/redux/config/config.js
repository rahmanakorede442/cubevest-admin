
import { history } from '../logic';
const serverVars = {
  // baseUrl:"http://142.93.152.229/test/api/",
  baseUrl: "https://api.cubevest.com/api/",
  validateLogin:"admin/validate_login",
  adminlogin:"admin/login",
  adminsignup: "admin/signup",
  resetPass: "admin/adminResetPassword",
  recoverPassword: "admin/adminRecoverPassword",
  adminChangePassword: "admin/adminChangePassword?token=",
  disableUsers: "disableUsers/",
  enableUsers: "enableUsers/",
  getAllUsers: "getAllUsers?token=",
  autoSearchUsers:"admin/search_users?token=",
  allUserPackages:"admin/fetch_user_packages?token=",
  getAllDashboard: "getAllDashboard?token=",
  getAdminShow:  "admin/adminShow?token=",
  // all regular savings
  getAllTargetSavings:"allTargetsAdmin?token=",
  adminShowAllCommission:"adminShowAllCommission?token=",

  // all regular savings
  getSingleUserDetails:"singleUserDetails/",
  regularSavingsTransactionsAdmin:"regularSavingsTransactionsAdmin/",
  infinitoSavingsTransactionsAdmin:"infinitoSavingsTransactionsAdmin/",
  saveLoanTransactionsAdmin:"saveLoanTransactionsAdmin/",
  targetTransactionsAdmin:"targetTransactionsAdmin/",

  // all save to loan savings
  getAllSaveToLoanSavings:"saveLoanAdmin?token=",
  
  // all regular savings
  getAllRegularSavings:"regularSavingsAdmin?token=",

  addHalalCategory:"save_halai_category/store?token=",
  updateHalalCategory:"save_halai_category/update/", // id needed
  getHalalCategory: "showHalaiCategoryAdmin?token=",
  adminAddHalal: "save_halai/store",//save halal
  updateHalalInvestment: "halai/update/", //id needed
  getHalalInvestment: "showHalaiInvestments?token=",
  getHalalCategoryName: "showHalaiCategories?token=",
  addHalalNews: "save_halai_news/store?token=",
  updateHalalNews: "save_halai_news/update/", // id needed
  getHalalNews: "show_halai_news?token=",
  getHalalNewsType: "showHalaiType?token=",
  regularSavingsSearchAdmin: "regularSavingsSearchAdmin/B2?token=",
  addMarketCategory: "save_category/store?token=",
  showSingleCategory: "showSingleCategory/",
  showSingleMarketNews: "showSingleMarketNews/",
  showSingleHalaiNews: "showSingleHalaiNews/",
  showSingleHalaiCategory: "showSingleHalaiCategory/",
  deleteCategory: "deleteCategory/",
  deleteMarketNews: "deleteMarketNews/",
  deleteTargetCommission: "deleteTargetCommission/",
  deleteHalaiNews: "deleteHalaiNews/",
  deleteHalaiCategory: "deleteHalaiCategory/",
  updateMarketCategory:"save_category/update/", // id needed
  getMarketCategory: "showMarketCategoryAdmin?token=",
  adminAddMarket: "save_investment/store?token=", // save market
  updateMarketView: "market_place/update/", // id needed
  showMarketInvestments: "showMarketInvestments?token=",
  showHalaiInvestments: "showHalaiInvestments?token=",
  getMarketView: "getMarketView/",
  getMarketCategoryName:  "showMarketCategoryAdmin?token=",
  getMarketCategoryType: "showMarketCategories?token=",
  getHalalCategoryType: "showHalaiCategories?token=",
  addMarketNews: "save_news/store?token=",
  addAdmin: "admin/addAdmin?token=",
  getSingleAdmin: "admin/fetchSingleAdmin/",
  updateMarketNews: "save_news/update/", //id needed
  updateAdmin: "admin/updateAdmin/", //id needed
  disableAdmin: "admin/adminDisabled/", //id needed
  enableAdmin: "admin/adminEnabled/", //id needed
  transactions: "transaction?token=",
  savingsData: "adminDashboardPieChart?token=",
  histogramData: "adminDashboardhistogram?token=",
  getMarketNews: "show_market_news?token=",
  getMarketNewsType: "showMarketType?token=",
  modifyTargetCommission:'modifyTargetCommission/',
  singleTargetCommission: "singleTargetCommission/",
  addTargetCommission: "addTargetCommission?token=",
  getLoansForApproval: "adminLoansForApproval?token=",
  getAllGuarantor:"adminViewAllGuarantorsPerLoan/",
  getAllMarketInvestor:"allInvestmentsAdmin?token=",
  getAllHalalInvestor:"allHalaiInvestmentsAdmin?token=",
  getAllApprovedLoan:"adminAllUsersDatAvCollectedLoans?token=",
  adminUpdateHalal:"halai/update/",
  adminUpdateMarket:"market_place/update/",
  adminApproveLoans:"adminApproveLoans",
  singleHalalInvestment:"singleHalalInvestment/",
  singleMarketInvestment:"singleMarketInvestment/",
  hideOrShowMarketInvestment:"adminHideShowInvestment/",
  hideOrShowHalalInvestment:"adminHideShowHalai/",
  walletHistory:"wallet_history?token=",
  walletBalance:"wallet_balances?token=",
  walletBalanceDetails:"admin_wallet_balance_details/",
  getAllInfinitoSavings:"infinitoSavingsAdmin?token=",
  addUserPort:"add_port_no/",
  getWithdrawal:"view_withdrawal_lists?token=",
  makeWithdrawal:"admin_make_bank_transfers?token=",
  activitiesLog:"show_activity?token=",
  deleteActivities:"delete_activity_logs?token=",
  transactionLogs:"display_paystack_transactions",
  multipleTransaction:"admin/post_transactions?token=",

  // export api's
  exportUser:"fetchAllUsers",
  exportTransactions:"fetchAllTransaction"
};

export const numberFormat = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value);

export const payID = () => {
  return "pk_test_d96f199a0651f1162b81c56256d5842372b845f2";
};

export const checkToken = ()=>{
  let token =  JSON.parse(localStorage.getItem('admin'));
  console.log(token)
    if (token == null) {
        history.push('sign-in');
      }
}

export function getConfig(apiName) {
  let user = JSON.parse(localStorage.getItem("admin"));
  if ((apiName != 'adminlogin') && user == null) {
    if(apiName !== 'validateLogin'){
      if(apiName != "adminsignup"){
        if(apiName != "recoverpass"){
          history.push('/sign-in');
          return
        }
      }
    }
    
  }
  switch (apiName) {
    case "validateLogin":
      return serverVars.baseUrl + serverVars.validateLogin;
    case "adminlogin":
      return serverVars.baseUrl + serverVars.adminlogin;
    case "recoverpass":
      return serverVars.baseUrl + serverVars.recoverpass;
    case "resetPass":
      return serverVars.baseUrl + serverVars.resetPass +user.token;      
    case "recoverPassword":
      return serverVars.baseUrl + serverVars.recoverPassword;
    case "adminChangePassword":
      return serverVars.baseUrl + serverVars.adminChangePassword +user.token;
    case "adminsignup":
      return serverVars.baseUrl + serverVars.adminsignup;
      // all users
    case "getAllRegularSavings":
      return serverVars.baseUrl + serverVars.getAllRegularSavings;
    case "getAllSaveToLoanSavings":
      return serverVars.baseUrl + serverVars.getAllSaveToLoanSavings;
    case "getAllTargetSavings":
      return serverVars.baseUrl + serverVars.getAllTargetSavings;
    case "adminShowAllCommission":
      return serverVars.baseUrl + serverVars.adminShowAllCommission;
    case "getSingleUserDetails":
      return serverVars.baseUrl + serverVars.getSingleUserDetails;
    case "regularSavingsTransactionsAdmin":
      return serverVars.baseUrl + serverVars.regularSavingsTransactionsAdmin;
    case "infinitoSavingsTransactionsAdmin":
      return serverVars.baseUrl + serverVars.infinitoSavingsTransactionsAdmin;
    case "saveLoanTransactionsAdmin":
      return serverVars.baseUrl + serverVars.saveLoanTransactionsAdmin;
    case "targetTransactionsAdmin":
      return serverVars.baseUrl + serverVars.targetTransactionsAdmin;
    case "getAllUsers":
      return serverVars.baseUrl + serverVars.getAllUsers;
    case "getAdminShow":
      return serverVars.baseUrl + serverVars.getAdminShow;
    case "getAllDashboard":
      return serverVars.baseUrl + serverVars.getAllDashboard;
    // Halal api
    case "addHalalCategory":
      return serverVars.baseUrl + serverVars.addHalalCategory +user.token;
    case "adminAddHalal":
      return serverVars.baseUrl + serverVars.adminAddHalal;
    case "updateHalalInvestment":
      return serverVars.baseUrl + serverVars.updateHalalInvestment;
    case "getHalalCategory":
      return serverVars.baseUrl + serverVars.getHalalCategory +user.token;
    case "getHalalInvestment":
      return serverVars.baseUrl + serverVars.getHalalInvestment +user.token;
    case "getHalalCategoryName":
      return serverVars.baseUrl + serverVars.getHalalCategoryNam +user.token;
    case "addHalalNews":
      return serverVars.baseUrl + serverVars.addHalalNews +user.token;
    case "updateHalalNews":
      return serverVars.baseUrl + serverVars.updateHalalNews;
    case "getHalalNews":
      return serverVars.baseUrl + serverVars.getHalalNews +user.token;
    case "getHalalNewsType":
      return serverVars.baseUrl + serverVars.getHalalNewsType +user.token;
      case "regularSavingsSearchAdmin":
        return serverVars.baseUrl + serverVars.regularSavingsSearchAdmin +user.token;
  
      // market api 
    case "addMarketCategory":
      return serverVars.baseUrl + serverVars.addMarketCategory +user.token;
    case "updateMarketCategory":
      return serverVars.baseUrl + serverVars.updateMarketCategory;
    case "updateHalalCategory":
      return serverVars.baseUrl + serverVars.updateHalalCategory;
    case "showSingleCategory":
      return serverVars.baseUrl + serverVars.showSingleCategory;
    case "showSingleMarketNews":
      return serverVars.baseUrl + serverVars.showSingleMarketNews;
    case "showSingleHalaiNews":
      return serverVars.baseUrl + serverVars.showSingleHalaiNews;
    case "showSingleHalaiCategory":
      return serverVars.baseUrl + serverVars.showSingleHalaiCategory;
    case "disableUsers":
      return serverVars.baseUrl + serverVars.disableUsers;
    case "enableUsers":
      return serverVars.baseUrl + serverVars.enableUsers;
    case "deleteCategory":
      return serverVars.baseUrl + serverVars.deleteCategory;
    case "deleteHalaiCategory":
      return serverVars.baseUrl + serverVars.deleteHalaiCategory; 
    case "deleteMarketNews":
      return serverVars.baseUrl + serverVars.deleteMarketNews;
    case "deleteHalaiNews":
      return serverVars.baseUrl + serverVars.deleteHalaiNews;      
    case "deleteTargetCommission":
      return serverVars.baseUrl + serverVars.deleteTargetCommission;  
    case "adminAddMarket":
      return serverVars.baseUrl + serverVars.adminAddMarket +user.token;
    case "updateMarketView":
      return serverVars.baseUrl + serverVars.updateMarketView;
    case "getMarketCategory":
      return serverVars.baseUrl + serverVars.getMarketCategory +user.token;
    case "getMarketView":
      return serverVars.baseUrl + serverVars.getMarketView +user.token;
    case "showMarketInvestments":
      return serverVars.baseUrl + serverVars.showMarketInvestments +user.token;
    case "showHalaiInvestments":
      return serverVars.baseUrl + serverVars.showHalaiInvestments +user.token;
    case "getMarketCategoryName":
      return serverVars.baseUrl + serverVars.getMarketCategoryName +user.token;
    case "addMarketNews":
      return serverVars.baseUrl + serverVars.addMarketNews +user.token;
    case "addAdmin":
      return serverVars.baseUrl + serverVars.addAdmin +user.token;
    case "addTargetCommission":
      return serverVars.baseUrl + serverVars.addTargetCommission +user.token;
    case "updateMarketNews":
      return serverVars.baseUrl + serverVars.updateMarketNews;
    case "updateAdmin":
      return serverVars.baseUrl + serverVars.updateAdmin;
    case "disableAdmin":
      return serverVars.baseUrl + serverVars.disableAdmin;
    case "enableAdmin":
      return serverVars.baseUrl + serverVars.enableAdmin;
    case "transactions":
      return serverVars.baseUrl + serverVars.transactions + user.token;
    case "savingsData":
      return serverVars.baseUrl + serverVars.savingsData + user.token;
    case "histogramData":
      return serverVars.baseUrl + serverVars.histogramData + user.token;
    case "modifyTargetCommission":
      return serverVars.baseUrl + serverVars.modifyTargetCommission;
    case "getMarketNews":
      return serverVars.baseUrl + serverVars.getMarketNews +user.token;
    case "getMarketNewsType":
      return serverVars.baseUrl + serverVars.getMarketNewsType +user.token;
    case "getSingleAdmin":
      return serverVars.baseUrl + serverVars.getSingleAdmin;
    // case "getSingleAdmin":
    //   return serverVars.baseUrl + serverVars.getSingleAdmin +user.token;
    case "singleTargetCommission":
      return serverVars.baseUrl + serverVars.singleTargetCommission;
    case "getLoansForApproval":
      return serverVars.baseUrl + serverVars.getLoansForApproval;
    case "getAllGuarantor":
      return serverVars.baseUrl + serverVars.getAllGuarantor;
    case "getAllMarketInvestor":
      return serverVars.baseUrl + serverVars.getAllMarketInvestor + user.token;
    case "getAllHalalInvestor":
      return serverVars.baseUrl + serverVars.getAllHalalInvestor + user.token;
    case "getMarketCategoryType":
      return serverVars.baseUrl + serverVars.getMarketCategoryType + user.token;
    case "getHalalCategoryType":
      return serverVars.baseUrl + serverVars.getHalalCategoryType + user.token;
    case "getAllApprovedLoan":
      return serverVars.baseUrl + serverVars.getAllApprovedLoan + user.token;
    case "adminUpdateHalal":
      return serverVars.baseUrl + serverVars.adminUpdateHalal;
    case "adminUpdateMarket":
      return serverVars.baseUrl + serverVars.adminUpdateMarket;
    case "adminApproveLoans":
      return serverVars.baseUrl + serverVars.adminApproveLoans;
    case "singleHalalInvestment":
      return serverVars.baseUrl + serverVars.singleHalalInvestment;
    case "singleMarketInvestment":
      return serverVars.baseUrl + serverVars.singleMarketInvestment;
    case "hideOrShowHalalInvestment":
      return serverVars.baseUrl + serverVars.hideOrShowHalalInvestment;
    case "hideOrShowMarketInvestment":
      return serverVars.baseUrl + serverVars.hideOrShowMarketInvestment;
    case "walletHistory":
      return serverVars.baseUrl + serverVars.walletHistory + user.token;
    case "walletBalance":
      return serverVars.baseUrl + serverVars.walletBalance + user.token;
    case "walletBalanceDetails":
      return serverVars.baseUrl + serverVars.walletBalanceDetails;
    case "getAllInfinitoSavings":
      return serverVars.baseUrl + serverVars.getAllInfinitoSavings;
    case "addUserPort":
      return serverVars.baseUrl + serverVars.addUserPort;
    case "getWithdrawal":
      return serverVars.baseUrl + serverVars.getWithdrawal;
    case "makeWithdrawal":
      return serverVars.baseUrl + serverVars.makeWithdrawal;
    case "activitiesLog":
      return serverVars.baseUrl + serverVars.activitiesLog+ user.token; 
    case "deleteActivities":
      return serverVars.baseUrl + serverVars.deleteActivities+ user.token;
    case "transactionLogs":
      return serverVars.baseUrl + serverVars.transactionLogs
    case "autoSearchUsers":
      return serverVars.baseUrl + serverVars.autoSearchUsers+ user.token
    case "allUserPackages":
      return serverVars.baseUrl + serverVars.allUserPackages+ user.token
    case "multipleTransaction":
      return serverVars.baseUrl + serverVars.multipleTransaction+ user.token
    case "exportUser":
      return serverVars.baseUrl + serverVars.exportUser
    case "exportTransactions":
      return serverVars.baseUrl + serverVars.exportTransactions
    default:
      return null;
  }
}
