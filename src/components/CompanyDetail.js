import React, { Fragment, useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/company_detail.css";

import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Breadcrumb,
  Empty,
} from "antd";
import {
  AerrowRightIcon,
  AtIcon,
  CalendarCheckIcon,
  CoinIcon,
  HirarchyIcon,
  MobileIcon,
  PhoneIcon,
  SalesIcon,
  SecureKeyIcon,
  UserIcon,
  UsersIcon,
  PenIcon,
  UserCogIcon,
  PlusIcon,
  UserPlusIcon,
  InfinityIcon,
} from "./Icons";
import DepartmentAddModal from "./DepartmentAddModal";
import UserAddModal from "./UserAddModal";
import UserLicenseModal from "./UserLicenseModal";
import AddEditUserDepartmentModal from "./AddEditUserDepartmentModal";
import AddEditDepartmentUserModal from "./AddEditDepartmentUserModal";
import CompanyEditModal from "./CompanyEditModal";
import DepartmentEditModal from "./DepartmentEditModal";
import UserEditModal from "./UserEditModal";
import UserResetPasswordModal from "./UserResetPasswordModal";
import UserLoginActivitiesModal from "./UserLoginActivitiesModal";

import { useSelector, useDispatch } from "react-redux";
import { hasFlag } from "country-flag-icons";
import moment from "moment-timezone";
import { getDateDurationText } from "../utils/helpers";
//
import { getCompany, updateCompany } from "../redux/actions/company";
import {
  getDepartment,
  getDepartments,
  getDepartmentMembers,
} from "../redux/actions/department";
import {
  getUsers,
  getUser,
  getMemberDepartments,
  getUserLoginActivities,
} from "../redux/actions/user";
import { getCommon } from "../redux/actions/common";

const { Title } = Typography;
const { TextArea } = Input;

function Dashboard(props) {
  const { location } = props;
  const dispatch = useDispatch();

  const [visibleDepartmentAddModal, setVisibleDepartmentAddModal] =
    useState(false);
  const [visibleUserAddModal, setVisibleUserAddModal] = useState(false);
  const [visibleUserLicenseModal, setVisibleUserLicenseModal] = useState(false);
  const [
    visibleAddEditUserDepartmentModal,
    setVisibleAddEditUserDepartmentModal,
  ] = useState(false);
  const [
    visibleAddEditDepartmentUserModal,
    setVisibleAddEditDepartmentUserModal,
  ] = useState(false);
  const [visibleCompanyEditModal, setVisibleCompanyEditModal] = useState(false);
  const [visibleDepartmentEditModal, setVisibleDepartmentEditModal] =
    useState(false);
  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const [visibleUserResetPasswordModal, setVisibleUserResetPasswordModal] =
    useState(false);
  const [visibleUserLoginActivitiesModal, setVisibleUserLoginActivitiesModal] =
    useState(false);

  const [notes, setnotes] = useState("");

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );
  const departmentList = useSelector(
    (state) => (state.department && state.department.list) || {}
  );
  const departmentPagination = useSelector(
    (state) => (state.department && state.department.pagination) || {}
  );
  const userList = useSelector(
    (state) => (state.user && state.user.list) || {}
  );
  const userPagination = useSelector(
    (state) => (state.user && state.user.pagination) || []
  );
  const hiddenUserLoadMoreBtnRef = useRef(null);
  const hiddenDepartmentLoadMoreBtnRef = useRef(null);

  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };

  useEffect(() => {
    const fetchData = async () => {
      let recordId = props.match.params.id;
      await dispatch(getCommon({}, setHeaders));
      await getCompanyDetail(recordId);
      await getDepartmentList(recordId);
      await getUserList(recordId);
      await onScroll();
    };

    fetchData();
  }, []);

  useEffect(() => {
    setnotes(companyEdit.notes);
  }, [companyEdit]);

  const getCompanyDetail = (recordId) => {
    let param = { recordId };
    dispatch(getCompany(param, setHeaders));
  };

  const getDepartmentList = (recordId) => {
    let param1 = { companyId: recordId };
    dispatch(getDepartments(param1, setHeaders));
  };

  const getUserList = (recordId) => {
    let param1 = { companyId: recordId };
    dispatch(getUsers(param1, setHeaders));
  };

  const onScroll = () => {
    var DepartmentContener = document.querySelector("div.department_list");
    if (DepartmentContener) {
      DepartmentContener.addEventListener("scroll", (event) => {
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
          console.log("Reached User bottom");
          hiddenDepartmentLoadMoreBtnRef.current.click();
        }
      });
    }

    var userDiv = document.querySelector("div.user_list");
    if (userDiv) {
      userDiv.addEventListener("scroll", (event) => {
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
          console.log("Reached User bottom");
          hiddenUserLoadMoreBtnRef.current.click();
        }
      });
    }
  };

  const loadMoreDepartmentData = () => {
    if (departmentPagination) {
      let current_page = +departmentPagination.currentPage;
      let total_page = departmentPagination.totalPages;
      if (current_page < total_page) {
        let recordId = props.match.params.id;
        let UserParam = {
          companyId: recordId,
          current_page: parseInt(current_page + 1),
        };
        dispatch(getDepartments(UserParam, setHeaders));
      }
    }
  };

  const loadMoreUserData = () => {
    if (userPagination) {
      let current_page = +userPagination.currentPage;
      let total_page = userPagination.totalPages;
      if (current_page < total_page) {
        let recordId = props.match.params.id;
        let UserParam = {
          companyId: recordId,
          current_page: parseInt(current_page + 1),
        };
        dispatch(getUsers(UserParam, setHeaders));
      }
    }
  };

  const editCompany = (recordId) => {
    let param = { recordId };
    dispatch(getCompany(param, setHeaders));
    setVisibleCompanyEditModal(true);
  };

  const editDepartment = (recordId) => {
    let param = { recordId };
    dispatch(getDepartment(param, setHeaders));
    setVisibleDepartmentEditModal(true);
  };

  const handleNotes = (e) => {
    setnotes(e.target.value);
  };

  const updateNotes = async (e) => {
    let recordId = companyEdit.id ? companyEdit.id : "";
    let param = { recordId, notes };
    await dispatch(updateCompany(param, setHeaders));
    getCompanyDetail(recordId);
  };

  const getDepartmentUsers = async (recordId) => {
    let param = { recordId };
    dispatch(getDepartmentMembers(param, setHeaders));
    setVisibleAddEditDepartmentUserModal(true);
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

  const getUserDepartments = async (recordId) => {
    let param = { recordId };
    dispatch(getMemberDepartments(param, setHeaders));
    setVisibleAddEditUserDepartmentModal(true);
  };

  const editUserResetPassword = (recordId) => {
    let param = { recordId };
    dispatch(getUser(param, setHeaders));
    setVisibleUserResetPasswordModal(true);
  };

  const getUserLoginActivitiesF = async (recordId) => {
    let param = {
      recordId: recordId,
      other: {
        timezone: moment.tz.guess(true),
      },
    };
    dispatch(getUserLoginActivities(param, setHeaders));
    setVisibleUserLoginActivitiesModal(true);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Layout location={location}>
        <div className="company_detail_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/`}>Dashboard</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {companyEdit.name ? companyEdit.name : "N/A"}
                </Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <button
            ref={hiddenDepartmentLoadMoreBtnRef}
            onClick={loadMoreDepartmentData}
            style={{ display: "none" }}
          />
          <button
            ref={hiddenUserLoadMoreBtnRef}
            onClick={loadMoreUserData}
            style={{ display: "none" }}
          />
          <Row>
            <Col span={24}>
              <div className="company_section">
                <CompanyEditModal
                  visible={visibleCompanyEditModal}
                  visibleFunc={setVisibleCompanyEditModal}
                  pageName={"companyDetail"}
                />
                <div className="company_list">
                  <Card
                    key={companyEdit.id}
                    title={
                      <Title level={5}>
                        {companyEdit.name ? companyEdit.name : "N/A"}
                      </Title>
                    }
                    extra={
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {hasFlag(companyEdit.countryCode) ? (
                          <img
                            height={15}
                            src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${companyEdit.countryCode}.svg`}
                            alt={"img"}
                          />
                        ) : null}
                        <span
                          style={{
                            display: "flex",
                            marginLeft: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => editCompany(companyEdit.id)}
                        >
                          <PenIcon height={15} width={15} />
                        </span>
                      </div>
                    }
                    className="company-card"
                  >
                    <Row>
                      <Col span={24}>
                        {companyEdit.number ? companyEdit.number : "N/A"} |{" "}
                        {companyEdit.vatNumber ? companyEdit.vatNumber : "N/A"}
                      </Col>
                      <Col span={24}>
                        {companyEdit.billingAddress1
                          ? companyEdit.billingAddress1
                          : "N/A"}
                        ,{" "}
                        {companyEdit.billingPostCode
                          ? companyEdit.billingPostCode
                          : "N/A"}
                        ,{" "}
                        {companyEdit.billingCity
                          ? companyEdit.billingCity
                          : "N/A"}
                      </Col>
                      <Col span={24}>
                        {companyEdit.industry ? companyEdit.industry : "N/A"}
                      </Col>
                      <Col span={24} className="stastic-main">
                        <div className={"stastic-div"}>
                          <div>
                            <span className="st-sicon">
                              <CoinIcon height={15} />
                            </span>
                            {companyEdit.totalAmount == "infinity" ? (
                              <span
                                className="st-stext"
                                style={{ marginTop: "6px" }}
                              >
                                <InfinityIcon height={12} width={12} />{" "}
                              </span>
                            ) : (
                              <span className="st-stext">
                                {companyEdit.totalAmount}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className={"stastic-div"}>
                          <div>
                            <span className="st-sicon">
                              <HirarchyIcon height={18} width={18} />
                            </span>
                            <span className="st-stext">
                              {companyEdit.departmentCount}
                            </span>
                          </div>
                        </div>
                        <div className={"stastic-div"}>
                          <div>
                            <span className="st-sicon">
                              <UsersIcon eight={18} width={18} />
                            </span>
                            <span className="st-stext">
                              {companyEdit.userCount}
                            </span>
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
                        <TextArea
                          rows={5}
                          className="note_text_area"
                          value={notes}
                          onChange={handleNotes}
                        />
                      </Col>
                      <Col span={24} className="note_btn_section">
                        <Button type="link" className="cancel_btn">
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          className="save_btn"
                          onClick={updateNotes}
                        >
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
                <DepartmentAddModal
                  visible={visibleDepartmentAddModal}
                  visibleFunc={setVisibleDepartmentAddModal}
                  pageName={"companyDetail"}
                />
                <AddEditDepartmentUserModal
                  visible={visibleAddEditDepartmentUserModal}
                  visibleFunc={setVisibleAddEditDepartmentUserModal}
                  pageName={"companyDetail"}
                />
                <DepartmentEditModal
                  visible={visibleDepartmentEditModal}
                  visibleFunc={setVisibleDepartmentEditModal}
                  pageName={"companyDetail"}
                />
                <Title level={5} className="heading">
                  Departments
                </Title>
                <div
                  className={
                    "department_list " +
                    (!departmentList || departmentList.length <= 5
                      ? ""
                      : "department_list_height")
                  }
                >
                  {!departmentList || departmentList.length <= 0 ? (
                    <div className="noData">
                      <Empty />
                    </div>
                  ) : (
                    departmentList.map((item, index) => (
                      <Card
                        key={item.id}
                        title={
                          <NavLink
                            to={`/department-detail/${item.id}`}
                            className="nav-text"
                          >
                            {item.name}
                          </NavLink>
                        }
                        extra={
                          <span
                            style={{ display: "flex", cursor: "pointer" }}
                            onClick={() => editDepartment(item.id)}
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
                              onClick={() => getDepartmentUsers(item.id)}
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
                                <span className="st-stext">
                                  {item.userCount}
                                </span>
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
          <Row>
            <Col span={24}>
              <div className="user_section">
                <UserAddModal
                  visible={visibleUserAddModal}
                  visibleFunc={setVisibleUserAddModal}
                  pageName={"companyDetail"}
                />
                <UserLicenseModal
                  visible={visibleUserLicenseModal}
                  visibleFunc={setVisibleUserLicenseModal}
                  pageName={"companyDetail"}
                />
                <AddEditUserDepartmentModal
                  visible={visibleAddEditUserDepartmentModal}
                  visibleFunc={setVisibleAddEditUserDepartmentModal}
                  pageName={"companyDetail"}
                />
                <UserEditModal
                  visible={visibleUserEditModal}
                  visibleFunc={setVisibleUserEditModal}
                  pageName={"companyDetail"}
                />
                <UserResetPasswordModal
                  visible={visibleUserResetPasswordModal}
                  visibleFunc={setVisibleUserResetPasswordModal}
                  pageName={"companyDetail"}
                />
                <UserLoginActivitiesModal
                  visible={visibleUserLoginActivitiesModal}
                  visibleFunc={setVisibleUserLoginActivitiesModal}
                  pageName={"companyDetail"}
                />
                <Title level={5} className="heading">
                  Users
                </Title>
                <div
                  className={
                    "user_list " +
                    (!userList || userList.length <= 5
                      ? " "
                      : "user_list_height")
                  }
                >
                  {!userList || userList.length == 0 ? (
                    <div className="noData">
                      <Empty />
                    </div>
                  ) : (
                    userList.map((item, index) => (
                      <Card
                        key={item.id}
                        title={
                          <NavLink
                            to={`/user-detail/${item.id}`}
                            className="nav-text"
                          >
                            {(item.firstName ? item.firstName : "N/A") +
                              " " +
                              (item.lastName ? item.lastName : "N/A")}
                          </NavLink>
                        }
                        extra={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {hasFlag(item.countryCode) ? (
                              <img
                                height={15}
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
                                alt={"img"}
                              />
                            ) : null}
                            <span
                              style={{
                                display: "flex",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => editUser(item.id)}
                            >
                              <PenIcon height={15} width={15} />
                            </span>
                          </div>
                        }
                        className="user-card"
                      >
                        <Row>
                          <Col span={24}>
                            {(item.contractNumber
                              ? item.contractNumber
                              : "N/A") +
                              " | " +
                              (item.orderNumber ? item.orderNumber : "N/A")}
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <AtIcon height={13} width={13} />
                              {!item.eMail ? (
                                <span style={{ marginLeft: "10px" }}>N/A</span>
                              ) : (
                                <a href={`mailto:${item.eMail}`}>
                                  {item.eMail}
                                </a>
                              )}
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <PhoneIcon height={13} width={13} />
                              {!item.telephone ? (
                                <span style={{ marginLeft: "10px" }}>N/A</span>
                              ) : (
                                <a href={`tel:${item.telephone}`}>
                                  {item.telephone}
                                </a>
                              )}
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <MobileIcon height={13} width={13} />
                              {!item.mobile ? (
                                <span style={{ marginLeft: "10px" }}>N/A</span>
                              ) : (
                                <a href={`tel:${item.mobile}`}>{item.mobile}</a>
                              )}
                            </div>
                          </Col>
                          <Col span={24} className="ustastic-main">
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.id, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <SalesIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {item.license ? item.license : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.id, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <UserIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {item.licenseRole ? item.licenseRole : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUser(item.id, true)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <CalendarCheckIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {item.licenseExpiryDate
                                    ? item.licenseExpiryDate
                                    : "N/A"}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => getUserDepartments(item.id)}
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
                            <div
                              className={"ustastic-div"}
                              onClick={() => getUserLoginActivitiesF(item.id)}
                            >
                              <div>
                                <span className="st-sicon">
                                  <AerrowRightIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">
                                  {getDateDurationText(
                                    item.lastLogin,
                                    moment()
                                  )}
                                </span>
                              </div>
                            </div>
                            <div
                              className={"ustastic-div"}
                              onClick={() => editUserResetPassword(item.id)}
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
          <Row>
            <Col span={24} className="bottom_footer">
              <Button
                className="footer-btn"
                type="primary"
                onClick={() => setVisibleDepartmentAddModal(true)}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ marginRight: "5px" }}>
                    <PlusIcon height={14} width={14} />
                  </span>
                  <span>Add Department</span>
                </div>
              </Button>
              &nbsp;&nbsp;
              <Button
                className="footer-btn"
                type="primary"
                onClick={() => setVisibleUserAddModal(true)}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ marginRight: "5px" }}>
                    <UserPlusIcon height={18} width={18} />
                  </span>
                  <span>Add User</span>
                </div>
              </Button>
            </Col>
          </Row>
        </div>
      </Layout>
    </Fragment>
  );
}
export default Dashboard;
