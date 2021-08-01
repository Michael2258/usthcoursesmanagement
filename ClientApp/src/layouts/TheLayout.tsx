import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../redux/commons/action";

import HeaderComponent from "./HeaderComponent";
import TheContent from "./TheContent";
import Loading from "../components/Loading/Loading";

import { ACCESS_TOKEN } from "../utils/constants";
import firstCheckToken from "../utils/firstCheckToken";
import { getInfo } from "../services/accountService";
import { useMemo } from "react";
import canAccess from "../utils/canAccessRoute";
import TeacherStudentHeaderComponent from "./TeacherStudentHeaderComponent";

const TheLayout = ({ routes }: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.commons.user);

  const isAdmin = user?.roles?.includes("SuperAdmin", "Admin");

  const authRoutes = useMemo(() => {
    return routes.filter((route: any) => canAccess(user?.roles, route.roles));
  }, [user]);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const tokenStatus = await firstCheckToken();
      tokenStatus ? loadInfo() : resetAuth();
    } catch (err) {
      resetAuth();
    }
  };

  const loadInfo = async () => {
    try {
      const info = await getInfo();
      if (!info) {
        resetAuth();
      }

      dispatch(setUser(info.data));
    } catch (err) {
      resetAuth();
    }
  };

  const resetAuth = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    history.push("/login");
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div style={{ height: "100%" }} className="c-app c-default-layout">
      <div className="c-wrapper" style={{ height: "100%" }}>
        {isAdmin ? <HeaderComponent /> : <TeacherStudentHeaderComponent />}
        <div className="c-body bg-white" style={{ height: "100%" }}>
          <TheContent routes={authRoutes} />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
