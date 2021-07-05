import React from "react"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const DeleteSchoolYearModal = ({
  onDelete,
  onCancel,
  isOpenDeleteModal,
}: any) => {
  const deleteHandler = () => {
    onDelete()
    onCancel()
  }

  return (
    <Modal isOpen={isOpenDeleteModal} toggle={onCancel}>
      <ModalHeader>Delete?</ModalHeader>

      <ModalBody>
        Every courses in this school year will also be removed. Are you sure
        about removing this school year?
      </ModalBody>

      <ModalFooter>
        <Button onClick={onCancel}>Cancel</Button>

        <Button onClick={deleteHandler}>Delete</Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteSchoolYearModal
