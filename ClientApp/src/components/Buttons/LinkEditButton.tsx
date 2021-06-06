import React, { FC } from "react"
import { Button } from "reactstrap"

interface Props {
  label: string
  onClick: () => any
}

const LinkEditButton: FC<Props> = ({ label, onClick }: Props) => {
  return (
    <Button className="text-left py-0" color="link" onClick={onClick}>
      {label}
    </Button>
  )
}

export default LinkEditButton
