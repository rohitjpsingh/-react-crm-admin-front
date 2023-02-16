// API URL
export const API_URL = (process.env.REACT_APP_NODE_ENV !== 'production') ? process.env.REACT_APP_API_LOCAL_URL : process.env.REACT_APP_API_LIVE_URL ;

// AUTH
export const AUTH_LOGIN  = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_ERROR  = 'AUTH_ERROR';

// ALERT
export const SET_ALERT    = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// COMPANY
export const ADD_COMPANY     = 'ADD_COMPANY';
export const GET_COMPANIES   = 'GET_COMPANIES';
export const GET_COMPANY     = 'GET_COMPANY';
export const UPDATE_COMPANY  = 'UPDATE_COMPANY';
export const DELETE_COMPANY  = 'DELETE_COMPANY';
export const REMOVE_COMPANY_LIST = 'REMOVE_COMPANY_LIST';
export const MOVE_COMPANY_LIST = 'MOVE_COMPANY_LIST';

// DEPARTMENT
export const ADD_DEPARTMENT     = 'ADD_DEPARTMENT';
export const GET_DEPARTMENT     = 'GET_DEPARTMENT';
export const GET_DEPARTMENTS    = 'GET_DEPARTMENTS';
export const UPDATE_DEPARTMENT  = 'UPDATE_DEPARTMENT';
export const DELETE_DEPARTMENT  = 'DELETE_DEPARTMENT';
export const GET_DEPARTMENT_MEMBERS = 'GET_DEPARTMENT_MEMBERS';

// USER
export const ADD_USER     = 'ADD_USER';
export const GET_USER     = 'GET_USER';
export const GET_USERS    = 'GET_USERS';
export const UPDATE_USER  = 'UPDATE_USER';
export const DELETE_USER  = 'DELETE_USER';
export const GET_MEMBER_DEPARTMENTS  = 'GET_MEMBER_DEPARTMENTS';
export const REMOVE_USER_LIST = 'REMOVE_USER_LIST';
export const GET_TRIAL_USERS = 'GET_TRIAL_USERS';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_USER_LOGIN_ACTIVITIES = 'GET_USER_LOGIN_ACTIVITIES';

// COMMON
export const GET_COMMON_DATA   = 'GET_COMMON_DATA';
export const SET_SEARCH   = 'SET_SEARCH';
export const REMOVE_SEARCH   = 'REMOVE_SEARCH';



// REPORT
export const GET_VALUES_REPORT = 'GET_VALUES_REPORT';
export const GET_USERS_REPORT = 'GET_USERS_REPORT';
export const GET_COMPANIES_REPORT = 'GET_COMPANIES_REPORT';
export const GET_LICENSES_REPORT = 'GET_LICENSES_REPORT';
export const GET_LICENSE_ROLES_REPORT = 'GET_LICENSE_ROLES_REPORT';
export const GET_LOGGED_IN_REPORT = 'GET_LOGGED_IN_REPORT';

// THEME
export const APPLY_THEME = 'APPLY_THEME ';