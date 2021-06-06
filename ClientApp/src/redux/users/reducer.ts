import { createReducer } from "@reduxjs/toolkit"
import { setUserList, setUserListTotalItems } from "./action"

const initialState: any = {
  userList: [],
  totalItems: 0,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setUserList, (state, action) => {
    state.userList = action.payload
  })

  builder.addCase(setUserListTotalItems, (state, action) => {
    state.totalItems = action.payload
  })
})

export default reducer
