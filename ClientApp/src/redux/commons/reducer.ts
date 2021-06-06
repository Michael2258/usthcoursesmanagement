import { createReducer } from "@reduxjs/toolkit"

import { setLoading, setUser, setAlert, setModal } from "./action"

const initialState: any = {
  isLoading: false,
  alert: {
    type: "",
    message: "",
  },
  modal: {
    isOpen: false,
  },
  user: null,
}

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload
    })
    .addCase(setModal, (state, action) => {
      state.modal = action.payload
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload
    })
    .addCase(setAlert, (state, action) => {
      state.alert = action.payload
    })
})

export default reducer
