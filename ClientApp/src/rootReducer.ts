import { combineReducers } from "redux"

import commons from "./redux/commons/reducer"
import users from "./redux/users/reducer"

const rootReducer = combineReducers({
  commons,
  users,
})

export default rootReducer
