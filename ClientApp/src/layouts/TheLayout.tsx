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

const TheLayout = ({ routes }: any) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.commons.user);

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
    <div className="c-app c-default-layout">
      <div className="c-wrapper">
        <HeaderComponent />
        <div className="c-body bg-white">
          <TheContent routes={authRoutes} />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
