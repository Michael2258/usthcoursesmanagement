import { createAction } from "@reduxjs/toolkit"

export const setLoading = createAction<boolean>("commons/setLoading")

export const setModal = createAction<any>("commons/setModal")

export const setUser = createAction<any>("commons/setUser")

export const setAlert = createAction<any>("commons/setAlert")
