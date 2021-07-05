import React, { FC } from "react"
import { FaTrashAlt } from "react-icons/fa"
interface Props {
  onClick: () => void
}

const DeleteButtonIcon: FC<Props> = ({ onClick }: Props) => {
  return (
    <div
      className="d-inline text-center cursor-pointer hover-opacity"
      title="Delete"
      onClick={onClick}
    >
      <FaTrashAlt style={{ color: "red" }} />
    </div>
  )
}

export default DeleteButtonIcon
