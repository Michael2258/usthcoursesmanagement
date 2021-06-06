import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { Store } from "redux"

import rootReducer from "./rootReducer"

const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
})

export default store
