import React, { useState } from "react"
import { Button } from "reactstrap"
import DeleteUserModal from "./DeleteUserModal"

const UserBasicInfoItem = (props: any) => {
  const { userInfo, index, deleteUserHandler, getData, toggle } = props

  const [modalDeleteUser, setModalDeleteUser] = useState<boolean>(false)

  const [idStudentDelete, setIdStudentDelete] = useState<string>("")

  const toggleDeleteUserModal = (id?: string) => {
    id ? setIdStudentDelete(id) : setIdStudentDelete("")
    setModalDeleteUser(!modalDeleteUser)
  }

  const removeUser = (id: string) => {
    deleteUserHandler(id, () => {
      getData()
      setModalDeleteUser(!modalDeleteUser)
    })
  }

  return (
    <React.Fragment>
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>
          {!!userInfo &&
            userInfo?.firstName.concat(!!userInfo && userInfo?.lastName)}
        </td>
        <td>{!!userInfo && userInfo?.roles}</td>
        <td>{!!userInfo && userInfo?.userName}</td>
        <td>{!!userInfo && userInfo?.email}</td>

        <td>
          <Button onClick={() => toggle(userInfo?.id)}>Edit</Button>
          <Button onClick={() => toggleDeleteUserModal(userInfo?.id)}>
            Delete
          </Button>
        </td>
      </tr>

      <DeleteUserModal
        toggleDeleteUserModal={toggleDeleteUserModal}
        modalDeleteUser={modalDeleteUser}
        cancel={modalDeleteUser}
        confirm={() => removeUser(idStudentDelete)}
      />
    </React.Fragment>
  )
}

export default UserBasicInfoItem
