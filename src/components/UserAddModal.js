import React, { Fragment } from "react";
import "./css/user_add_modal.css";

import { Modal, Button, Row, Col, Input, Form, Select, DatePicker, TreeSelect } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AtIcon, MobileIcon, PhoneIcon,CalendarCheckIcon, SalesIcon, UserIcon, HirarchyIcon } from "./Icons";

import { getUsers,addUser } from "../redux/actions/user";
import moment from "moment-timezone";
const { TreeNode } = TreeSelect;

function UserAddModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const countryList = useSelector(
    (state) => (state.common && state.common.countryList) || []
  );
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const languageList = useSelector(
    (state) => (state.common && state.common.userLanguageList) || []
  );
  const licenseList = useSelector(
    (state) => (state.common && state.common.licenseList) || []
  );
  const licenseRoleList = useSelector(
    (state) => (state.common && state.common.licenseRoleList) || []
  );
  const departmentList = useSelector(
    (state) => (state.department && state.department.list) || {}
  ); 

  form.setFieldsValue({
    licenseRole:'creator'
  });

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let companyId = companyEdit.id ? companyEdit.id : ""
    let { firstName,lastName,language,contractNumber,orderNumber,eMail,telephone,mobile,license, licenseExpiryDate, licenseRole,departments } = formValues;
    let param = { companyId,firstName,lastName,language,contractNumber,orderNumber,eMail,telephone,mobile,license, licenseExpiryDate, licenseRole,departments };
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    await dispatch(addUser(param,setHeaders));

    if(props.pageName === 'companyDetail') {
      let param1 = { companyId };
      dispatch(getUsers(param1,setHeaders));
    }
    closeAddModal();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
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
    form.setFieldsValue({
      licenseExpiryDate:newDate
    });
  }

  return (
    <Fragment>
      <Modal
        title="New User"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="user_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="user_submit_btn"
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="user_add_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              className="user_add_form"
              onFinish={onFinish}
            >
              <Row gutter={[5]}>
                <Col span={10}>
                  <Form.Item
                    name={"firstName"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={"lastName"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"language"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Select
                      showSearch
                      placeholder="Language"
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
                    >
                      {languageList
                        .length > 0
                        ? languageList.map((data,index) => (
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

              <Row gutter={[5]}>
                <Col span={12}>
                  <Form.Item
                    name={"contractNumber"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Contract Number" />
                  </Form.Item>                  
                </Col>
                <Col span={12}>                 
                  <Form.Item
                    name={"orderNumber"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Order Number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"eMail"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                      {
                        type: 'email',
                        message: "Invalid Email Address!",
                      }
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Email" prefix={<AtIcon height={15} width={15} />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"telephone"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Phone No" prefix={<PhoneIcon height={15} width={15} />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"mobile"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Mobile No" prefix={<MobileIcon height={15} width={15} />} />
                  </Form.Item>
                </Col>
              </Row>

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
                      placeholder="Select Role"
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

              <Row>
                <Col span={2}>
                  <span className="st-sicon" style={{height:'33px'}}>
                    <HirarchyIcon height={15} width={15} />
                  </span>
                </Col>
                <Col span={22}>
                  <Form.Item
                    name={"departments"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <TreeSelect
                      showSearch
                      allowClear
                      treeCheckable={true}
                      placeholder="Select Departments"
                      filterTreeNode={(search, item) => {
                        return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
                      }}
                    >
                      {departmentList.length > 0
                        ? departmentList.map((data, index) => (
                            <TreeNode
                              key={data.id}
                              title={data.name}
                              value={data.id}
                            />
                          ))
                        : null}
                    </TreeSelect>
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

export default UserAddModal;
