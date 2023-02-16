import React, { Fragment, useState, useEffect } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/department_detail.css";

import {
  Row,
  Col,
  Card,
  Typography,
  Select,
  DatePicker,
  Avatar,
  Image,
  Input,
  Tooltip,
  Button,
  Breadcrumb,
  Empty
} from "antd";
import { useTranslation, Trans } from "react-i18next";
import {
  AerrowRightIcon,
  AtIcon,
  CalendarCheckIcon,
  CoinIcon,
  DeptIcon,
  HirarchyIcon,
  MobileIcon,
  PhoneIcon,
  SalesIcon,
  SearchIcon,
  SecureKeyIcon,
  UserIcon,
  UsersIcon,
  PenIcon,
  UserCogIcon,
} from "./Icons";
import UserLicenseModal from "./UserLicenseModal";
import AddEditUserDepartmentModal from "./AddEditUserDepartmentModal";
import AddEditDepartmentUserModal from "./AddEditDepartmentUserModal";
import DepartmentEditModal from "./DepartmentEditModal";
import UserResetPasswordModal from "./UserResetPasswordModal";
import UserEditModal from "./UserEditModal";
import UserLoginActivitiesModal from "./UserLoginActivitiesModal";

import { useSelector, useDispatch } from "react-redux";
import { hasFlag } from "country-flag-icons";
import moment from "moment-timezone";

import { getDateDurationText } from "../utils/helpers";
import { getUsers, getUser, getMemberDepartments,getUserLoginActivities } from "../redux/actions/user";
import { getCommon } from "../redux/actions/common";
import { getDepartment,getDepartmentMembers } from "../redux/actions/department";

const { Title } = Typography;
const { TextArea } = Input;

function Dashboard(props) {
  const { location } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

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
  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const [visibleUserLoginActivitiesModal, setVisibleUserLoginActivitiesModal] = useState(false);


  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const departmentEdit = useSelector(
    (state) => (state.department && state.department.single) || {}
  );
  const userList = useSelector(
    (state) => (state.user && state.user.list) || {}
  );

  const departmentExistMemberList = useSelector(
    (state) => (state.department && state.department.exist_members) || []
  ); 
  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };
  useEffect(() => {
    let recordId = props.match.params.id;
    dispatch(getCommon({}, setHeaders));
    getDepartmentDetail(recordId);
    getUserList(recordId);
  }, []);

  const getDepartmentDetail = (recordId) => {
    let param = { recordId };
    dispatch(getDepartment(param, setHeaders));
  };
  const getUserList = (recordId) => {
    let param = {recordId};
    dispatch(getDepartmentMembers(param, setHeaders));
  };

  const editDepartment = (recordId) => {
    let param = {recordId};
    dispatch(getDepartment(param, setHeaders));
    setVisibleDepartmentEditModal(true);
  }

  const getDepartmentUsers = async(recordId) => {
    let param = {recordId};
    dispatch(getDepartmentMembers(param, setHeaders));
    setVisibleAddEditDepartmentUserModal(true);
  }

  const editUser = (recordId, editLicense=false) => {
    let param = {recordId};
    dispatch(getUser(param, setHeaders));

    if(editLicense) {
      setVisibleUserLicenseModal(true)
    }
    else{
      setVisibleUserEditModal(true);
    }
  }

  const getUserDepartments = async(recordId) => {
    let param = {recordId};
    dispatch(getMemberDepartments(param, setHeaders));
    setVisibleAddEditUserDepartmentModal(true);
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
        <div className="department_detail_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/company-detail/${departmentEdit.companyId}`}>{departmentEdit.companyName}</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{departmentEdit.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <div className="department_section">
                <AddEditDepartmentUserModal
                  visible={visibleAddEditDepartmentUserModal}
                  visibleFunc={setVisibleAddEditDepartmentUserModal}
                  pageName="departmentDetail"
                />
                <DepartmentEditModal
                  visible={visibleDepartmentEditModal}
                  visibleFunc={setVisibleDepartmentEditModal}
                  pageName="departmentDetail"
                />
                <div className="department_list">
                  <Card
                    title={<Title level={5}>{departmentEdit.name ? departmentEdit.name : "N/A"}</Title>}
                    extra={
                      <span
                        style={{ display: "flex", cursor: "pointer" }}
                        onClick={() => editDepartment(departmentEdit.id)}
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
                          onClick={() => getDepartmentUsers(departmentEdit.id)}
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
                            <span className="st-stext">{departmentEdit.userCount}</span>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="user_section">
                <UserLicenseModal
                  visible={visibleUserLicenseModal}
                  visibleFunc={setVisibleUserLicenseModal}
                  pageName={'departmentDetail'}
                />
                <AddEditUserDepartmentModal
                  visible={visibleAddEditUserDepartmentModal}
                  visibleFunc={setVisibleAddEditUserDepartmentModal}
                  pageName={'departmentDetail'}
                />
                <UserEditModal
                  visible={visibleUserEditModal}
                  visibleFunc={setVisibleUserEditModal}
                  pageName={'departmentDetail'}
                />
                <UserResetPasswordModal
                  visible={visibleUserResetPasswordModal}
                  visibleFunc={setVisibleUserResetPasswordModal}
                  pageName={'departmentDetail'}
                />
                <UserLoginActivitiesModal
                  visible={visibleUserLoginActivitiesModal}
                  visibleFunc={setVisibleUserLoginActivitiesModal}
                  pageName={'departmentDetail'}
                />
                <Title level={5} className="heading">
                  Users
                </Title>
                <div className="user_list">
                  {!departmentExistMemberList || departmentExistMemberList.length == 0 ? (
                    <div className="noData">
                      <Empty />
                    </div>
                  ) : (
                    departmentExistMemberList.map((item, index) => (
                      <Card
                        key={item.userId}
                        title={
                          <Title level={5}>
                            {(item.ufirstName ? item.ufirstName : "N/A") + " " + (item.ulastName ? item.ulastName : "N/A")}
                          </Title>
                        }
                        extra={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {hasFlag(item.ucountryCode) ? (
                              <img alt="img" height={15}
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.ucountryCode}.svg`}
                              />
                            ) : null}
                            <span
                              style={{
                                display: "flex",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => editUser(item.userId)}
                            >
                              <PenIcon height={15} width={15} />
                            </span>
                          </div>
                        }
                        className="user-card"
                      >
                        <Row>
                          <Col span={24}>
                            {(item.ucontractNumber ? item.ucontractNumber : "N/A")+ " | " + (item.uorderNumber ? item.uorderNumber : "N/A")}
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <AtIcon height={13} width={13} />
                              {
                                !item.ueMail ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`mailto:${item.ueMail}`}>
                                    {item.ueMail}
                                  </a>
                                )
                              }
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <PhoneIcon height={13} width={13} />
                              {
                                !item.utelephone ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`tel:${item.utelephone}`}>
                                    {item.utelephone}
                                  </a>
                                )
                              }
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <MobileIcon height={13} width={13} />
                              {
                                !item.umobile ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`tel:${item.umobile}`}>
                                    {item.umobile}
                                  </a>
                                )
                              }
                            </div>
                          </Col>
                          <Col span={24} className="ustastic-main">
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.userId, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <SalesIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">{item.ulicense ? item.ulicense : "N/A"}</span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.userId, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <UserIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {item.ulicenseRole ? item.ulicenseRole : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.userId, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <CalendarCheckIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {item.ulicenseExpiryDate ? item.ulicenseExpiryDate : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => getUserDepartments(item.userId)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <HirarchyIcon height={18} width={18} />
                                </span>
                                <span className="st-stext">
                                  {item.departmentCount}
                                </span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => getUserLoginActivitiesF(item.userId) }>
                              <div>
                                <span className="st-sicon">
                                  <AerrowRightIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {getDateDurationText(
                                    item.ulastLogin,
                                    moment()
                                  )}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUserResetPassword(item.userId)}
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
                    ))
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
