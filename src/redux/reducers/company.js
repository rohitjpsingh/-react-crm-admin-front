import {
  ADD_COMPANY,
  GET_COMPANIES,
  GET_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
  REMOVE_COMPANY_LIST,
  MOVE_COMPANY_LIST
} from "../actions/types";

const initialState = { list: [], single: null, moveCompanies:[], pagination:null };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMPANIES:
      return { ...state, list: payload.pagination.currentPage === 1 ? payload.resp :  state.list.concat(payload.resp) , pagination: payload.pagination  };

    case GET_COMPANY:
      return { ...state, single: payload };

    case UPDATE_COMPANY:
      return {
        ...state,
        list: state.list.map((item) =>
          item._id === payload._id ? payload : item
        ),
      };

    case ADD_COMPANY:
      return {
        ...state,
        list: [payload, ...state.list],
      };

    case DELETE_COMPANY:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== payload._id),
      };

    case REMOVE_COMPANY_LIST:
      return { ...state, list: payload };

    case MOVE_COMPANY_LIST:
      return { ...state, moveCompanies: payload };

    default:
      return state;
  }
};

export default reducer;
