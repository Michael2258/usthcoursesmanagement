import React, { FC } from "react"
// import { Link } from "react-router-dom"

interface Props {
  to: string
}

const CloseComponent: FC<Props> = ({ to }: Props) => {
  return <a>&times;</a>
}

export default CloseComponent
