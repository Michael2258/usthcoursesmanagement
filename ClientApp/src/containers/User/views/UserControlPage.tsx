import React, { useState } from "react"
import { Row, Col, Table, Button } from "reactstrap"
import UserBasicInfoItem from "../components/UserBasicInfoItem"
import AddUserModal from "../components/AddUserModal"
import useUser from "../hooks/useUser"
import SearchBox from "../../../components/Inputs/SearchBox"
import CustomPagination from "../../../components/Pagination/CustomPagination"
import useUserDetail from "../hooks/useUserDetail"

type UserBasicInfo = {
  fullName: string
  userName: string
  email: string
  roles: string
}

const UserControlPage = () => {
  const {
    userList,
    totalItems,
    filters,
    changeFilter,
    getData,
    deleteUserHandler,
  } = useUser()

  const { createOrUpdateUser, setUserId, userId, userDetail, setUserDetail } =
    useUserDetail()

  const [modal, setModal] = useState(false)

  const toggle = (userId?: string) => {
    !!userId ? setUserId(userId) : setUserId("")
    setModal(!modal)
  }

  const createData = (data: any) => {
    createOrUpdateUser(data, () => {
      getData()
      toggle()
    })
  }

  return (
    <div>
      <Row>
        <Col xs="4">
          <h1>User Managing</h1>
        </Col>
        <Col xs="8">
          <Button onClick={() => toggle()}>Add User</Button>
        </Col>
      </Row>

      <Row md={8}>
        <SearchBox
          initValue={filters.search}
          onSearch={(string) => changeFilter({ search: string })}
        />
      </Row>

      <Row>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!!userList &&
              userList.map((userInfo: UserBasicInfo, index: number) => (
                <UserBasicInfoItem
                  index={index}
                  userInfo={userInfo}
                  deleteUserHandler={deleteUserHandler}
                  setUserId={setUserId}
                  getData={getData}
                  setUserDetail={setUserDetail}
                  userDetail={userDetail}
                  toggle={toggle}
                />
              ))}
          </tbody>
        </Table>
      </Row>

      <Row>
        <div className="text-right">
          <CustomPagination
            page={filters.page}
            limit={filters.limit}
            totalItems={totalItems}
            changePage={(page: number) => changeFilter({ page })}
            changeLimit={(limit: number) => changeFilter({ limit })}
          />
        </div>
      </Row>

      <AddUserModal
        headerText={!!userId ? "Edit User" : "Add User"}
        modal={modal}
        toggle={() => toggle()}
        userDetail={userDetail}
        createOrUpdate={createData}
        userId={userId}
      />
    </div>
  )
}

export default UserControlPage
