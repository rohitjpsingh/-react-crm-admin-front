import React, { Fragment } from "react";
import "./css/user_login_activities_modal.css";

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
  Typography,
  Table
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

function UserLoginActivitiesModal(props) {
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
  const userLoginActivities = useSelector(
    (state) => (state.user && state.user.login_activities) || []
  ); 

  const columns = [
    {
      title: "Date",
      dataIndex: "loginDate",
      key: "loginDate",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["loginDate"] ? a["loginDate"] : '';
        let second_col = b["loginDate"] ? b["loginDate"] : '';
        return first_col.localeCompare(second_col);
      }
    },
    {
        title: "Login Date/Time",
        dataIndex: "newLoginDateTime",
        key: "newLoginDateTime",
        ellipsis: true,
        sorter: (a, b) => {
          let first_col  = a["newLoginDateTime"] ? a["newLoginDateTime"] : '';
          let second_col = b["newLoginDateTime"] ? b["newLoginDateTime"] : '';
          return first_col.localeCompare(second_col);
        }
      }
    ];

  const dataSource = userLoginActivities;

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
  };


  return (
    <Fragment>
      <Modal
        title="User Login Activities"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="user_activities_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="user_login_activities_modal"
        destroyOnClose={true}
      >
        <div className="user_login_activities_list">
            <Table
            className="tbl"
            pagination={true}
            columns={columns}
            dataSource={dataSource}
            showSorterTooltip={false}
            />
        </div>
      </Modal>
    </Fragment>
  );
}

export default UserLoginActivitiesModal;
