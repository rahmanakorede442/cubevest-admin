
import { history } from '../logic';
const serverVars = {
  baseUrl:"http://142.93.152.229/test/api/",
  // baseUrl: "https://api.cubevest.com/api/",
  validateLogin:"admin/validate_login",
  adminlogin:"admin/login",
  adminsignup: "admin/signup",
  resetPass: "admin/adminResetPassword",
  recoverPassword: "admin/adminRecoverPassword",
  adminChangePassword: "admin/adminChangePassword?token=",
  disableUsers: "admin/disableUsers/",
  enableUsers: "admin/enableUsers/",
  getAllUsers: "admin/getAllUsers?token=",
  autoSearchUsers:"admin/search_users?token=",
  allUserPackages:"admin/fetch_user_packages?token=",
  getAllDashboard: "admin/getAllDashboard?token=",
  getAdminShow:  "admin/adminShow?token=",
  // all regular savings
  getAllTargetSavings:"admin/allTargetsAdmin?token=",
  adminShowAllCommission:"admin/adminShowAllCommission?token=",

  // all regular savings
  getSingleUserDetails:"admin/singleUserDetails/",
  regularSavingsTransactionsAdmin:"admin/regularSavingsTransactionsAdmin/",
  infinitoSavingsTransactionsAdmin:"admin/infinitoSavingsTransactionsAdmin/",
  saveLoanTransactionsAdmin:"admin/saveLoanTransactionsAdmin/",
  targetTransactionsAdmin:"admin/targetTransactionsAdmin/",

  // all save to loan savings
  getAllSaveToLoanSavings:"admin/saveLoanAdmin?token=",
  
  // all regular savings
  getAllRegularSavings:"admin/regularSavingsAdmin?token=",

  getHalalCategory: "admin/showHalaiCategoryAdmin?token=",
  regularSavingsSearchAdmin: "admin/regularSavingsSearchAdmin/B2?token=",
  getHalalInvestment: "admin/showHalaiInvestments?token=",
  addHalalCategory:"admin/save_halai_category/store?token=",
  updateHalalCategory:"admin/save_halai_category/update/", // id needed
  adminAddHalal: "admin/save_halai/store",//admin/save halal
  updateHalalInvestment: "admin/halai/update/", //id needed
  getHalalCategoryName: "admin/showHalaiCategories?token=",
  addHalalNews: "admin/save_halai_news/store?token=",
  updateHalalNews: "admin/save_halai_news/update/", // id needed
  getHalalNews: "admin/show_halai_news?token=",
  getHalalNewsType: "admin/showHalaiType?token=",
  addMarketCategory: "admin/save_category/store?token=",
  showSingleCategory: "admin/showSingleCategory/",
  showSingleMarketNews: "admin/showSingleMarketNews/",
  showSingleHalaiNews: "admin/showSingleHalaiNews/",
  showSingleHalaiCategory: "admin/showSingleHalaiCategory/",
  deleteCategory: "admin/deleteCategory/",
  deleteMarketNews: "admin/deleteMarketNews/",
  deleteHalaiNews: "admin/deleteHalaiNews/",
  deleteHalaiCategory: "admin/deleteHalaiCategory/",
  updateMarketCategory:"admin/save_category/update/", // id needed
  getMarketCategory: "admin/showMarketCategoryAdmin?token=",
  adminAddMarket: "admin/save_investment/store?token=", // admin/save market
  updateMarketView: "admin/market_place/update/", // id needed
  getMarketView: "admin/getMarketView/",
  getMarketCategoryName:  "admin/showMarketCategoryAdmin?token=",
  getMarketCategoryType: "admin/showMarketCategories?token=",
  getHalalCategoryType: "admin/showHalaiCategories?token=",
  addMarketNews: "admin/save_news/store?token=",
  getMarketNews: "admin/show_market_news?token=",
  getMarketNewsType: "admin/showMarketType?token=",
  updateMarketNews: "admin/save_news/update/", //id needed
  adminUpdateHalal:"admin/halai/update/",
  adminUpdateMarket:"admin/market_place/update/",
  adminApproveLoans:"adminApproveLoans",
  singleHalalInvestment:"admin/singleHalalInvestment/",
  singleMarketInvestment:"admin/singleMarketInvestment/",
  deleteTargetCommission: "admin/deleteTargetCommission/",
  showMarketInvestments: "admin/showMarketInvestments?token=",
  showHalaiInvestments: "admin/showHalaiInvestments?token=",
  addAdmin: "admin/addAdmin?token=",
  getSingleAdmin: "admin/fetchSingleAdmin/",
  updateAdmin: "admin/updateAdmin/", //id needed
  disableAdmin: "admin/adminDisabled/", //id needed
  enableAdmin: "admin/adminEnabled/", //id needed
  transactions: "admin/transaction?token=",
  savingsData: "admin/adminDashboardPieChart?token=",
  histogramData: "admin/adminDashboardhistogram?token=",
  modifyTargetCommission:'admin/modifyTargetCommission/',
  singleTargetCommission: "admin/singleTargetCommission/",
  addTargetCommission: "admin/addTargetCommission?token=",
  getLoansForApproval: "admin/adminLoansForApproval?token=",
  getAllGuarantor:"admin/adminViewAllGuarantorsPerLoan/",
  getAllMarketInvestor:"admin/allInvestmentsAdmin?token=",
  getAllHalalInvestor:"admin/allHalaiInvestmentsAdmin?token=",
  getAllApprovedLoan:"admin/adminAllUsersDatAvCollectedLoans?token=",
  hideOrShowMarketInvestment:"admin/adminHideShowInvestment/",
  hideOrShowHalalInvestment:"admin/adminHideShowHalai/",
  walletHistory:"admin/wallet_history?token=",
  walletBalance:"admin/wallet_balances?token=",
  walletBalanceDetails:"admin/admin_wallet_balance_details/",
  getAllInfinitoSavings:"admin/infinitoSavingsAdmin?token=",
  addUserPort:"admin/add_port_no/",
  getWithdrawal:"admin/view_withdrawal_lists?token=",
  makeWithdrawal:"admin/admin_make_bank_transfers?token=",
  activitiesLog:"admin/show_activity?token=",
  deleteActivities:"admin/delete_activity_logs?token=",
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
    if (token == null) {
        history.push('sign-in');
      }
}

export function getConfig(apiName) {
  let user = JSON.parse(localStorage.getItem("admin"));
  if ((apiName != 'adminlogin') && user == null) {
    if(apiName !== 'validateLogin'){
      if(apiName != "adminsignup"){
        if(apiName != "recoverPassword"){
          if(apiName != "resetPass"){
            history.push('/sign-in');
            return
          }
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
      return serverVars.baseUrl + serverVars.resetPass;
    case "recoverPassword":
      return serverVars.baseUrl + serverVars.recoverPassword;
    case "adminChangePassword":
      return serverVars.baseUrl + serverVars.adminChangePassword;
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
