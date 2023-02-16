import React, { Fragment, useEffect } from "react";
import "./css/user_license_modal.css";

import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Select,
  DatePicker,
} from "antd";
import {
  CalendarCheckIcon,
  SalesIcon,
  UserIcon,
} from "./Icons";
import moment from "moment-timezone";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUser,
  getUsers,
  getTrialUsers,
  getUser,
} from "../redux/actions/user";
import { getDepartmentMembers } from "../redux/actions/department";

function UserLicenseModal(props) {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const licenseList = useSelector(
    (state) => (state.common && state.common.licenseList) || []
  );
  const licenseRoleList = useSelector(
    (state) => (state.common && state.common.licenseRoleList) || []
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userEdit = useSelector(
    (state) => (state.user && state.user.single) || {}
  );
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );
  const departmentEdit = useSelector(
    (state) => (state.department && state.department.single) || {}
  );

  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };
  
  useEffect(() => {
    editForm.setFieldsValue({
      license: userEdit.license ? userEdit.license : "",
      licenseRole: userEdit.licenseRole ? userEdit.licenseRole : "",
      licenseExpiryDate: userEdit.licenseExpiryDate
        ? userEdit.licenseExpiryDate == "0000-00-00"
          ? moment()
          : moment(userEdit.licenseExpiryDate)
        : moment(),
    });
  }, [userEdit]);

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let recordId = userEdit.id ? userEdit.id : "";
    let companyId = companyEdit ? companyEdit.id : "";
    let departmentId = departmentEdit ? departmentEdit.id : "";
    let { license, licenseExpiryDate, licenseRole } = formValues;
    let param = { recordId, license, licenseExpiryDate, licenseRole };
    await dispatch(updateUser(param, setHeaders));

    if (props.pageName == "companyDetail") {
      let param1 = { companyId };
      dispatch(getUsers(param1, setHeaders));
    } else if (props.pageName == "dashboard") {
      let param1 = {};
      dispatch(getUsers(param1, setHeaders));
    } else if (props.pageName == "departmentDetail") {
      let param = { recordId: departmentId };
      dispatch(getDepartmentMembers(param, setHeaders));
    } else if (props.pageName == "userDetail") {
      let param = { recordId };
      dispatch(getUser(param, setHeaders));
    }
    else if (props.pageName == "trialUsers") {
      let param = {licenseType:'trial'};
      dispatch(getTrialUsers(param, setHeaders));
    }
    closeAddModal();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    editForm.resetFields();
  };

  const handleLicense = (value) => {
    console.log("value:",value);
    let newDate = '';
    switch (value) {
      case 'trial': 
        newDate = moment().add(30, 'days');  
      break;
      case 'trial-expired': 
        newDate = moment().add(30, 'days');         
      break;
      case '30-days':   
        newDate = moment().add(30, 'days');       
      break;
      case '90-days': 
        newDate = moment().add(90, 'days');         
      break;
      case '365-days':   
        newDate = moment().add(365, 'days');     
      break;    
      default:
        newDate = moment();
      break;
    }
    editForm.setFieldsValue({
      licenseExpiryDate:newDate
    });
  }

  return (
    <Fragment>
      <Modal
        title="Edit License"
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
            onClick={() => editForm.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="user_license_add_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={editForm}
              layout="vertical"
              className="user_license_add_form"
              onFinish={onFinish}
            >
              <Row>
                <Col span={2}>
                  <span className="st-sicon">
                    <SalesIcon height={12} width={12} />
                  </span>
                </Col>
                <Col span={22}>
                  <Form.Item
                    name={"license"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select Days"
                      showSearch
                      filterOption={(input, option) => {
                        return (
                          option.key
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.title
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      allowClear
                      onChange={(value) => handleLicense(value)}
                    >
                      {licenseList.length > 0
                        ? licenseList.map((data, index) => (
                            <Select.Option
                              key={data.value}
                              title={data.label}
                              value={data.value}
                            >
                              {data.label}
                            </Select.Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={2}>
                  <span className="st-sicon">
                    <UserIcon height={15} width={15} />
                  </span>
                </Col>
                <Col span={22}>
                  <Form.Item
                    name={"licenseRole"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      placeholder="Select Roles"
                      showSearch
                      filterOption={(input, option) => {
                        return (
                          option.key
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0 ||
                          option.title
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                      allowClear
                    >
                      {licenseRoleList.length > 0
                        ? licenseRoleList.map((data, index) => (
                            <Select.Option
                              key={data.value}
                              title={data.label}
                              value={data.value}
                            >
                              {data.label}
                            </Select.Option>
                          ))
                        : null}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={2}>
                  <span className="st-sicon">
                    <CalendarCheckIcon height={15} width={15} />
                  </span>
                </Col>
                <Col span={22}>
                  <Form.Item
                    name={"licenseExpiryDate"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <DatePicker
                      placeholder="Expiry Date"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
}

export default UserLicenseModal;
