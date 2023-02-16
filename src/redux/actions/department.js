import axios from "axios";

import {
  API_URL,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_MEMBERS,
} from "./types";
import { setAlert } from "./alert";

// Add Department
export const addDepartment = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/v1/department/add`,
      formData,
      headers
    );
    if (res.data.success) {
      // dispatch({ type: ADD_DEPARTMENT, payload: res.data.department });
      dispatch(setAlert(res.data.msg, "success"));
    } else {
      dispatch(setAlert(res.data.msg, "warning"));
    }
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Departments
export const getDepartments = (param, headers) => async (dispatch) => {
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
      `${API_URL}/v1/department/list${query}`,
      headers
    );
    dispatch({ type: GET_DEPARTMENTS, payload: {resp:res.data.data, pagination:res.data.pagination}});
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Single Department
export const getDepartment = (param, headers) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${API_URL}/v1/department/${param.recordId}`,
      headers
    );
    dispatch({ type: GET_DEPARTMENT, payload: res.data.data });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Delete Department
export const deleteDepartment = (id) => async (dispatch) => {
  try {
    if (!id) {
      dispatch(setAlert("Please select any record", "warning"));
      return false;
    }
    const res = await axios.delete(`${API_URL}/v1/department/delete/${id}`);
    dispatch({ type: DELETE_DEPARTMENT, payload: id });
    dispatch(setAlert(res.data.msg, "success"));
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Update Department
export const updateDepartment = (param, headers) => async (dispatch) => {
  try {
    const res = await axios.put(
      `${API_URL}/v1/department/update/${param.recordId}`,
      param,
      headers
    );
    if (res.data.success) {
      // dispatch({ type: UPDATE_DEPARTMENT, payload: res.data.department});
      dispatch(setAlert(res.data.msg, "success"));
    } else {
      dispatch(setAlert(res.data.msg, "warning"));
    }
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Get Department Members
export const getDepartmentMembers = (param, headers) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${API_URL}/v1/department/memberList/${param.recordId}`,
      headers
    );
    dispatch({
      type: GET_DEPARTMENT_MEMBERS,
      payload: { exist: res.data.exist, not_exist: res.data.not_exist },
    });
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};

// Add/Remove Department Members
export const addRemoveDeptMembers = (formData, headers) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${API_URL}/v1/department/addRemoveMember`,
      formData,
      headers
    );
    if (res.data.success) {
      // dispatch({ type: ADD_DEPARTMENT, payload: res.data.department });
      dispatch(setAlert(res.data.msg, "success"));
    } else {
      dispatch(setAlert(res.data.msg, "warning"));
    }
  } catch (err) {
    dispatch(setAlert(err.message, "danger"));
  }
};
