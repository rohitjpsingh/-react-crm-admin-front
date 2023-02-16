import {
  GET_VALUES_REPORT,
  GET_USERS_REPORT,
  GET_COMPANIES_REPORT,
  GET_LICENSES_REPORT,
  GET_LICENSE_ROLES_REPORT,
  GET_LOGGED_IN_REPORT
} from "../actions/types";

const initialState = { values: [], users: [], companies: [], licenseRoles:[], licenses:[], loggedInActivities:[] };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_VALUES_REPORT:
      return { ...state, values: payload };
    case GET_USERS_REPORT:
      return { ...state, users: payload };
    case GET_COMPANIES_REPORT:
      return { ...state, companies: payload };
    case GET_LICENSES_REPORT:
      return { ...state, licenses: payload };
    case GET_LICENSE_ROLES_REPORT:
      return { ...state, licenseRoles: payload };
    case GET_LOGGED_IN_REPORT:
      return { ...state, loggedInActivities: payload };
    default:
      return state;
  }
};

export default reducer;
