import {
    AUTH_LOGIN,AUTH_LOGOUT, AUTH_ERROR,UPDATE_PROFILE, GET_PROFILE
} from "../actions/types";

import { isLogin, getLoginData } from "../../utils/auth";


const initialState = { 
  login: (isLogin()) ? true : false, 
  user: (isLogin()) ? getLoginData().user : null,
  token: (isLogin()) ? getLoginData().token : null,
  error:null 
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN:
      return { ...state, user: payload.user,token:payload.token, login: true, error:null };

    case AUTH_LOGOUT:
      return { ...state, login:false, user:null, error:null,token:null };

    case AUTH_ERROR:
      return { ...state, user: null, login: false, error:payload };

    default:
      return state;
  }
};


