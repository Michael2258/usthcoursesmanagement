import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import headercomponent from "../scss/headercomponent.module.scss";
import TheHeaderDropdown from "./TheHeaderDropdown";

function HeaderComponent() {
  const history = useHistory();

  return (
    <div className={`${headercomponent["header-component__container"]}`}>
      <Col
        xs="2"
        className={`${headercomponent[""]} d-flex align-items-center justify-content-center`}
      >
        <div
          onClick={() => history.push("/admin")}
          className={`${headercomponent["header-component-main-icon__container"]}`}
        >
          <img alt="" src={require("../assets/icons/USTH_logo.png")} />
        </div>
      </Col>

      <Col
        xs="10"
        className={`${headercomponent["header-component__nav-bar-col"]}`}
      >
        <div className={`${headercomponent["header-component__nav-bar"]}`}>
          <ul>
            <Row
              className={`${headercomponent["header-component__nav-bar-row-list"]}`}
            >
              <Col
                className={`${headercomponent["header-component__nav-bar-row-item"]}`}
                xs="2"
              >
                <li>
                  <a href="/admin/user">User</a>
                </li>
              </Col>
              <Col
                className={`${headercomponent["header-component__nav-bar-row-item"]}`}
                xs="2"
              >
                <li>
                  <a href="/admin/schoolyear">School Year</a>
                </li>
              </Col>
              <Col
                className={`${headercomponent["header-component__nav-bar-row-item"]}`}
                xs="2"
              >
                <li>
                  <a href="/admin/course">Course</a>
                </li>
              </Col>
              <Col
                className={`${headercomponent["header-component__nav-bar-row-item"]}`}
                xs="2"
              >
                <li>
                  <a href="/admin/grades">Grades</a>
                </li>
              </Col>
              <Col
                className={`${headercomponent["header-component__nav-bar-row-item"]}`}
                xs="2"
              >
                <li>
                  <TheHeaderDropdown />
                </li>
              </Col>
            </Row>
          </ul>
        </div>
      </Col>
    </div>
  );
}

export default HeaderComponent;
