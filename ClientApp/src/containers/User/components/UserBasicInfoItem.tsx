import React, { useState } from "react"
import { Button } from "reactstrap"
import DeleteUserModal from "./DeleteUserModal"
import { FaRegEdit, FaTrashAlt } from "react-icons/fa"
import user from "../styles/user.module.scss"

const UserBasicInfoItem = (props: any) => {
  const { userInfo, index, deleteUserHandler, getData, toggle } = props

  const [modalDeleteUser, setModalDeleteUser] = useState<boolean>(false)

  const [idStudentDelete, setIdStudentDelete] = useState<string>("")

  console.log(idStudentDelete)

  const toggleDeleteUserModal = (id?: string) => {
    id ? setIdStudentDelete(id) : setIdStudentDelete("")
    setModalDeleteUser(!modalDeleteUser)
  }

  const removeUser = (id: string) => {
    deleteUserHandler(id, () => {
      setModalDeleteUser(!modalDeleteUser)
      getData()
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

        <td className={`${user["user__actions"]}`}>
          <div
            className="d-inline text-center cursor-pointer hover-opacity"
            onClick={() => toggle(userInfo?.id)}
          >
            <FaRegEdit style={{ fontSize: "1rem" }} />
          </div>
          <div
            className="d-inline text-center cursor-pointer hover-opacity"
            onClick={() => toggleDeleteUserModal(userInfo?.id)}
          >
            <FaTrashAlt style={{ color: "red", fontSize: "1rem" }} />
          </div>
        </td>
      </tr>

      <DeleteUserModal
        toggleDeleteUserModal={toggleDeleteUserModal}
        modalDeleteUser={modalDeleteUser}
        cancel={toggleDeleteUserModal}
        confirm={() => removeUser(idStudentDelete)}
      />
    </React.Fragment>
  )
}

export default UserBasicInfoItem
