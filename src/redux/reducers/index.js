import { combineReducers } from "redux";

import auth from "./authentication";
import alert from './alert';
import user from './user';
import company from './company';
import department from './department';
import common from './common';
import theme from "./theme";
import report from "./report";

const appReducer = combineReducers({
  auth,
  alert,
  user,
  company,
  department,
  common,
  theme,
  report
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer;