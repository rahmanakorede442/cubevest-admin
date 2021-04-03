import { userConstants } from "../_constants";
import { adminService } from "../service/admin.service";
import { alertActions } from "./";
import { history } from "../logic";

export const adminActions = {
  validateLogin,
  adminlogin,
  logout,
  adminregister,
  lostpassword,
  resetpassword,
  disableUsers,
  enableUsers,
  recoverPassword,
  adminChangePassword,
  adminAddMarket,
  adminUpdateMarketCategory,
  adminUpdateMarketNews,
  updateAdmin,
  disableAdmin,
  enableAdmin,
  modifyTargetCommission,
  adminUpdateHalalNews,
  regularSavingsTransactionsAdmin,
  targetTransactionsAdmin,
  saveLoanTransactionsAdmin,
  adminUpdateHalalCategory,
  admindeleteCategory,
  admindeleteMarketNews,
  deleteTargetCommission,
  admindeleteHalalNews,
  admindeleteHalaiCategory,
  adminAddMarketCategory,
  adminAddHalalCategory,
  adminAddHalal,
  adminUpdateMarket,
  adminUpdateHalal,
  adminAddHalalNews,
  addAdmin,
  adminAddMarketNews,
  addTargetCommission,
  adminApproveLoans,
  hideOrShowMarketInvestment,
  hideOrShowHalalInvestment,
  addUserPort,
  makeWithdrawal,
  deleteActivities,
  multipleTransaction
  };

function validateLogin(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    adminService.validateLogin(username, password).then(
      (user) => {
        if(user.status){
          dispatch(success(user));
        }else{
          // dispatch(success(user));
          dispatch(alertActions.error(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.clear(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function adminlogin(data) {
  return (dispatch) => {
    dispatch(request(data.email));
    adminService.adminlogin(data).then(
      (user) => {
        
        if(user.status){
          dispatch(success(user));
          history.push("/dashboard");
        }else{
          dispatch(success(user));
          dispatch(alertActions.clear(user.message));
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.clear(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function adminAddMarket(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.adminAddMarket(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message) );
        
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function multipleTransaction(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.multipleTransaction(user).then(
      (user) => {
        dispatch(success());
        if(user.success){
          dispatch( alertActions.success(user.message) );
        }else{
          dispatch( alertActions.error(user.message) );
        }
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateMarket(user, id) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.adminUpdateMarket(user, id).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminAddHalal(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.adminAddHalal(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function hideOrShowMarketInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.hideOrShowMarketInvestment(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function hideOrShowHalalInvestment(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.hideOrShowHalalInvestment(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function addUserPort(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.addUserPort(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function makeWithdrawal(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.makeWithdrawal(user).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateHalal(user, id) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.adminUpdateHalal(user, id).then(
      (user) => {
        dispatch(success());
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminApproveLoans(user) {
  return (dispatch) => {
    dispatch(request(user));
    adminService.adminApproveLoans(user).then(
      (user) => {
        dispatch(success());
        history.push("/loan");
        window.location.reload()
        dispatch( alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function addTargetCommission(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.addTargetCommission(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminAddMarketNews(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminAddMarketNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function addAdmin(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.addAdmin(user).then(
      (user) => {
        dispatch(success());
        history.push("/admin");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminAddHalalNews(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminAddHalalNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminAddMarketCategory(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminAddMarketCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_categories");
        dispatch(
          alertActions.success("New Market Investment Added")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateMarketCategory(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminUpdateMarketCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_categories");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateMarketNews(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminUpdateMarketNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function updateAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.updateAdmin(user).then(
      (user) => {
        dispatch(success());
        history.push("/admin");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function disableAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.disableAdmin(user).then(
      (user) => {
        dispatch(success());
        history.push("/admin");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function enableAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.enableAdmin(user).then(
      (user) => {
        dispatch(success());
        history.push("/admin");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function modifyTargetCommission(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.modifyTargetCommission(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateHalalNews(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminUpdateHalalNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function regularSavingsTransactionsAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.regularSavingsTransactionsAdmin(user).then(
      (user) => {
        dispatch(success());
        // history.push("/halal_news");
        if(user.length == 0){
          dispatch(alertActions.success("No records found"));
        }else{
          console.log(user)
          return user
        }
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function saveLoanTransactionsAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.saveLoanTransactionsAdmin(user).then(
      (user) => {
        dispatch(success());
        // history.push("/halal_news");
        if(user.length == 0){
          dispatch(alertActions.success("No records found"));
        }else{
          console.log(user)
          return user
        }
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function targetTransactionsAdmin(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.targetTransactionsAdmin(user).then(
      (user) => {
        dispatch(success());
        // history.push("/halal_news");
        if(user.length == 0){
          dispatch(alertActions.success("No records found"));
        }else{
          console.log(user)
          return user
        }
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminUpdateHalalCategory(user) {
  console.log(user)
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminUpdateHalalCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_categories");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function admindeleteCategory(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.admindeleteCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_categories");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function disableUsers(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.disableUsers(user).then(
      (user) => {
        dispatch(success());
        history.push("/users");
        dispatch(
          alertActions.success(user.message)
        );
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function enableUsers(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.enableUsers(user).then(
      (user) => {
        dispatch(success());
        history.push("/users");
        dispatch(
          alertActions.success(user.message)
        );
        // window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function admindeleteMarketNews(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.admindeleteMarketNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/market_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function deleteTargetCommission(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.deleteTargetCommission(user).then(
      (user) => {
        dispatch(success());
        history.push("/settings");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function admindeleteHalalNews(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.admindeleteHalalNews(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_news");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function admindeleteHalaiCategory(user) {
  
  return (dispatch) => {
    dispatch(request(user));
    adminService.admindeleteHalaiCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_categories");
        dispatch(
          alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function adminAddHalalCategory(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminAddHalalCategory(user).then(
      (user) => {
        dispatch(success());
        history.push("/halal_categories");
        dispatch(
          alertActions.success("New Market Investment Added")
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error));
      }
    );
  };
}

function logout() {
  adminService.logout();
  return { type: userConstants.LOGOUT };
}

function adminregister(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminregister(user).then(
      (user) => {
        dispatch(success());
        history.push("/adminlogin");
        dispatch(alertActions.success("Registration successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function lostpassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.lostpassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/recoverysuccess");
        dispatch(alertActions.success("Password recovered successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

function resetpassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.resetpassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success("Password reset successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}


function recoverPassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.recoverPassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/");
        dispatch(alertActions.success(user.message));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function adminChangePassword(user) {
  return (dispatch) => {
    dispatch(request(user));

    adminService.adminChangePassword(user).then(
      (user) => {
        dispatch(success());
        history.push("/account");
        dispatch(alertActions.success(user.message)
        );
        window.location.reload();
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
function deleteActivities(user) {
  return (dispatch) => {
    dispatch(request({ user }));
    adminService.deleteActivities(user).then(
      (user) => {
        dispatch(success(user));
        if(user.status == false){
          dispatch(alertActions.error(user.message));
        }else{
          dispatch(alertActions.success(user.message));
        }
        history.push("/logs");
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}
function request(user) {
  return { type: userConstants.SAVINGS_REQUEST, user };
}
function success(user) {
  return { type: userConstants.SAVINGS_SUCCESS, user };
}
function failure(error) {
  return { type: userConstants.SAVINGS_FAILURE, error };
}