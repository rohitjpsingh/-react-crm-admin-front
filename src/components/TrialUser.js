import React, { Fragment, useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/trial_user.css";

import { Row, Col, Card, Typography, Breadcrumb, Empty } from "antd";
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
  PenIcon,
} from "./Icons";
import UserLicenseModal from "./UserLicenseModal";
import AddEditUserDepartmentModal from "./AddEditUserDepartmentModal";
import UserEditModal from "./UserEditModal";
import UserResetPasswordModal from "./UserResetPasswordModal";
import UserLoginActivitiesModal from "./UserLoginActivitiesModal";

import { useSelector, useDispatch } from "react-redux";
import { hasFlag } from "country-flag-icons";
import moment from "moment-timezone";
import { getDateDurationText } from "../utils/helpers";
//
import {
  getTrialUsers,
  getUser,
  getMemberDepartments,
  getUserLoginActivities,
} from "../redux/actions/user";
import { getCommon } from "../redux/actions/common";

const { Title } = Typography;

function Dashboard(props) {
  const { location } = props;
  const dispatch = useDispatch();

  useState(false);
  const [visibleUserLicenseModal, setVisibleUserLicenseModal] = useState(false);
  const [
    visibleAddEditUserDepartmentModal,
    setVisibleAddEditUserDepartmentModal,
  ] = useState(false);
  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const [visibleUserResetPasswordModal, setVisibleUserResetPasswordModal] =
    useState(false);
  const [visibleUserLoginActivitiesModal, setVisibleUserLoginActivitiesModal] =
    useState(false);

  const hiddenUserLoadMoreBtnRef = useRef(null);

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userList = useSelector(
    (state) => (state.user && state.user.trial_user_list) || []
  );
  const userPagination = useSelector(
    (state) => (state.user && state.user.pagination) || []
  );

  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };

  useEffect(() => {
    dispatch(getCommon({}, setHeaders));
    getUserList();
    onScroll();
  }, []);

  const onScroll = () => {
    var UserContent = document.querySelector("div.user_list");
    if (UserContent) {
      UserContent.addEventListener("scroll", (event) => {
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

  const loadMoreUserData = () => {
    if (userPagination) {
      let current_page = +userPagination.currentPage;
      let total_page = userPagination.totalPages;
      if (current_page < total_page) {
        let UserParam = {
          licenseType: "trial",
          current_page: parseInt(current_page + 1),
        };
        dispatch(getTrialUsers(UserParam, setHeaders));
      }
    }
  };

  const getUserList = () => {
    let param1 = { licenseType: "trial" };
    dispatch(getTrialUsers(param1, setHeaders));
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
        <div className="trial_user_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/`}>Dashboard</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Trial Users</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <button
            ref={hiddenUserLoadMoreBtnRef}
            onClick={loadMoreUserData}
            style={{ display: "none" }}
          />
          <Row>
            <Col span={24}>
              <div className="user_section">
                <UserLicenseModal
                  visible={visibleUserLicenseModal}
                  visibleFunc={setVisibleUserLicenseModal}
                  pageName={"trialUsers"}
                />
                <AddEditUserDepartmentModal
                  visible={visibleAddEditUserDepartmentModal}
                  visibleFunc={setVisibleAddEditUserDepartmentModal}
                  pageName={"trialUsers"}
                />
                <UserEditModal
                  visible={visibleUserEditModal}
                  visibleFunc={setVisibleUserEditModal}
                  pageName={"trialUsers"}
                />
                <UserResetPasswordModal
                  visible={visibleUserResetPasswordModal}
                  visibleFunc={setVisibleUserResetPasswordModal}
                  pageName={"trialUsers"}
                />
                <UserLoginActivitiesModal
                  visible={visibleUserLoginActivitiesModal}
                  visibleFunc={setVisibleUserLoginActivitiesModal}
                  pageName={"trialUsers"}
                />
                <Title level={5} className="heading">
                  Users
                </Title>
                <div className="user_list">
                  {!userList || userList.length === 0 ? (
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
                                alt="img"
                                height={15}
                                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`}
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
                            <div className="ucard-cnt setTitle">
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
        </div>
      </Layout>
    </Fragment>
  );
}
export default Dashboard;
