import React, { Fragment, useEffect, useState } from "react";
import "./css/user_edit_modal.css";

import { Modal, Button, Row, Col, Input, Form, Select, DatePicker, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { AtIcon, MobileIcon, PhoneIcon } from "./Icons";
import { updateUser,getUsers, getUser, getTrialUsers } from "../redux/actions/user";
import { getDepartmentMembers } from "../redux/actions/department";
import UserCompanyMoveModal from "./UserCompanyMoveModal";


function UserEditModal(props) {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();

  const [visibleUserCompanyMoveModal, setVisibleUserCompanyMoveModal] = useState(false);


  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const countryList = useSelector(
    (state) => (state.common && state.common.countryList) || []
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
  const languageList = useSelector(
    (state) => (state.common && state.common.userLanguageList) || []
  );
  const searchKeyword = useSelector(
    (state) => (state.common && state.common.searchKeyword) || ""
  );
  
  var headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${JWT_TOKEN}`
  }
  let setHeaders = {"headers" : headers};
  
  useEffect(() => {
    editForm.setFieldsValue({
      firstName: userEdit.firstName ? userEdit.firstName : "",
      lastName:userEdit.lastName ? userEdit.lastName : "",
      language:userEdit.language ? userEdit.language : "",
      contractNumber:userEdit.contractNumber ? userEdit.contractNumber : "",
      orderNumber:userEdit.orderNumber ? userEdit.orderNumber : "",
      eMail:userEdit.eMail ? userEdit.eMail : "",
      telephone:userEdit.telephone ? userEdit.telephone : "",
      mobile:userEdit.mobile ? userEdit.mobile : ""
    });
  }, [userEdit]);

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let recordId = userEdit.id ? userEdit.id : "";
    let { firstName,lastName,language,contractNumber,orderNumber,eMail,telephone,mobile } = formValues;
    let param = { recordId, firstName,lastName,language,contractNumber,orderNumber,eMail,telephone,mobile };
    await dispatch(updateUser(param,setHeaders));    
    await reloadUser();
  };

  const reloadUser = async() => {
    let companyId = companyEdit ? companyEdit.id : "";
    let departmentId = departmentEdit ? departmentEdit.id : "";
    if(props.pageName == 'companyDetail'){
      let param1 = { companyId };
      dispatch(getUsers(param1,setHeaders));
    }
    else if(props.pageName == 'dashboard'){
      let param1 = {};
      if(searchKeyword) {
        param1["searchKeyword"] = searchKeyword;
      }      
      dispatch(getUsers(param1,setHeaders));
    }
    else if(props.pageName == 'departmentDetail'){
      let param = {recordId:departmentId};
      dispatch(getDepartmentMembers(param, setHeaders));
    }
    else if(props.pageName == 'userDetail'){
      let recordId = userEdit.id ? userEdit.id : "";
      let param = { recordId };
      dispatch(getUser(param, setHeaders));
    }
    else if(props.pageName == 'trialUsers'){
      let param = {licenseType:'trial'};
      dispatch(getTrialUsers(param, setHeaders));
    }
    closeAddModal();
  }
  const closeAddModal = () => {
    props.visibleFunc(false);
    editForm.resetFields();
  };

  const openCompanyMoveUpModal = () => {
    setVisibleUserCompanyMoveModal(true);
  }

  return (
    <Fragment>
      <Modal
        title="Edit User"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="user_edit_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="user_edit_submit_btn"
            onClick={() => editForm.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="user_edit_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={editForm}
              layout="vertical"
              className="user_edit_form"
              onFinish={onFinish}
            >
              <Row key={1} gutter={[5]}>
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

              <Row key={2} gutter={[5]}>
                <Col span={12}>
                  <Form.Item
                    name={"contractNumber"}
                    rules={[
                      {
                        required: true,
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
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Order Number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row key={3} gutter={[5]}>
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

              <Row key={4} gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"telephone"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Phone No" prefix={<PhoneIcon height={15} width={15} />} />
                  </Form.Item>
                </Col>
              </Row>

              <Row key={5} gutter={[5]}>
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
              {
                userEdit?.companyId?.toString() === "993844605" && (
                  <Row key={6} gutter={[5]}>
                    <Col span={24}>
                      <Button
                        type="primary"
                        className="user_company_move_btn"
                        onClick={openCompanyMoveUpModal}
                      >
                        Company Move
                      </Button>
                    </Col>
                  </Row>
                )
              }
            </Form>
          </Col>
        </Row>
      </Modal>
      <UserCompanyMoveModal
        visible={visibleUserCompanyMoveModal}
        visibleFunc={setVisibleUserCompanyMoveModal}
        reloadUserFunc={reloadUser}
      />
    </Fragment>
  );
}

export default UserEditModal;
