import React, { Fragment, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import { useTranslation, Trans } from 'react-i18next';
import { darkTheme, lightTheme } from '../themes/Themes';
import { applyTheme } from '../../redux/actions/theme';
import {useSelector, useDispatch} from "react-redux";
import { HomeIcon, DeptIcon, NewUserIcon, MoonIcon, SunIcon, LogoutIcon, UsersIcon } from '../Icons';
import { authLogout } from "../../redux/actions/authentication";

const LeftMenu = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const latest_theme = useSelector((state) => state.theme.latest_theme.mode);
  const auth = useSelector((state) => state.auth);
  const toggleTheme = () => {
    let new_theme = (latest_theme == 'light') ? darkTheme : lightTheme;
    dispatch(applyTheme(new_theme));
  }

  useEffect(() => {
    if(!auth.login) {
      props.history.push("/");
    }
  }, [auth])
  const handleLogout = () => {
    dispatch(authLogout());
  }
  return (
    <Menu
      mode={"horizontal"}
      defaultSelectedKeys={["/dashboard"]}
      selectedKeys={[props.location.pathname]}
      className="left-menu-div"
    >
      <Menu.Item key={`/dashboard`}>
        <NavLink to="/dashboard" className="nav-text">
          <HomeIcon />
        </NavLink>
      </Menu.Item>
      <Menu.Item key={`/reports`}>
        <NavLink to="/reports" className="nav-text">
          <DeptIcon />
        </NavLink>
      </Menu.Item>

      <Menu.Item key={`/users`}>
        <NavLink to="/users" className="nav-text">
          <NewUserIcon />
        </NavLink>
      </Menu.Item>

      <Menu.Item key={`/all-users`}>
        <NavLink to="/all-users" className="nav-text">
          <UsersIcon width={20} />
        </NavLink>
      </Menu.Item>

      <Menu.Item key={`/organizationss`} className={"theme-icon"} >
        <NavLink to="#" onClick={handleLogout} className="nav-text">
          <LogoutIcon />
        </NavLink>
      </Menu.Item>

      {/* <Menu.Item key={`/theme-change`} className={"theme-icon"} >
        <span  onClick={toggleTheme}>
          {latest_theme === "dark" ? (
            <MoonIcon style={{marginTop:"22px"}} height={15} width={15} />
          ) : (
            <SunIcon style={{marginTop:"22px"}} height={15} width={15} />
          )}
        </span>
      </Menu.Item> */}

      
    </Menu>
  );
};
export default LeftMenu;
