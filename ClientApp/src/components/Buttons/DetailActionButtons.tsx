import React, { FC } from "react"
import { Row, Col, Button } from "reactstrap"

interface Props {
  confirmText: string
  onConfirm: () => any
  onCancel: () => any
}

const DetailActionButtons: FC<Props> = ({
  confirmText,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <Row form className="detail-action-btn">
      <Col md={12}>
        <Button
          color="primary"
          size="sm"
          className="px-4 pl-1 mr-2 ml-3"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
        <Button size="sm" className="px-4 mr-2 ml-2" onClick={onCancel}>
          Cancel
        </Button>
      </Col>
    </Row>
  )
}

export default DetailActionButtons
