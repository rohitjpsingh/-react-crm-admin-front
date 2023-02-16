import {
  
    GET_USER,
    GET_USERS,
    UPDATE_USER,
    GET_MEMBER_DEPARTMENTS,
    REMOVE_USER_LIST,
    GET_TRIAL_USERS,
    GET_ALL_USERS,
    GET_USER_LOGIN_ACTIVITIES
  } from "../actions/types";
  
  const initialState = { list: [], exist_departments:[], not_exist_departments:[], single: null, trial_user_list:[],all_user_list:[], login_activities:[] };
  
  const usersReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USERS:
        return { ...state, list: payload.pagination.currentPage === 1 ? payload.resp :  state.list.concat(payload.resp) , pagination: payload.pagination  };

      case GET_USER:
        return { ...state, single: payload };
  
      case UPDATE_USER:
        return {
          ...state,
          list: state.list.map((user) =>
            user._id === payload._id ? payload : user
          ),
        };

      case GET_MEMBER_DEPARTMENTS:
        return { ...state, exist_departments: payload.exist,not_exist_departments:payload.not_exist };
      
      case REMOVE_USER_LIST:
        return { ...state, list: payload };
      
      case GET_TRIAL_USERS:
        return { ...state, trial_user_list: payload.pagination.currentPage === 1 ? payload.resp :  state.trial_user_list.concat(payload.resp) , pagination: payload.pagination  };

      case GET_ALL_USERS:
        return { ...state, all_user_list: payload.pagination.currentPage === 1 ? payload.resp :  state.all_user_list.concat(payload.resp) , pagination: payload.pagination  };
        
      case GET_USER_LOGIN_ACTIVITIES:
        return { ...state,login_activities:payload };
      default:
        return state;
    }
  };
  
  export default usersReducer;
  