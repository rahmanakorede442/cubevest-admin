
import { history } from '../logic';
const serverVars = {
  baseUrl: "https://api.cubevest.com/",
  adminlogin:"api/admin/login",
  authUrl: "api/auth/login",
  adminsignup: "api/admin/signup",
  resetPass: "api/admin/adminResetPassword",
  recoverPassword: "api/admin/adminRecoverPassword",
  adminChangePassword: "api/admin/adminChangePassword?token=",
  disableUsers: "api/disableUsers/",
  enableUsers: "api/enableUsers/",
  getAllUsers: "api/getAllUsers?token=",
  getAllDashboard: "api/getAllDashboard?token=",

  // all regular savings
  getAllTargetSavings:"api/allTargetsAdmin?token=",
  adminShowAllCommission:"api/adminShowAllCommission?token=",

   // all regular savings
   getSingleUserDetails:"api/singleUserDetails/",
   regularSavingsTransactionsAdmin:"api/regularSavingsTransactionsAdmin/",
   saveLoanTransactionsAdmin:"api/saveLoanTransactionsAdmin/",
   targetTransactionsAdmin:"api/targetTransactionsAdmin/",

  // all save to loan savings
  getAllSaveToLoanSavings:"api/saveLoanAdmin?token=",
  
  // all regular savings
  getAllRegularSavings:"api/regularSavingsAdmin?token=",

  addHalalCategory:"api/save_halai_category/store?token=",
  updateHalalCategory:"api/save_halai_category/update/", // id needed
  getHalalCategory: "api/showHalaiCategoryAdmin?token=",
  addHalalInvestment: "api/save_halai/store?token=",
  updateHalalInvestment: "api/halai/update/", //id needed
  getHalalInvestment: "api/showHalaiInvestments?token=",
  getHalalCategoryName: "api/showHalaiCategories?token=",
  addHalalNews: "api/save_halai_news/store?token=",
  updateHalalNews: "api/save_halai_news/update/", // id needed
  getHalalNews: "api/show_halai_news?token=",
  getHalalNewsType: "api/showHalaiType?token=",
  regularSavingsSearchAdmin: "api/regularSavingsSearchAdmin/B2?token=",
  addMarketCategory: "api/save_category/store?token=",
  showSingleCategory: "api/showSingleCategory/",
  showSingleMarketNews: "api/showSingleMarketNews/",
  showSingleHalaiNews: "api/showSingleHalaiNews/",
  showSingleHalaiCategory: "api/showSingleHalaiCategory/",
  deleteCategory: "api/deleteCategory/",
  deleteMarketNews: "api/deleteMarketNews/",
  deleteTargetCommission: "api/deleteTargetCommission/",
  deleteHalaiNews: "api/deleteHalaiNews/",
  deleteHalaiCategory: "api/deleteHalaiCategory/",
  updateMarketCategory:"api/save_category/update/", // id needed
  getMarketCategory: "api/showMarketCategoryAdmin?token=",
  addMarketView: "api/save_investment/store?token=",
  updateMarketView: "api/market_place/update/", // id needed
  showMarketInvestments: "api/showMarketInvestments?token=",
  showHalaiInvestments: "api/showHalaiInvestments?token=",
  getMarketView: "api/getMarketView/",
  getMarketCategoryName:  "api/showMarketCategoryAdmin?token=",
  // getMarketCategoryName: "api/showMarketCategories?token=",
  addMarketNews: "api/save_news/store?token=",
  updateMarketNews: "api/save_news/update/", //id needed
  getMarketNews: "api/show_market_news?token=",
  getMarketNewsType: "api/showMarketType?token=",
  modifyTargetCommission:'api/modifyTargetCommission/',
  singleTargetCommission: "api/singleTargetCommission/",
  addTargetCommission: "api/addTargetCommission?token=",
  getLoansForApproval: "api/adminLoansForApproval?token=",
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
        history.push('/admin/login');
      }
}

export function getConfig(apiName) {
  let user = JSON.parse(localStorage.getItem("admin"));
  if ((apiName != 'adminlogin') && user == null) {
    if(apiName != "adminsignup"){
      if(apiName != "recoverpass"){
        history.push('/admin/login');
        return
      }
    }
    
  }
  switch (apiName) {
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
    case "saveLoanTransactionsAdmin":
      return serverVars.baseUrl + serverVars.saveLoanTransactionsAdmin;
    case "targetTransactionsAdmin":
      return serverVars.baseUrl + serverVars.targetTransactionsAdmin;
    case "getAllUsers":
      return serverVars.baseUrl + serverVars.getAllUsers;
    case "getAllDashboard":
      return serverVars.baseUrl + serverVars.getAllDashboard;
    // Halal api
    case "addHalalCategory":
      return serverVars.baseUrl + serverVars.addHalalCategory +user.token;
    case "addHalalInvestment":
      return serverVars.baseUrl + serverVars.addHalalInvestment +user.token;
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
    case "addMarketView":
      return serverVars.baseUrl + serverVars.addMarketView +user.token;
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
    case "addTargetCommission":
      return serverVars.baseUrl + serverVars.addTargetCommission +user.token;
    case "updateMarketNews":
      return serverVars.baseUrl + serverVars.updateMarketNews;
    case "modifyTargetCommission":
      return serverVars.baseUrl + serverVars.modifyTargetCommission;
    case "getMarketNews":
      return serverVars.baseUrl + serverVars.getMarketNews +user.token;
    case "getMarketNewsType":
      return serverVars.baseUrl + serverVars.getMarketNewsType +user.token;
    case "singleTargetCommission":
      return serverVars.baseUrl + serverVars.singleTargetCommission;
    case "getLoansForApproval":
      return serverVars.baseUrl + serverVars.getLoansForApproval;
    default:
      return null;
  }
}
