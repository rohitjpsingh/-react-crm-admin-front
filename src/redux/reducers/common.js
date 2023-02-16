import {
  GET_COMMON_DATA,
  SET_SEARCH,
  REMOVE_SEARCH 
} from "../actions/types";

const initialState = { industryList: [], countryList: [], licenseList:[], licenseRoleList:[],userLanguageList:[], searchKeyword:null };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMON_DATA:
      return { ...state, industryList:payload.industryList,countryList:payload.countryList,licenseList:payload.licenseList,
        licenseRoleList: payload.licenseRoleList,userLanguageList:payload.userLanguageList };
    case SET_SEARCH:
      return {
        ...state,
        searchKeyword:payload
      };
    case REMOVE_SEARCH:
      return {
        ...state,
        searchKeyword:null
      };
    default:
      return state;
  }
};

export default reducer;
