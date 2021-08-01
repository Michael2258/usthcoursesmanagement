import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { setUser } from "../redux/commons/action";
import { ACCESS_TOKEN } from "../utils/constants";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const DEFAULT_USER_AVATAR = require("../assets/images/default-avatar.jpg");

const TheHeaderDropdown = () => {
  const user = useSelector((state: any) => state.commons.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const FullName = user?.firstName.concat(" " + user?.lastName);

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(setUser(null));
    history.replace("/login");
  }, []);

  const avatarUrl = DEFAULT_USER_AVATAR;

  const handleNavigateToUserProfile = () => {
    if (user.roles.includes("SuperAdmin", "Admin")) {
      return;
    } else if (user.roles.includes("Teacher")) {
      history.push(`/teacher/user-profile`);
    } else if (user.roles.includes("Student")) {
      history.push(`/student/user-profile`);
    }
  };

  return (
    <CDropdown inNav className="c-header-nav-items mx-2">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar d-flex flex-column justify-content-center align-items-center">
          <CImg
            style={{ width: "40px", borderRadius: "50%" }}
            src={avatarUrl}
            className="c-avatar-img"
          />
          <p style={{ margin: "0" }}>{FullName}</p>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleNavigateToUserProfile}>
          <CIcon name="cil-user" className="mfe-2" />
          {user?.email}
        </CDropdownItem>
        <CDropdownItem onClick={signOut}>
          <CIcon name="cil-account-logout" className="mfe-2" />
          Sign out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
