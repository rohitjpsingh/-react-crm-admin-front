import React, { useState } from "react";
import { NavLink, useHistory  } from "react-router-dom";
import { Layout, Input, Button, Drawer } from "antd";
import "./layout.css";
import LeftMenu from "./LeftMenu";
import MobileMenu from "./MobileMenu";
import Alert from "../Alert";

import { useTranslation, Trans } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { SearchIcon } from "../Icons";
import { queryStringParse } from "../../utils/helpers";

const { Header, Content, Footer } = Layout;
function MyLayout(props) {
  let history = useHistory();
  const [visible, setvisible] = useState(false);
  const theme = useSelector((state) => state.theme);
  const setDealIdFromNotificationFunc = (props.setDealIdFromNotificationFunc) ? props.setDealIdFromNotificationFunc : (()=>{});
  const { t, i18n } = useTranslation();
  
  let queryString = queryStringParse(props.location.search);
  let search_keyword = queryString && queryString.search_keyword ? queryString.search_keyword : '';

  const [setSearchText, setsetSearchText] = useState(search_keyword);

	const showDrawer = () => {
		setvisible(true)
	};
	const onClose = () => {
    setvisible(false)
	};

  const redirectPage = (deal_id) => {
    history.push("/deals?dealId="+deal_id) ;
    setDealIdFromNotificationFunc(deal_id);
  }

  const handleSearchText = (keyword) => {
    setsetSearchText(keyword);

    if(keyword) {
      let matched_character = ['@','$','!'];
      let get_first_character = keyword.toString().charAt(0);
      if(matched_character.includes(get_first_character)) {
        let redirect_path_name = '';
        let final_search_keyword = keyword.toString();
        if(get_first_character == '@'){
          redirect_path_name = '/contacts';
        }
        else if(get_first_character == '!'){
          redirect_path_name = '/organizations';
        }
        else if(get_first_character == '$'){
          redirect_path_name = '/deals';
        }  
        history.push(`${redirect_path_name}?search_keyword=${final_search_keyword}`)      
      }
      else {
        if (
          ["/cancellations", "/organizations", "/contacts", "/deals"].includes(
            props.location.pathname
          )
        ) {
          let location_pathname = keyword
            ? `?search_keyword=${keyword}`
            : `${props.location.pathname}?clearsearch=true`;
          history.push(location_pathname);
        } else {
          let location_pathname = keyword
            ? history.push(`/deals?search_keyword=${keyword}`)
            : null;
        }
      }
    }
    else {
        if (
          ["/cancellations", "/organizations", "/contacts", "/deals"].includes(
            props.location.pathname
          )
        ) {
          let location_pathname = keyword
            ? `?search_keyword=${keyword}`
            : `${props.location.pathname}?clearsearch=true`;
          history.push(location_pathname);
        } else {
          let location_pathname = keyword
            ? history.push(`/deals?search_keyword=${keyword}`)
            : null;
        } 
    }

       
  }
  return (
    <Layout className="layout main_lay_page">
      <Header className="top_header">
        {/* <div className="brand_logo">
          <NavLink to="/dashboard">
            {theme && theme.latest_theme && theme.latest_theme.mode == 'dark' ? (<img src={`assets/images/zellry_sign_white.svg`} alt="zellry" />) : (<img src={`assets/images/zellry_sign_black.svg`} alt="zellry" />) }     
          </NavLink>
        </div> */}
        <LeftMenu location={props.location} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Alert />
        <div className="site-layout-content">{props.children}</div>
      </Content>
      {/* <Footer className="bottom_footer">
        Footer
      </Footer> */}
    </Layout>
  );
}
export default MyLayout;
