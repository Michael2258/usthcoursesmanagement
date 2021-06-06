import React, {
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
} from "react"
import { useDispatch } from "react-redux"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"

import { setAlert, setModal } from "../../redux/commons/action"

const CommonModal = (props: any, ref: any) => {
  const {
    header,
    children,
    onConfirm,
    onCancel,
    confirmText,
    cancelText,
    noFooter,
    size,
    edited,
    setEditedFalse,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const showEditedWarningModal = (cb: any) => {
    try {
      dispatch(
        setModal({
          isOpen: true,
          type: "warning",
          message: "Are you sure to cancel?",
          onConfirm: async () => {
            cb()
          },
        })
      )
    } catch (err) {
      dispatch(
        setAlert({
          type: "danger",
          message: err.response?.data?.title || err.message,
        })
      )
    }
  }
  const onToggle = () => {
    !!setEditedFalse && setEditedFalse()
    setIsOpen(!isOpen)
    !!isOpen && !!onCancel && onCancel()
  }
  const toggle = useCallback(
    (isShowConfirm?: boolean, cb?: any) => {
      if (!!isShowConfirm) {
        showEditedWarningModal(() => {
          onToggle()
          !!cb && cb()
        })
      } else {
        onToggle()
        !!cb && cb()
      }
    },
    [isOpen]
  )

  const cancel = useCallback(() => {
    toggle(!!edited, () => {
      onCancel && onCancel()
    })
  }, [toggle, onCancel, edited])

  useImperativeHandle(ref, () => ({
    toggle,
  }))

  return (
    <Modal isOpen={isOpen} toggle={() => toggle(!!edited)} size={size}>
      <ModalHeader toggle={() => toggle(!!edited)}>{header}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      {!noFooter && (
        <ModalFooter className="text-right">
          {onConfirm && (
            <Button color="primary" onClick={onConfirm}>
              {confirmText || "Confirm"}
            </Button>
          )}
          <Button onClick={cancel}>{cancelText || "Cancel"}</Button>
        </ModalFooter>
      )}
    </Modal>
  )
}

export default forwardRef(CommonModal)
