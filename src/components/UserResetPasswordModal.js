import React, { Fragment } from "react";
import "./css/user_reset_password_modal.css";

import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Form,
  Select,
  DatePicker,
  Divider,
  Typography
} from "antd";
import {
  AtIcon,
  CalendarCheckIcon,
  MobileIcon,
  PhoneIcon,
  SalesIcon,
  UserIcon,
} from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import { sendResetMail } from "../redux/actions/user";

const { Title } = Typography;

function UserResetPasswordModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userEdit = useSelector(
    (state) => (state.user && state.user.single) || {}
  );

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
  };

  const sendResetMailF = async() => {
    let userId = userEdit.id ? userEdit.id : "";
    let param = {userId};
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    await dispatch(sendResetMail(param,setHeaders));
    closeAddModal();
  }

  return (
    <Fragment>
      <Modal
        title="Reset Password"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="user_license_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="user_license_submit_btn"
            onClick={() => sendResetMailF()}
          >
            Reset
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="user_reset_password_modal"
        destroyOnClose={true}
      >
        Are you sure you wish to reset the password 
        for user "<b>{userEdit.firstName + " " + userEdit.lastName }</b>" ?
      </Modal>
    </Fragment>
  );
}

export default UserResetPasswordModal;
