import axios from "axios";

import {
  API_URL,
  GET_COMMON_DATA,
  SET_SEARCH,
  REMOVE_SEARCH 
} from "./types";
import { setAlert } from './alert';

// Get Common Data
export const getCommon = (param,headers) => async (dispatch) => {
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
    const res = await axios.get(`${API_URL}/v1/common/staticData${query}`,headers);
    dispatch({ type: GET_COMMON_DATA, payload: {industryList:res.data.industryList,countryList:res.data.countryList,licenseList:res.data.licenseList,licenseRoleList:res.data.licenseRoleList,userLanguageList:res.data.userLanguageList}});
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Set Search
export const setSearchKeyword = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: SET_SEARCH, payload:keyword });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};

// Remove Search
export const removeSearchKeyword = () => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_SEARCH });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
  }
};