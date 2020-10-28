import { getConfig } from "../config/config";
import axios from "axios"
import { authHeader, history } from "../logic";
export const adminService = {
  adminlogin,
  relogin,
  logout,
  adminregister,
  lostpassword,
  resetpassword,
  disableUsers,
  enableUsers,
  recoverPassword,
  adminChangePassword,
  adminAddMarket,
  adminAddHalal,
  adminUpdateHalal,
  adminUpdateMarket,
  adminUpdateMarketCategory,
  adminUpdateMarketNews,
  updateAdmin,
  modifyTargetCommission,
  adminUpdateHalalNews,
  regularSavingsTransactionsAdmin,
  saveLoanTransactionsAdmin,
  targetTransactionsAdmin,
  adminUpdateHalalCategory,
  admindeleteCategory,
  admindeleteHalaiCategory,
  admindeleteMarketNews,
  deleteTargetCommission,
  admindeleteHalalNews,
  adminAddMarketCategory,
  adminAddHalalNews,
  adminAddMarketNews,
  addAdmin,
  disableAdmin,
  enableAdmin,
  adminAddHalalCategory,
  addTargetCommission,
  adminApproveLoans,
  hideOrShowMarketInvestment,
  hideOrShowHalalInvestment,
  update,
  delete: _delete,
};

function adminlogin(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch(getConfig("adminlogin"), requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("admin", JSON.stringify(user));
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("profile_pic", user.profile_pic);

      return user;
    });
}
function adminregister(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("adminsignup"), requestOptions).then(handleResponse);
}

// Add Halal
function adminAddHalal(fd) {
  const headers =  { ...authHeader(), "Content-Type": "application/json" }
  return axios.post(getConfig("adminAddHalal"), fd, {headers}).then((res) => {
    if(res.data == "Unauthorized"){
        history.push("/sign-in");
    }
    return res.data
  })
}

// Update Halal
function adminUpdateHalal(fd, id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const headers =  { ...authHeader(), "Content-Type": "application/json" }
  return axios.post(getConfig("adminUpdateHalal")+id +"?token="+user.token, fd, {headers}).then((res) => {
    if(res.data == "Unauthorized"){
          history.push("/sign-in");
    }
    return res.data
  })
}

// Add market
function adminAddMarket(fd) {
  const headers =  { ...authHeader(), "Content-Type": "application/json" }
  return axios.post(getConfig("adminAddMarket"), fd, {headers}).then((res) => {
    if(res.data == "Unauthorized"){
          history.push("/sign-in");
    }
    return res.data
  })
}

// Update Market
function adminUpdateMarket(fd, id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const headers =  { ...authHeader(), "Content-Type": "application/json" }
  return axios.post(getConfig("adminUpdateMarket")+id +"?token="+user.token, fd, {headers}).then((res) => {
    if(res.data == "Unauthorized"){
        history.push("/sign-in");
    }
    return res.data
  })
}

// Approve Loan 
function adminApproveLoans(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("adminApproveLoans"), requestOptions).then(
    handleResponse
  );
}

// Update market category
function adminUpdateMarketCategory(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateMarketCategory")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function adminUpdateMarketNews(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateMarketNews")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function updateAdmin(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateAdmin")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function hideOrShowMarketInvestment(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("hideOrShowMarketInvestment")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function hideOrShowHalalInvestment(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("hideOrShowHalalInvestment")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function disableAdmin(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(id),
  };
  return fetch(getConfig("disableAdmin")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function enableAdmin(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("enableAdmin")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function modifyTargetCommission(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("modifyTargetCommission")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function regularSavingsTransactionsAdmin(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("regularSavingsTransactionsAdmin")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function saveLoanTransactionsAdmin(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("saveLoanTransactionsAdmin")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function targetTransactionsAdmin(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("targetTransactionsAdmin")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function adminUpdateHalalNews(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateHalalNews")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function adminUpdateHalalCategory(data) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("updateHalalCategory")+data.id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function admindeleteCategory(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("deleteCategory")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function disableUsers(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("disableUsers")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function enableUsers(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("enableUsers")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function admindeleteHalaiCategory(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("deleteHalaiCategory")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function admindeleteMarketNews(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("deleteMarketNews")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}
function deleteTargetCommission(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("deleteTargetCommission")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

function admindeleteHalalNews(id) {
  let user = JSON.parse(localStorage.getItem('admin'));
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    // body: JSON.stringify(data),
  };
  return fetch(getConfig("deleteHalaiNews")+id+"?token="+user.token, requestOptions).then(
    handleResponse
  );
}

// Admin add Market news
function adminAddMarketNews(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addMarketNews"), requestOptions).then(
    handleResponse
  );
}

function addAdmin(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addAdmin"), requestOptions).then(
    handleResponse
  );
}

function addTargetCommission(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addTargetCommission"), requestOptions).then(
    handleResponse
  );
}

// Admin add Halal category
function adminAddHalalNews(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addHalalNews"), requestOptions).then(
    handleResponse
  );
}

// Admin add Market category
function adminAddMarketCategory(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addMarketCategory"), requestOptions).then(
    handleResponse
  );
}
// Admin add halal category
function adminAddHalalCategory(data) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  return fetch(getConfig("addHalalCategory"), requestOptions).then(
    handleResponse
  );
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("name");
  history.push('/sign-in')
}

function relogin(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  };

  return fetch(getConfig("relogin"), requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("signup"), requestOptions).then(handleResponse);
}

function lostpassword(email) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: email,
  };

  return fetch(getConfig("recoverpass"), requestOptions).then(handleResponse);
}

function resetpassword(user) {
  const requestOptions = {
    method: "POST",
    headers: {...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("resetPass"), requestOptions).then(handleResponse);
}

function recoverPassword(user) {
  const requestOptions = {
    method: "POST",
    headers: {...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("recoverPassword"), requestOptions).then(handleResponse);
}

function adminChangePassword(user) {
  const requestOptions = {
    method: "POST",
    headers: {...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(getConfig("adminChangePassword"), requestOptions).then(handleResponse);
}

function update(user) {
  const requestOptions = {
    method: "PUT",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`{config.apiUrl}/users/${user.id}`, requestOptions).then(
    handleResponse
  );
}

function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(`{config.apiUrl}/users/${id}`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    let data = "";
    try {
      data = text && JSON.parse(text);
    } catch (error1) {
      // ...
    }
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      if (error === "Unauthorized") {
        history.push("/sign-in");
      }
      return Promise.reject(error);
    }

    return data;
  });
}
