import React, { FC, CSSProperties } from "react"
import { useSelector } from "react-redux"

const Loading: FC = () => {
  const isLoading = useSelector((state: any) => state.commons.isLoading)

  return isLoading ? (
    <div className="loading-container">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : null
}

export default Loading
