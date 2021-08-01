import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import headercomponent from "../scss/headercomponent.module.scss";
import TheHeaderDropdown from "./TheHeaderDropdown";

interface Tabs {
  url: string;
  name: string;
  isLast: boolean;
}

const TABS: Tabs[] = [
  {
    url: "/teacherstudent/home",
    name: "HOME",
    isLast: false,
  },
  {
    url: "/teacherstudent/home",
    name: "SCHOOLYEAR",
    isLast: false,
  },
  {
    url: "/teacherstudent/home",
    name: "COURSE",
    isLast: true,
  },
];

const STUDENT_TABS: Tabs[] = [
  {
    url: "/teacherstudent/home",
    name: "HOME",
    isLast: false,
  },
  {
    url: "schoolyear",
    name: "SCHOOLYEAR",
    isLast: false,
  },
  {
    url: "/teacherstudent/course",
    name: "COURSE",
    isLast: true,
  },
];

const TeacherStudentHeaderComponent = () => {
  const history = useHistory();

  const [tabList, setTabList] = useState<Tabs[]>(TABS);

  const isStudent = useSelector((state: any) =>
    state.commons?.user?.roles?.includes("Student")
  );

  useEffect(() => {
    if (isStudent) {
      setTabList(STUDENT_TABS);
    }
  }, [isStudent]);

  return (
    <Row
      className={`${headercomponent["teacherstudent-header-component__container"]}`}
    >
      <Col
        xs="2"
        className={`${headercomponent["header-component__nav-bar-col"]} d-flex align-items-center justify-content-center`}
      >
        <div
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
            {tabList.map((tab, index) => {
              const currentUrl = window.location.href;

              const isSelectedTab = currentUrl.slice(22).includes(tab.url);

              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Col
                    className={`${headercomponent["teacher-header-component__nav-bar-item"]}`}
                    xs="2"
                  >
                    <li>
                      <a
                        style={{
                          backgroundImage: isSelectedTab
                            ? "linear-gradient(to right, lightblue, white)"
                            : "",
                        }}
                        href={tab.url}
                      >
                        {tab.name}
                      </a>
                    </li>
                  </Col>

                  {!tab.isLast ? (
                    <div
                      className={`${headercomponent["right-arrow-icon-effects"]}`}
                    >
                      <span className={`${headercomponent["right-arrow"]}`}>
                        <i className="fa fa-chevron-right"></i>
                      </span>

                      <span className={`${headercomponent["right-arrow"]}`}>
                        <i className="fa fa-chevron-right" />
                      </span>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </ul>
        </div>
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
  );
};

export default TeacherStudentHeaderComponent;
