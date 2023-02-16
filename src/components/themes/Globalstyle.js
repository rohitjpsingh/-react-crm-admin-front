import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${(props) => props.theme.latest_theme.body};
    color: ${(props) => props.theme.latest_theme.text}; 
  }

  .header_right_icon,.svg_icon, .mobile_menu_icon {
    fill:${(props) => props.theme.latest_theme.text};
  }
  .left-menu-div .ant-menu-item a.active {
    background: ${(props) => props.theme.latest_theme.activeText};
  }
  
  .ant-layout-content {
    background: ${(props) => props.theme.latest_theme.body};
  }

  .left-menu-div, 
  .login_page .login_box, 
  .forgot_page .forgot_box ,
  .reset_password_page .reset_box
  {
    background: ${(props) => props.theme.latest_theme.bgColor};
  }


  .ant-form-item-label > label, 
  .login_page .second_row .column, 
  .login_page .fourth_row .forgotlink,
  .forgot_page .second_row .column,
  .forgot_page .fourth_row .forgotlink,
  .reset_password_page .second_row .column
  {
    color: ${(props) => props.theme.latest_theme.text};
  }

  `;
