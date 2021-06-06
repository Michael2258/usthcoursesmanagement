import * as React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"

import "./scss/style.scss"

import { icons } from "./assets/icons"

import { adminRoutes } from "./configs/routes"
import navigation from "./configs/navigation"
import store from "./store"

import TheLayout from "./layouts/TheLayout"
import Login from "./containers/Login/views/Login"
import NotificationModal from "./components/Modals/NotificationModal"
import CommonAlert from "./components/Alerts/CommonAlert"
import Loading from "./components/Loading/Loading"

// @ts-ignore
React.icons = icons

const adminRoutesWithPrefix = adminRoutes.map((route) => ({
  ...route,
  path: "/admin" + route.path,
}))

export default () => (
  <Provider store={store}>
    <Loading />
    <NotificationModal />
    <CommonAlert />
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route
          path="/admin"
          render={(props) => (
            <TheLayout
              {...props}
              navigation={navigation}
              routes={adminRoutesWithPrefix}
            />
          )}
        />
      </Switch>
    </Router>
  </Provider>
)
