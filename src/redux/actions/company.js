import axios from "axios";

import {
  API_URL,
  ADD_COMPANY,
  GET_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,  
  DELETE_COMPANY,
  REMOVE_COMPANY_LIST,
  MOVE_COMPANY_LIST
} from "./types";
import { setAlert } from './alert';

// Add Company
export const addCompany = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(`${API_URL}/v1/company/add`, formData, headers);
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

// Get Companies
export const getCompanies = (param,headers) => async (dispatch) => {
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
    const res = await axios.get(`${API_URL}/v1/company/list${query}`,headers);
    dispatch({ type: GET_COMPANIES, payload: {resp:res.data.data, pagination:res.data.pagination}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Get Single Company
export const getCompany = (param,headers) => async (dispatch) => {
    try {
      const res = await axios.get(`${API_URL}/v1/company/${param.recordId}`, headers);
      dispatch({ type: GET_COMPANY, payload:res.data.data  });
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
    }
  };

// Delete Company
export const deleteCompany = (id) => async (dispatch) => {
  try {
    if(!id){
      dispatch(setAlert('Please select any record', 'warning'));
      return false;
    }
    const res = await axios.delete(`${API_URL}/v1/company/delete/${id}`);
    dispatch({ type: DELETE_COMPANY, payload: id });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Update Company
export const updateCompany = (param,headers) => async (dispatch) => {
  try {
    const res = await axios.put(`${API_URL}/v1/company/update/${param.recordId}`, param, headers);
    if(res.data.success){
      // dispatch({ type: UPDATE_COMPANY, payload: res.data.company});
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
export const removeCompanyList = () => (dispatch) => {
  try {
    dispatch({ type: REMOVE_COMPANY_LIST, payload: [] });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
}

// Get Move Companies
export const getMoveCompanies = (param,headers) => async (dispatch) => {
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
    const res = await axios.get(`${API_URL}/v1/company/list${query}`,headers);
    dispatch({ type: MOVE_COMPANY_LIST, payload: res.data.data});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};
