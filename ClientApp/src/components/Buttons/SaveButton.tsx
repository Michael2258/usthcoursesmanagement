import React, { FC } from "react"
import { Button } from "reactstrap"

interface Props {
  text?: string
  onClick?(): void
  className: string
}

const SaveButton: FC<Props> = ({ text, onClick, className }: Props) => {
  return (
    <Button onClick={onClick} className={className}>
      <span className="add-btn-text">{text}</span>
    </Button>
  )
}

export default SaveButton
