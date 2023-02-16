import axios from "axios";

import {
  API_URL,
  GET_VALUES_REPORT,
  GET_USERS_REPORT,
  GET_COMPANIES_REPORT,  
  GET_LICENSES_REPORT,
  GET_LICENSE_ROLES_REPORT,
  GET_LOGGED_IN_REPORT
} from "./types";
import { setAlert } from "./alert";

// Get Values
export const getValuesReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getValues${query}`,
      headers
    );
    dispatch({ type: GET_VALUES_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Users
export const getUsersReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getUsers${query}`,
      headers
    );
    dispatch({ type: GET_USERS_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Companies
export const getCompaniesReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getCompanies${query}`,
      headers
    );
    dispatch({ type: GET_COMPANIES_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Licenses
export const getLicensesReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getLicenses${query}`,
      headers
    );
    dispatch({ type: GET_LICENSES_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Licenses Roles
export const getLicenseRolesReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getLicenseRoles${query}`,
      headers
    );
    dispatch({ type: GET_LICENSE_ROLES_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get User Loggined 
export const getUserLoggedInReport = (param, headers) => async (dispatch) => {
  try {
    let query = [];
    if (param) {
      for (const key in param) {
        if (param.hasOwnProperty(key)) {
          query.push(`${key}=${param[key]}`);
        }
      }
    }
    query = query.length ? `?${query.join(`&`)}` : "";
    const res = await axios.get(
      `${API_URL}/v1/report/getLogginedUsers${query}`,
      headers
    );
    dispatch({ type: GET_LOGGED_IN_REPORT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};