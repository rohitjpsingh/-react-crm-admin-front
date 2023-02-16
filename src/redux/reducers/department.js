import {
  ADD_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENT_MEMBERS
} from "../actions/types";

const initialState = { list: [], exist_members:[], not_exist_members:[], single: null };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DEPARTMENTS:
      return { ...state, list: payload.pagination.currentPage === 1 ? payload.resp :  state.list.concat(payload.resp) , pagination: payload.pagination  };

    case GET_DEPARTMENT:
      return { ...state, single: payload };

    case UPDATE_DEPARTMENT:
      return {
        ...state,
        list: state.list.map((item) =>
          item._id === payload._id ? payload : item
        ),
      };

    case ADD_DEPARTMENT:
      return {
        ...state,
        list: [payload, ...state.list],
      };

    case DELETE_DEPARTMENT:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== payload._id),
      };

    case GET_DEPARTMENT_MEMBERS:
      return { ...state, exist_members: payload.exist,not_exist_members:payload.not_exist };

    default:
      return state;
  }
};

export default reducer;
