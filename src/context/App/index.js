import React, { Component, createContext, useEffect, useState } from "react";
import Fetch from "../../common/fetch";

const AppContext = createContext();

const AppProvider = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [allRoaster, setAllRoaster] = useState([]);
  const [license, setLicense] = useState({});
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    if (localStorage.token) {
      const user = localStorage.user && JSON.parse(localStorage.user);
      setIsLogin(true);
      setRole(+user?.role);
      getProfile();
    } else {
      setIsLogin(false);
      setRole("");
    }
  }, []);

  const getProfile = () => {
    Fetch("notifications/unread-count/").then((d) => {
      if (d?.status) {
        setNotificationsCount(d.data?.unread_count);
      }
    });
    Fetch("accounts/user/").then((d) => {
      if (d?.status) {
        setUserProfile(d.data);
      }
    });
  };

  const authLogin = (roleVal) => {
    setIsLogin(true);
    setRole(roleVal ? roleVal : role);
  };

  const logOut = () => {
    localStorage.clear();

    setIsLogin(false);
    setRole("");
  };

  const val = {
    isLogin,
    role,
    userProfile,
    allRoaster,
    license,
    sideBarOpen,
    notificationsCount,
    logOut: logOut,
    authLogin: authLogin,
    addRoaster: (data) => setAllRoaster(data),
    addlicense: (data, type) => setLicense({ ...license, [type]: data }),
    getProfile: getProfile,
    notifyCountUpdate: (count) => setNotificationsCount(count),
    handleSideBarOpen: (val) => setSideBarOpen(val),
  };
  return (
    <AppContext.Provider value={val}>{props.children}</AppContext.Provider>
  );
};

const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer, AppContext };
