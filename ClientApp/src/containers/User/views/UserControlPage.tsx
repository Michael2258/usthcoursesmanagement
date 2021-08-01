import React, { useState } from "react"
import { Row, Col, Table, Button, Container } from "reactstrap"
import UserBasicInfoItem from "../components/UserBasicInfoItem"
import AddUserModal from "../components/AddUserModal"
import useUser from "../hooks/useUser"
import SearchBox from "../../../components/Inputs/SearchBox"
import CustomPagination from "../../../components/Pagination/CustomPagination"
import useUserDetail from "../hooks/useUserDetail"
import user from "../styles/user.module.scss"
import { useSelector } from "react-redux"

type UserBasicInfo = {
  fullName: string
  userName: string
  email: string
  roles: string
}

const UserControlPage = () => {
  const { userList, filters, changeFilter, getData, deleteUserHandler } =
    useUser()

  const totalItems = useSelector((state: any) => state.users?.totalItems)

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
    <Container>
      <Row className={`${user["userList__title"]}`}>
        <p>User Managing</p>
      </Row>
      <Row className={`${user["userList__additional"]}`}>
        <Col xs="4" className="col-2">
          <Button
            className={`${user["user__add-btn"]}`}
            onClick={() => toggle()}
          >
            Add User
          </Button>
        </Col>
        <Col xs="4">
          <SearchBox
            className={`${user["user__search-box"]}`}
            initValue={filters.search}
            onSearch={(string) => changeFilter({ search: string })}
          />
        </Col>
        <Col xs="4" className="d-flex align-items-center justify-content-end">
          <p style={{ margin: "0", fontSize: "1.2rem" }}>
            Total of user:{" "}
            <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {totalItems}
            </span>
          </p>
        </Col>
      </Row>

      <Row>
        {!!userList && userList.length > 0 ? (
          <Table className={`${user["user__table"]}`} bordered hover striped>
            <thead className={`${user["user__table-header"]}`}>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Role</th>
                <th>Username</th>
                <th>Email</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody className={`${user["user__table-body"]}`}>
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
        ) : null}
      </Row>

      <Row className="mt-2">
        <Col md="12">
          <CustomPagination
            page={filters.page}
            limit={filters.limit}
            totalItems={totalItems}
            changePage={(page: number) => changeFilter({ page })}
            changeLimit={(limit: number) => changeFilter({ limit })}
          />
        </Col>
      </Row>

      <AddUserModal
        headerText={!!userId ? "Edit User" : "Add User"}
        modal={modal}
        toggle={() => toggle()}
        userDetail={userDetail}
        createOrUpdate={createData}
        userId={userId}
        className={`${user["add-user-modal"]}`}
      />
    </Container>
  )
}

export default UserControlPage
