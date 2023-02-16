import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./css/login_bottom.css";
import { Drawer,Menu, Dropdown, Button, Space } from "antd";
import { useTranslation, Trans } from 'react-i18next';
import {useSelector, useDispatch} from "react-redux";
import { applyTheme } from '../redux/actions/theme';
import { darkTheme, lightTheme } from './themes/Themes';
import { CareRightIcon, SunIcon, MoonIcon } from "./Icons";

function LoginBottom() {
  const [visiblelangs, setvisiblelangs] = useState(false);
  const [lngs, setLngs] = useState({ en: { nativeName: 'English' }});
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const latest_theme = useSelector((state) => state.theme.latest_theme.mode);

  useEffect(() => {
    i18n.services.backendConnector.backend.getLanguages((err, ret) => {
      console.log('ret:',ret);
      if (err) {
        console.log('errorL:',err);
        return;
      };
      setLngs(ret);
    });
  }, []);

  const openDrawer = () => {
    setvisiblelangs(true);
  };

  const closeDrawer = () => {
    setvisiblelangs(false);
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setvisiblelangs(false);
  };

  const checkKeyByValue = (object, value) => {
    return Object.keys(object).find(key => key === value);
  }

  const toggleTheme = (new_theme) => {
    // let new_theme = (latest_theme == 'light') ? darkTheme : lightTheme;
    dispatch(applyTheme(new_theme));
  }
  const active_theme = (theme_mode) => {
    return (latest_theme == theme_mode) ? 'active_theme' : '' ;
  }

  return (
    <div className="bottom_page">
      
      <Dropdown overlay={languages_menu(lngs, changeLanguage)} placement="topLeft">
        <span className="language_section">
        {checkKeyByValue(lngs,i18n.language) ? 
          Object.keys(lngs).map((lng) => {
            if (i18n.language === lng) {
              return (
                <Fragment key={lng}>
                  <span
                    style={{ display: "flex" }}
                  >
                    {lngs[lng].nativeName} <CareRightIcon height={15} />
                  </span>
                </Fragment>
              );
            }
          }
          )
        : 
        (<Fragment> <span
          style={{ display: "flex" }}
        >
          English <CareRightIcon height={15} />
        </span></Fragment>)
        }
        </span>
      </Dropdown> 
      
      <span className="logo">
        <NavLink to="/">
          <img src="assets/images/rukkor_blue_logo.svg" alt="zellry" />{" "}
        </NavLink>
      </span>
      <span className="mode">
        {
          1==2 && (
            <>
              <span className="sun_mode" onClick={()=> toggleTheme(lightTheme)}>
                <span className={active_theme('light')}><SunIcon height={15} /></span>
              </span>
              <span className="moon_mode" onClick={()=> toggleTheme(darkTheme)}>
                <span className={active_theme('dark')}><MoonIcon height={15} fill={active_theme('dark') ? "#1A1D20" : '' } /></span>
              </span>
            </>
          )
        }
        
      </span>
    </div>
  );
}

const languages_menu = (lngs,changeLanguage) => (
  <Menu>
      {Object.keys(lngs).map((lng) => (
        <Menu.Item key={lng} onClick={() => changeLanguage(lng)}>
          {lngs[lng].nativeName}
        </Menu.Item>
      ))}
  </Menu>
);

export default LoginBottom;
