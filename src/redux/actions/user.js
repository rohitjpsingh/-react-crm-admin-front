import axios from "axios";

import { API_URL, GET_USER, GET_USERS,GET_MEMBER_DEPARTMENTS, REMOVE_USER_LIST,GET_TRIAL_USERS,GET_ALL_USERS, GET_USER_LOGIN_ACTIVITIES } from "./types";
import { setAlert } from "./alert";

// Add User
export const addUser = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/v1/user/add`, formData, headers);
    if(res.data.success){
      // dispatch({ type: ADD_COMPANY, payload: res.data.company });
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get Users
export const getUsers = (param,headers) => async (dispatch) => {
  try {
    let query = [];
    if(param){
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);        
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(`${API_URL}/v1/user/list${query}`,headers);
    dispatch({ type: GET_USERS, payload: {resp:res.data.data, pagination:res.data.pagination}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get Single User
export const getUser = (param,headers) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/v1/user/${param.recordId}`, headers);
    dispatch({ type: GET_USER, payload:res.data.data  });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Update User
export const updateUser = (param,headers) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/v1/user/update/${param.recordId}`, param, headers);
    if(res.data.success){
      // dispatch({ type: UPDATE_DEPARTMENT, payload: res.data.department});
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }   
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get Member Departments
export const getMemberDepartments = (param,headers) => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/v1/user/departmentList/${param.recordId}`,headers);
    dispatch({ type: GET_MEMBER_DEPARTMENTS, payload: {exist:res.data.exist, not_exist:res.data.not_exist}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Add/Remove Member Departments
export const addRemoveMemberDepts = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/v1/user/addRemoveDept`, formData, headers);
    if(res.data.success){
      // dispatch({ type: ADD_DEPARTMENT, payload: res.data.department });
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Send Reset Mail
export const sendResetMail = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/v1/user/sendResetPassword`, formData, headers);
    if(res.data.success){
      // dispatch({ type: ADD_COMPANY, payload: res.data.company });
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};


// Remove List
export const removeUserList = () => (dispatch) => {
  try {
    dispatch({ type: REMOVE_USER_LIST, payload: [] });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
}

// Get Trial Users
export const getTrialUsers = (param,headers) => async (dispatch) => {
  try {
    let query = [];
    if(param){
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);        
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(`${API_URL}/v1/user/list${query}`,headers);
    dispatch({ type: GET_TRIAL_USERS, payload: {resp:res.data.data, pagination:res.data.pagination}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get All Users
export const getAllUsers = (param,headers) => async (dispatch) => {
  try {
    let query = [];
    if(param){
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);        
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(`${API_URL}/v1/user/list${query}`,headers);
    dispatch({ type: GET_ALL_USERS, payload: {resp:res.data.data, pagination:res.data.pagination}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get User Login Activities
export const getUserLoginActivities = (param,headers) => async (dispatch) => {
  try {
    let query = [];
    if(param.other){
      let other = param.other;
      for (const key in other) {
        if (other.hasOwnProperty(key)) {
          query.push(`${key}=${other[key]}`);        
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(`${API_URL}/v1/user/loginActivitiesList/${param.recordId}${query}`,headers);
    dispatch({ type: GET_USER_LOGIN_ACTIVITIES, payload: res.data.list});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Update User Company Move Up
export const updateUserCompanyMoveUp = (param,headers) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/v3/user/companyMoveUp`, param, headers);
    if(res.data.success){
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }   
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};