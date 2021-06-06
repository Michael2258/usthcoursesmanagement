import React from "react"
import { Modal, ModalHeader, ModalFooter, Button } from "reactstrap"

const DeleteUserModal = (props: any) => {
  const { toggleDeleteUserModal, modalDeleteUser, className, confirm, cancel } =
    props

  return (
    <div>
      <Modal
        isOpen={modalDeleteUser}
        toggle={toggleDeleteUserModal}
        className={className}
      >
        <ModalHeader toggle={toggleDeleteUserModal}>
          Are you sure you want to delete this user?
        </ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={confirm}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={cancel}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteUserModal
