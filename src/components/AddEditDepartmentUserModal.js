import React, { Fragment, useState, useEffect } from "react";
import "./css/add_edit_department_user_modal.css";

import {
  Modal,
  Row,
  Col,
  Form,
  Divider,
} from "antd";
import {
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "./Icons";

import { useSelector, useDispatch } from "react-redux";
import { addRemoveDeptMembers, getDepartments, getDepartment, getDepartmentMembers } from "../redux/actions/department";
import { getUsers,getMemberDepartments,getUser } from "../redux/actions/user";

function AddEditDepartmentUserModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const departmentExistMemberList = useSelector(
    (state) => (state.department && state.department.exist_members) || []
  ); 
  const departmentNotExistMemberList = useSelector(
    (state) => (state.department && state.department.not_exist_members) || []
  ); 
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );  

  const onFinish = async (form_values) => {
    console.log("Received values of form: ", form_values);
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
  };

  const memberAction = async(action,userId,deptId) => {
    let companyId = companyEdit.id ? companyEdit.id : "";
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    let param = { action,userId,deptId  };
    await dispatch(addRemoveDeptMembers(param,setHeaders));

    // Get Members
    let param1 = {recordId:deptId};
    dispatch(getDepartmentMembers(param1, setHeaders));

    if(props.pageName == 'companyDetail') {
      let param2 = { companyId };
      dispatch(getDepartments(param2,setHeaders));  
      let param3 = { companyId };
      dispatch(getUsers(param3,setHeaders)); 
    }
    else if(props.pageName == 'departmentDetail') {
      let param4 = { recordId:deptId };
      dispatch(getDepartment(param4, setHeaders));
    } 
    else if(props.pageName == 'userDetail') {
      let param5 = { recordId:userId };
      dispatch(getMemberDepartments(param5, setHeaders));

      let param6 = { recordId:userId };
      dispatch(getUser(param6, setHeaders));
    }   
  }

  return (
    <Fragment>
      <Modal
        title="Add/Remove Members"
        visible={props.visible}
        centered
        footer={false}
        onCancel={closeAddModal}
        className="depart_user_add_edit_modal"
        destroyOnClose={true}
        width={450}
      >
        <div className="member-section">
          <h3>Members - ({(!departmentExistMemberList || departmentExistMemberList.length === 0) ? '0' : departmentExistMemberList.length})</h3>
          <div className={"active-member " + (!departmentExistMemberList || departmentExistMemberList.length < 3 ? " ":"active-member-scroll")}>
            {(!departmentExistMemberList || departmentExistMemberList.length === 0) ? (
                <div style={{textAlign:"center"}}>No Data Available</div>
              ) :departmentExistMemberList.map((mem,index) => (
              <Row key={index} className="members-div">
                <Col xl={3} sm={3} md={3} xs={5} lg={3}>
                  <span className="st-icon">
                    <UserIcon />
                  </span>
                </Col>
                <Col className="MemberName" xl={19} sm={19} md={19} xs={17} lg={19}>{mem.ufirstName + " " + mem.ulastName}</Col>
                <Col xl={2} sm={2} md={2} xs={2} lg={2}>
                  <span className="st-icon2" onClick={() => memberAction("remove",mem.userId,mem.deptId)}>
                    <UserMinusIcon />
                  </span>
                </Col>
              </Row>
            ))}
          </div>
          <Divider />
          <h3>Available - ({(!departmentNotExistMemberList || departmentNotExistMemberList.length === 0) ? '0' : departmentNotExistMemberList.length})</h3>
          <div className="available-member">
            {
              (!departmentNotExistMemberList || departmentNotExistMemberList.length === 0) ? (
                <div style={{textAlign:"center"}}>No Data Available</div>
              ) : departmentNotExistMemberList.map((mem,index) => (
              <Row key={index} className="members-div">
                <Col xl={3} sm={3} md={3} xs={5} lg={3}>
                  <span className="st-icon">
                    <UserIcon />
                  </span>
                </Col>
                <Col className="MemberName" xl={19} sm={19} md={19} xs={17} lg={19}>{mem.ufirstName + " " + mem.ulastName}</Col>
                <Col xl={2} sm={2} md={2} xs={2} lg={2}>
                  <span className="st-icon2" onClick={() => memberAction("add",mem.userId,mem.deptId)}>
                    <UserPlusIcon height={18} width={18} />
                  </span>
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

export default AddEditDepartmentUserModal;
