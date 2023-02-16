import React, { Fragment } from "react";
import "./css/add_edit_user_department_modal.css";

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
} from "antd";
import {
  AtIcon,
  CalendarCheckIcon,
  HirarchyIcon,
  MobileIcon,
  PhoneIcon,
  SalesIcon,
  UserIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "./Icons";
import { useSelector, useDispatch } from "react-redux";
import { addRemoveMemberDepts, getUsers, getMemberDepartments,getUser,getTrialUsers } from "../redux/actions/user";
import { getDepartments,getDepartmentMembers } from "../redux/actions/department";

function AddEditUserDepartmentModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const memberExistDeptList = useSelector(
    (state) => (state.user && state.user.exist_departments) || []
  ); 
  const memberNotExistDeptList = useSelector(
    (state) => (state.user && state.user.not_exist_departments) || []
  ); 
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  ); 
  const departmentEdit = useSelector(
    (state) => (state.department && state.department.single) || {}
  );

  const onFinish = async (form_values) => {
    console.log("Received values of form: ", form_values);
    // closeAddModal();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
  };

  const deptAction = async(action,userId,deptId) => {
    let companyId = companyEdit.id ? companyEdit.id : "";
    let departmentId = departmentEdit ? departmentEdit.id : "";

    var headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    let param = { action,userId,deptId  };
    await dispatch(addRemoveMemberDepts(param,setHeaders));
    
    // Get Member's Department
    let param1 = {recordId:userId};
    dispatch(getMemberDepartments(param1, setHeaders));

    if(props.pageName == "dashboard") {
      let param2 = {};
      dispatch(getUsers(param2,setHeaders));  
    }
    else if(props.pageName == "companyDetail") {
      let param2 = {companyId};
      dispatch(getUsers(param2,setHeaders));       
      let param3 = { companyId };
      dispatch(getDepartments(param3,setHeaders)); 
    }
    else if(props.pageName == "departmentDetail") {
      let param = {recordId:departmentId};
      dispatch(getDepartmentMembers(param, setHeaders));
    }
    else if(props.pageName == "userDetail") {
      let param = { recordId:userId };
      dispatch(getUser(param, setHeaders));
    }
    else if(props.pageName == "trialUsers") {
      let param2 = {licenseType:'trial'};
      dispatch(getTrialUsers(param2,setHeaders));  
    }
  }

  return (
    <Fragment>
      <Modal
        title="Add/Remove Department"
        visible={props.visible}
        centered
        footer={false}
        onCancel={closeAddModal}
        className="user_depart_add_edit_modal"
        destroyOnClose={true}
        width={450}
      >
        <div className="department-section">
          <h3>Department - ({(!memberExistDeptList || memberExistDeptList.length === 0) ? '0' : memberExistDeptList.length})</h3>
          <div className={"active-department " + (!memberExistDeptList || memberExistDeptList.length < 3 ? " ":"active-department-scroll")}>
            {(!memberExistDeptList || memberExistDeptList.length === 0) ? (
                <div style={{textAlign:"center"}}>No Data Available</div>
              ) :memberExistDeptList.map((mem,index) => (
              <Row key={index} className="departments-div">
                <Col xl={3} sm={3} md={3} xs={5} lg={3}>
                  <span className="st-icon">
                    <HirarchyIcon />
                  </span>
                </Col>
                <Col  className="deptName" xl={19} sm={19} md={19} xs={17} lg={19}>{mem.deptName}</Col>
                <Col xl={2} sm={2} md={2} xs={2} lg={2}>
                  <span className="st-icon2" onClick={() => deptAction("remove",mem.userId,mem.deptId)}>
                    <UserMinusIcon />
                  </span>
                </Col>
              </Row>
            ))}
          </div>
          <Divider />
          <h3>Available - ({(!memberNotExistDeptList || memberNotExistDeptList.length === 0) ? '0' : memberNotExistDeptList.length})</h3>
          <div className="available-department ">
            {(!memberNotExistDeptList || memberNotExistDeptList.length === 0) ? (
                <div style={{textAlign:"center"}}>No Data Available</div>
              ) :memberNotExistDeptList.map((mem,index) => (
              <Row key={index} className="departments-div">
                <Col xl={3} sm={3} md={3} xs={5} lg={3}>
                  <span className="st-icon">
                    <HirarchyIcon />
                  </span>
                </Col>
                <Col className="deptName" xl={19} sm={19} md={19} xs={17} lg={19}>{mem.deptName} ddf</Col>
                <Col xl={2} sm={2} md={2} xs={2} lg={2}>
                  <span className="st-icon2" onClick={() => deptAction("add",mem.userId,mem.deptId)}>
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

export default AddEditUserDepartmentModal;
