import axios from "axios";
import {
  AUTH_LOGIN,AUTH_LOGOUT,AUTH_ERROR,API_URL
} from "./types";

import { login, logout } from "../../utils/auth";
import { setAlert } from './alert';



// User Login
export const authLogin = (props,userCredential) => async (dispatch) => {
  try {
    console.log("userCredentialL",userCredential);
    const res = await axios.get(`${API_URL}/v1/auth/adminLogin`,{
      params: userCredential
    });
    if(res.data.success){
      let user = { user:res.data.user, token:res.data.token };
      login(user);
      dispatch({ type: AUTH_LOGIN, payload: { user:res.data.user, token:res.data.token }});
      dispatch(setAlert('Login Success', 'success'));
      props.history.push("/dashboard");
    }
    else{
      dispatch({ type: AUTH_ERROR, payload: res.data.msg });
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
    dispatch(setAlert(err.message, 'danger'));
  }
};


// User Logout
export const authLogout = () => async (dispatch) => {
  try {
    logout();
    dispatch({ type: AUTH_LOGOUT,payload:'' });
    dispatch(setAlert('Logout done', 'success'));
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
    dispatch(setAlert(err.message, 'danger'));
  }
};


// Send Reset Link
export const sendResetLink = (formData,props) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/user/sendResetLink`,formData);
    if(res.data.success){
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Reset New Password
export const resetPassword = (formData,props) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/user/resetPassword`,formData);
    if(res.data.success){
      dispatch(setAlert(res.data.msg, 'success'));
    }
    else{
      dispatch(setAlert(res.data.msg, 'warning'));
    }
  } catch (err) {
    dispatch({ type: AUTH_ERROR, payload: err.message });
    dispatch(setAlert(err.message, 'danger'));
  }
};

