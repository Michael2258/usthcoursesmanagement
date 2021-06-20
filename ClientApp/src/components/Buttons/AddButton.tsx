import React, { FC } from "react"
import { Button } from "reactstrap"
import { FaPlus } from "react-icons/fa"

interface Props {
  text?: string
  onClick?(): void
  className: string
}

const AddButton: FC<Props> = ({ text, onClick, className }: Props) => {
  return (
    <Button onClick={onClick} color="success" className={className}>
      <div>
        <FaPlus />
      </div>
      <span className="add-btn-text ml-2">{text}</span>
    </Button>
  )
}

export default AddButton
