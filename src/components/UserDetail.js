import React, { Fragment, useState, useEffect } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/user_detail.css";

import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Breadcrumb,
  Empty
} from "antd";
import {
  AerrowRightIcon,
  AtIcon,
  CalendarCheckIcon,
  HirarchyIcon,
  MobileIcon,
  PhoneIcon,
  SalesIcon,
  SecureKeyIcon,
  UserIcon,
  UsersIcon,
  PenIcon,
  UserCogIcon,
} from "./Icons";
import UserEditModal from "./UserEditModal";
import AddEditUserDepartmentModal from "./AddEditUserDepartmentModal";
import AddEditDepartmentUserModal from "./AddEditDepartmentUserModal";
import DepartmentEditModal from "./DepartmentEditModal";
import UserLicenseModal from "./UserLicenseModal";
import UserResetPasswordModal from "./UserResetPasswordModal";
import UserLoginActivitiesModal from "./UserLoginActivitiesModal";

import { useSelector, useDispatch } from "react-redux";
import { hasFlag } from "country-flag-icons";
import moment from "moment-timezone";

import { getDateDurationText } from "../utils/helpers";
import { getUser, getMemberDepartments, updateUser,getUserLoginActivities } from "../redux/actions/user";
import { getCommon } from "../redux/actions/common";
import { getDepartment,getDepartmentMembers } from "../redux/actions/department";

const { Title } = Typography;
const { TextArea } = Input;

function Dashboard(props) {
  const { location } = props;
  const dispatch = useDispatch();

  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const [visibleUserLicenseModal, setVisibleUserLicenseModal] = useState(false);
  const [
    visibleAddEditUserDepartmentModal,
    setVisibleAddEditUserDepartmentModal,
  ] = useState(false);
  const [
    visibleAddEditDepartmentUserModal,
    setVisibleAddEditDepartmentUserModal,
  ] = useState(false);
  const [visibleDepartmentEditModal, setVisibleDepartmentEditModal] =
    useState(false);
  const [visibleUserResetPasswordModal, setVisibleUserResetPasswordModal] =
    useState(false);
    const [notes, setnotes] = useState("");
    const [visibleUserLoginActivitiesModal, setVisibleUserLoginActivitiesModal] = useState(false);


  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userEdit = useSelector(
    (state) => (state.user && state.user.single) || {}
  );
  const memberExistDepartmentList = useSelector(
    (state) => (state.user && state.user.exist_departments) || []
  );

  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };

  useEffect(() => {
    const fetchData = async () => {
      let recordId = props.match.params.id;
      
      await dispatch(getCommon({}, setHeaders));
      await getUserDetail(recordId);
      await getDepartmentList(recordId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setnotes(userEdit.notes);
  }, [userEdit]);

  const getUserDetail = (recordId) => {
    let param = { recordId };
    dispatch(getUser(param, setHeaders));
  };
  const getDepartmentList = (recordId) => {
    let param = { recordId };
    dispatch(getMemberDepartments(param, setHeaders));
  };
  const editDepartment = (recordId) => {
    let param = { recordId };
    dispatch(getDepartment(param, setHeaders));
    setVisibleDepartmentEditModal(true);
  };
  const editUser = (recordId, editLicense = false) => {
    let param = { recordId };
    dispatch(getUser(param, setHeaders));

    if (editLicense) {
      setVisibleUserLicenseModal(true);
    } else {
      setVisibleUserEditModal(true);
    }
  };
  const getUserDepartments = async(recordId) => {
    let param = {recordId};
    dispatch(getMemberDepartments(param, setHeaders));
    setVisibleAddEditUserDepartmentModal(true);
  }
  const getDepartmentUsers = async(recordId) => {
    let param = {recordId};
    dispatch(getDepartmentMembers(param, setHeaders));
    setVisibleAddEditDepartmentUserModal(true);
  }
  const handleNotes = (e) => {
    setnotes(e.target.value);
  }
  const updateNotes = async(e) => {
    let recordId = userEdit.id ? userEdit.id : ""
    let param = { recordId, notes  };
    await dispatch(updateUser(param,setHeaders));
    getUserDetail(recordId);
  }
  const editUserResetPassword = (recordId) => {
    let param = {recordId};
    dispatch(getUser(param, setHeaders));
    setVisibleUserResetPasswordModal(true);
  }
  const getUserLoginActivitiesF = async(recordId) => {
    let param = { recordId: recordId, other: {
      timezone: moment.tz.guess(true),
    } };
    dispatch(getUserLoginActivities(param, setHeaders));
    setVisibleUserLoginActivitiesModal(true);
  }
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Layout location={location}>
        <div className="user_detail_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/company-detail/${userEdit.companyId}`}>
                    {userEdit.companyName}
                  </NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{(userEdit.firstName ? userEdit.firstName : "N/A") + " " + (userEdit.lastName ? userEdit.lastName : "N/A") }</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="user_section">
                <UserEditModal
                  visible={visibleUserEditModal}
                  visibleFunc={setVisibleUserEditModal}
                  pageName="userDetail"
                />
                <UserLicenseModal
                  visible={visibleUserLicenseModal}
                  visibleFunc={setVisibleUserLicenseModal}
                  pageName="userDetail"
                />
                <AddEditUserDepartmentModal
                  visible={visibleAddEditUserDepartmentModal}
                  visibleFunc={setVisibleAddEditUserDepartmentModal}
                  pageName="userDetail"
                />
                <UserResetPasswordModal
                  visible={visibleUserResetPasswordModal}
                  visibleFunc={setVisibleUserResetPasswordModal}
                  pageName="userDetail"
                />
                <UserLoginActivitiesModal
                  visible={visibleUserLoginActivitiesModal}
                  visibleFunc={setVisibleUserLoginActivitiesModal}
                  pageName={'userDetail'}
                />
                <div className="user_list">
                  <Card
                    key={userEdit.id}
                    title={
                      <Title level={5}>
                        {(userEdit.firstName ? userEdit.firstName : "N/A") + " " + (userEdit.lastName ? userEdit.lastName : "N/A")}
                      </Title>
                    }
                    extra={
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        {hasFlag(userEdit.countryCode) ? (
                          <img alt="img" height={15} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${userEdit.countryCode}.svg`}
                          />
                        ) : null}
                        <span
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => editUser(userEdit.id)}
                        >
                          <PenIcon height={15} width={15} />
                        </span>
                      </div>
                    }
                    className="user-card"
                  >
                    <Row>
                      <Col span={24}>
                        {(userEdit.contractNumber ? userEdit.contractNumber : "N/A") + " | " + (userEdit.orderNumber ? userEdit.orderNumber : "N/A")}
                      </Col>
                      <Col span={24}>
                        <div className="ucard-cnt">
                          <AtIcon height={13} width={13} />
                          {
                            !userEdit.eMail ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                              <a href={`mailto:${userEdit.eMail}`}>
                                {userEdit.eMail}
                              </a>
                            )
                          }
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="ucard-cnt">
                          <PhoneIcon height={13} width={13} />
                          {
                            !userEdit.telephone ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                              <a href={`tel:${userEdit.telephone}`}>
                                {userEdit.telephone}
                              </a>
                            )
                          }
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="ucard-cnt">
                          <MobileIcon height={13} width={13} />
                          {
                            !userEdit.mobile ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                              <a href={`tel:${userEdit.mobile}`}>
                                {userEdit.mobile}
                              </a>
                            )
                          }
                        </div>
                      </Col>
                      <Col span={24} className="ustastic-main">
                        <div
                          className={"ustastic-div"}
                          onClick={() => editUser(userEdit.id, true)}
                        >
                          <div>
                            <span className="st-sicon">
                              <SalesIcon height={15} width={15} />
                            </span>
                            <span className="st-stext">{userEdit.license ? userEdit.license : "N/A"}</span>
                          </div>
                        </div>
                        <div
                          className={"ustastic-div"}
                          onClick={() => editUser(userEdit.id, true)}
                        >
                          <div>
                            <span className="st-sicon">
                              <UserIcon height={15} width={15} />
                            </span>
                            <span className="st-stext">
                              {userEdit.licenseRole ? userEdit.licenseRole : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div
                          className={"ustastic-div"}
                          onClick={() => editUser(userEdit.id, true)}
                        >
                          <div>
                            <span className="st-sicon">
                              <CalendarCheckIcon height={15} width={15} />
                            </span>
                            <span className="st-stext">
                              {userEdit.licenseExpiryDate ? userEdit.licenseExpiryDate : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div
                          className={"ustastic-div"}
                          onClick={() => getUserDepartments(userEdit.id)}
                        >
                          <div>
                            <span className="st-sicon">
                              <HirarchyIcon height={18} width={18} />
                            </span>
                            <span className="st-stext">
                              {userEdit.deptCount}
                            </span>
                          </div>
                        </div>
                        <div className={"ustastic-div"} onClick={() => getUserLoginActivitiesF(userEdit.id) }>
                          <div>
                            <span className="st-sicon">
                              <AerrowRightIcon height={15} width={15} />
                            </span>
                            <span className="st-stext">
                              {getDateDurationText(
                                userEdit.lastLogin,
                                moment()
                              )}
                            </span>
                          </div>
                        </div>
                        <div
                          className={"ustastic-div"}
                          onClick={() => editUserResetPassword(userEdit.id)}
                        >
                          <div>
                            <span className="st-sicon">
                              <SecureKeyIcon height={15} width={15} />
                            </span>
                            <span className="st-stext">Reset</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                  <Card
                    key={2}
                    title={<Title level={5}>Notes</Title>}
                    className="company-card"
                  >
                    <Row>
                      <Col span={24}>
                        <TextArea rows={5} className="note_text_area" value={notes} onChange={handleNotes} />
                      </Col>
                      <Col span={24} className="note_btn_section">
                        <Button type="link" className="cancel_btn">
                          Cancel
                        </Button>
                        <Button type="primary" className="save_btn" onClick={updateNotes}>
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="department_section">
                <AddEditDepartmentUserModal
                  visible={visibleAddEditDepartmentUserModal}
                  visibleFunc={setVisibleAddEditDepartmentUserModal}
                  pageName={'userDetail'}
                />
                <DepartmentEditModal
                  visible={visibleDepartmentEditModal}
                  visibleFunc={setVisibleDepartmentEditModal}
                  pageName={'userDetail'}
                />
                <Title level={5} className="heading">
                  Departments
                </Title>
                <div className="department_list">
                {
                  (!memberExistDepartmentList || memberExistDepartmentList.length === 0) ? (
                    <div className="noData"><Empty /></div>
                  ) :
                  memberExistDepartmentList.map(
                    (item,index) => (
                      <Card
                        key={index}
                        title={
                          <NavLink
                            to={`/department-detail/${item.deptId}`}
                            className="nav-text"
                          >
                            {item.deptName}
                          </NavLink>
                        }
                        extra={
                          <span
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={() => editDepartment(item.deptId)}
                          >
                            <PenIcon height={15} width={15} />
                          </span>
                        }
                        className="department-card"
                      >
                        <Row>
                          <Col span={24} className="dstastic-main">
                            <div
                              className={"dstastic-div"}
                              onClick={() => getDepartmentUsers(item.deptId) }
                            >
                              <div>
                                <span className="st-sicon">
                                  <UserCogIcon height={18} width={18} />
                                </span>
                                <span className="st-stext">Manage</span>
                              </div>
                            </div>
                            <div className={"dstastic-div remove-bg"}>
                              <div>
                                <span className="st-sicon">
                                  <UsersIcon eight={18} width={18} />
                                </span>
                                <span className="st-stext">{item.userCount}</span>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </Fragment>
  );
}
export default Dashboard;
