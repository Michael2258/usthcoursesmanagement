import React, { CSSProperties, FC } from "react"
import { Button } from "reactstrap"
import { FaPlus } from "react-icons/fa"

interface Props {
  text?: string
  onClick?(): void
}

const AddButton: FC<Props> = ({ text, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      color="success"
      className="d-flex align-items-center add-btn"
    >
      <FaPlus />
      <span className="add-btn-text ml-2">{text}</span>
    </Button>
  )
}

export default AddButton
