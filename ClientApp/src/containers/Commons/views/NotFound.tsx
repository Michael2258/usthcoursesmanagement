import React, { FC, useEffect } from "react"
import { Link } from "react-router-dom"

const TITLE = "Not found"
const NotFound: FC = () => {
  useEffect(() => {
    document.title = TITLE
  })

  return (
    <div className="not-found">
      <div className="clearfix">
        <h1 className="float-left display-3 mr-4">404</h1>
        <div className="float-left">
          <h4 className="pt-3">Oops! You are lost.</h4>
          <p className="text-muted mb-2">
            The page you are looking for was not found.
          </p>
          <div>
            <Link to="/schools">Go to home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
