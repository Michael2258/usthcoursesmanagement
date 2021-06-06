import React, { FC, memo } from "react"
import { Label } from "reactstrap"

interface Props {
  text: string
}

const RequiredLabel: FC<Props> = ({ text }: Props) => {
  return (
    <Label>
      {text}
      <span className="ml-2 text-danger">*</span>
    </Label>
  )
}

export default memo(RequiredLabel)
