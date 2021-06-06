import React, { Suspense } from "react"
import { Route, Switch, Redirect, useLocation } from "react-router-dom"
import { CContainer } from "@coreui/react"
import NotFound from "../containers/Commons/views/NotFound"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
)

const TheContent = ({ routes }: any) => {
  const location = useLocation()
  const { pathname } = location
  const dashboard = pathname === "/" ? "box-container" : ""
  return (
    <main className={`c-main ${dashboard}`}>
      <CContainer fluid className="h-100">
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route: any, idx: any) => (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Redirect from="/" to="/user" />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
