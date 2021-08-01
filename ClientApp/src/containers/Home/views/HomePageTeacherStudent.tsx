import React from "react";
import { useSelector } from "react-redux";
import { Button, Row } from "reactstrap";
import { Link } from "react-scroll";
import {
  FaCarAlt,
  FaTree,
  FaCalculator,
  FaUserAstronaut,
  FaAtom,
  FaVial,
  FaKey,
  FaDatabase,
  FaMagnet,
  FaHamburger,
  FaLaptopCode,
  FaTools,
  FaPlusCircle,
  FaPills,
  FaSpaceShuttle,
} from "react-icons/fa";
import { BsFillLightningFill } from "react-icons/bs";
import homepage from "../styles/homepage.module.scss";
import { useHistory } from "react-router-dom";
import { DEPARTMENTS } from "../../../assets/constants/constant";

const HomePageTeacherStudent = () => {
  const user = useSelector((state: any) => state.commons.user);

  const history = useHistory();

  const isStudent = user.roles.includes("Student");

  const iconHandler = (iconString: string) => {
    switch (iconString) {
      case "car":
        return <FaCarAlt size="1.6rem" color="#ea4201" />;
      case "tree":
        return <FaTree size="1.6rem" color="#98a900" />;
      case "calculator":
        return <FaCalculator size="1.6rem" color="#0e7bb7" />;
      case "user-astronaut":
        return <FaUserAstronaut size="1.6rem" color="#ccc" />;
      case "atom":
        return <FaAtom size="1.6rem" color="#e4a188" />;
      case "vial":
        return <FaVial size="1.6rem" color="#eaf4be" />;
      case "key":
        return <FaKey size="1.6rem" color="#25f2f7" />;
      case "database":
        return <FaDatabase size="1.6rem" color="#e74941" />;
      case "lightning":
        return <BsFillLightningFill size="1.6rem" color="#d39f52" />;
      case "magnet":
        return <FaMagnet size="1.6rem" color="#3f141e" />;
      case "hamburger":
        return <FaHamburger size="1.6rem" color="#378161" />;
      case "laptop-code":
        return <FaLaptopCode size="1.6rem" color="#353f8c" />;
      case "tool":
        return <FaTools size="1.6rem" color="#6fabe4" />;
      case "plus":
        return <FaPlusCircle size="1.6rem" color="#dbe177" />;
      case "pills":
        return <FaPills size="1.6rem" color="#9df2d8" />;
      case "spaceship":
        return <FaSpaceShuttle size="1.6rem" color="#a98cd8" />;
    }
  };

  return (
    <div className={`${homepage["homepage-container"]}`}>
      <Row className={`${homepage["homepage-introduction-container"]}`}>
        <div
          style={{
            backgroundImage: `url(${require("../../../assets/images/background.jpg")})`,
          }}
          className={`${homepage["homepage-introduction"]}`}
        >
          <div className={`${homepage["homepage-introduction-content"]}`}>
            <h1>Welcome, {`${user.firstName} ${user.lastName}`} </h1>

            <p>
              {isStudent
                ? "Here is the place where you can find information about any courses at USTH. Still don't know which course you are going to participate in? Take a look at USTH Moodle or USTH official website and check your timetable."
                : "You are a lecturer at USTH and you want to manage your course's information? You know what to do!"}
            </p>

            <div className={`${homepage["homepage-introduction-btn"]}`}>
              {isStudent ? (
                <div>
                  <a href="https://moodle.usth.edu.vn" target="_blank">
                    <button
                      className={`${homepage["homepage-to-moodle-btn intro-btn"]}`}
                    >
                      USTH Moodle
                    </button>
                  </a>

                  <a href="https://usth.edu.vn" target="_blank">
                    <button
                      className={`${homepage["homepage-to-moodle-btn intro-btn"]}`}
                    >
                      USTH Website
                    </button>
                  </a>

                  <button
                    className={`${homepage["homepage-to-moodle-btn intro-btn"]}`}
                  >
                    <Link to="department" spy={true} smooth={true}>
                      Select Department
                    </Link>
                  </button>
                </div>
              ) : (
                <button
                  className={`${homepage["homepage-to-moodle-btn intro-btn"]}`}
                >
                  <Link to="department" spy={true} smooth={true}>
                    Select Department
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </Row>

      <Row className={`${homepage["homepage-content"]}`}>
        <div
          style={{
            backgroundImage: `url(${require("../../../assets/images/background1.jpg")})`,
          }}
          className={`${homepage["overlay"]}`}
        >
          <div
            id="department"
            className={`${homepage["homepage-departments"]}`}
          >
            {DEPARTMENTS.map((department, index) => (
              <div
                key={index}
                onClick={() =>
                  history.push(`/teacherstudent/${department.name}/schoolyear`)
                }
                style={{ backgroundColor: department.color }}
                className={`${homepage["homepage-department-item"]}`}
              >
                <div className={`${homepage["homepage-department-icon"]}`}>
                  {iconHandler(department.icon)}
                </div>

                <div className={`${homepage["homepage-department-text"]}`}>
                  <h6>{department.name}</h6>

                  <p>{department.fullname}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Row>
    </div>
  );
};

export default HomePageTeacherStudent;
