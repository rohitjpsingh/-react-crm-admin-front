import React, { Fragment, useState, useEffect,useRef } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/dashboard.css";
import {
  Row,
  Col,
  Card,
  Typography,
  Input,
  Button,
  Empty
} from "antd";
import { useTranslation, Trans } from "react-i18next";
import {
  AerrowRightIcon,
  AtIcon,
  CalendarCheckIcon,
  CoinIcon,
  HirarchyIcon,
  MobileIcon,
  PenIcon,
  PhoneIcon,
  PlusIcon,
  SalesIcon,
  SearchIcon,
  SecureKeyIcon,
  UserIcon,
  UsersIcon,
  InfinityIcon
} from "./Icons";
import CompanyAddModal from "./CompanyAddModal";
import UserLicenseModal from "./UserLicenseModal";
import AddEditUserDepartmentModal from "./AddEditUserDepartmentModal";
import UserResetPasswordModal from "./UserResetPasswordModal";
import CompanyEditModal from "./CompanyEditModal";
import UserEditModal from "./UserEditModal";
import UserLoginActivitiesModal from "./UserLoginActivitiesModal";
import { useDispatch,useSelector } from 'react-redux';
import { hasFlag } from 'country-flag-icons';
import moment from "moment-timezone";
import { getDateDurationText } from "../utils/helpers";
//
import { getCompanies, getCompany, removeCompanyList } from "../redux/actions/company";
import { getUsers, getUser, getMemberDepartments, removeUserList, getUserLoginActivities } from "../redux/actions/user";
import { getCommon,setSearchKeyword,removeSearchKeyword } from "../redux/actions/common";

const { Title } = Typography;

function Dashboard(props) {
  const { location } = props;
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const [visibleCompanyAddModal, setVisibleCompanyAddModal] = useState(false);
  const [visibleUserLicenseModal, setVisibleUserLicenseModal] = useState(false);
  const [visibleAddEditUserDepartmentModal, setVisibleAddEditUserDepartmentModal] = useState(false);
  const [visibleUserLoginActivitiesModal, setVisibleUserLoginActivitiesModal] = useState(false);
  const [visibleUserResetPasswordModal, setVisibleUserResetPasswordModal] = useState(false);
  const [visibleCompanyEditModal, setVisibleCompanyEditModal] = useState(false);
  const [visibleUserEditModal, setVisibleUserEditModal] = useState(false);
  const [searchValue, setsearchValue] = useState("");

  const hiddenLoadMoreBtnRef = useRef(null);
  const hiddenUserLoadMoreBtnRef = useRef(null);

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user.userId) || ""
  );
  const companyList = useSelector(
    (state) => (state.company && state.company.list) || []
  );
  const companyPagination = useSelector(
    (state) => (state.company && state.company.pagination) || []
  );

  const userList = useSelector(
    (state) => (state.user && state.user.list) || []
  );
  const userPagination = useSelector(
    (state) => (state.user && state.user.pagination) || []
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
    const fetchData = async () => {
      let param = {};
      await dispatch(getCommon(param,setHeaders));
      if(searchKeyword){
        await setsearchValue(searchKeyword);
        let param = {searchKeyword:searchKeyword};
        await dispatch(getCompanies(param,setHeaders));
        await dispatch(getUsers(param,setHeaders));
      }
      else {
        await dispatch(removeCompanyList());
        await dispatch(removeUserList());
      }
      onScroll();
    };
    fetchData();
  }, []);

  const onScroll = () => {

    var CompanyContent = document.querySelector("div.company_list");
    if(CompanyContent) {
      CompanyContent.addEventListener('scroll', (event) => {
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
           // load more data
          console.log('Reached Company bottom');
          hiddenLoadMoreBtnRef.current.click();
        }
      });
    }
    
    var UserContent = document.querySelector("div.user_list");
    if(UserContent) {
      UserContent.addEventListener('scroll', (event) => {
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
          console.log('Reached User bottom');
          hiddenUserLoadMoreBtnRef.current.click();
        }
      });
    }
  }

  const loadMore = () => {
    if(companyPagination)
    {
      let current_page = + companyPagination.currentPage;
      let total_page = companyPagination.totalPages;
      if(current_page < total_page){          

        if(searchValue) {
          let companyParam = {searchKeyword:searchValue, current_page: parseInt(current_page + 1)};
          dispatch(getCompanies(companyParam,setHeaders));
          dispatch(setSearchKeyword(searchValue));
        }
        else {
          dispatch(removeCompanyList());
          dispatch(removeSearchKeyword());
        }
      }
    }
    
  }
  const loadMoreUserData = () => {
    
    if(userPagination){
      let current_page = + userPagination.currentPage;
      let total_page = userPagination.totalPages;
      if(current_page < total_page){          

        if(searchValue) {
          let UserParam = {searchKeyword:searchValue, current_page: parseInt(current_page + 1)};
          dispatch(getUsers(UserParam,setHeaders));
          dispatch(setSearchKeyword(searchValue));
        }
        else {
          dispatch(removeUserList());
          dispatch(removeSearchKeyword());
        }
      }
    }
    
  }
  
  const getCompanyList = () => {
    let param = {};
    dispatch(getCompanies(param,setHeaders));
  }

  const getUserList = () => {
    let param = {};
    dispatch(getUsers(param,setHeaders));
  }

  const editCompany = (recordId) => {
    let param = {recordId};
    dispatch(getCompany(param,setHeaders));
    setVisibleCompanyEditModal(true);
  }

  const searchMainText = () => {
    console.log("SearchText:",searchValue);
    if(searchValue) {
      let param = {searchKeyword:searchValue};
      dispatch(getCompanies(param,setHeaders));
      dispatch(getUsers(param,setHeaders));
      dispatch(setSearchKeyword(searchValue));
    }
    else {
      dispatch(removeCompanyList());
      dispatch(removeUserList());
      dispatch(removeSearchKeyword());
    }    
  }

  const handleSearch = async(e) => {
    let value = e.target.value ? e.target.value : "";
    setsearchValue(value);
    if(!value) {
      dispatch(removeCompanyList());
      dispatch(removeUserList());
      dispatch(removeSearchKeyword());
    }
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
        <div className="dashboard_page">
          <Row>
            <Col
              sm={{ span: 18, offset: 3 }}
              md={{ span: 18, offset: 3 }}
              xs={{ span: 22, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              xl={{ span: 12, offset: 6 }}
              className="main_search"
            >
              <Input
                allowClear
                placeholder="Search for Company or User"
                prefix={<SearchIcon />}
                className="search_text_box"
                onChange={handleSearch}
                onPressEnter={searchMainText}
                value={searchValue}
              />

              <button
                ref={hiddenLoadMoreBtnRef}
                onClick={loadMore}
                style={{ display: "none" }}
              />
              <button
                ref={hiddenUserLoadMoreBtnRef}
                onClick={loadMoreUserData}
                style={{ display: "none" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="company_section">
              <CompanyAddModal
                visible={visibleCompanyAddModal}
                visibleFunc={setVisibleCompanyAddModal}
                pageName={'dashboard'}
              />
              <CompanyEditModal
                visible={visibleCompanyEditModal}
                visibleFunc={setVisibleCompanyEditModal}
                pageName={'dashboard'}
              />
                <Title level={5} className="heading">
                  Companies
                </Title>
                <div className={"company_list " + (!companyPagination || companyPagination.totalRecords < 10 ? "":"company_list_height")}>
                  {
                  (!companyList || companyList.length === 0) ? (
                    <div className="noData"><Empty /></div>
                  ) :
                  companyList.map(
                    (item,index) => (
                      <Card
                        key={item.id}
                        title={
                          <NavLink
                            to={`/company-detail/${item.id}`}
                            className="nav-text"
                          >
                            {item.name ? item.name : "N/A"} 
                          </NavLink>
                        }
                        extra={
                          <div style={{ display: "flex", justifyContent:'flex-end' }}>
                            {hasFlag(item.countryCode) ? <img alt="img" height={15} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`} /> : null}                            
                            <span style={{ display: "flex", marginLeft: "10px", cursor:"pointer" }} onClick={() => editCompany(item.id)}>
                              <PenIcon height={15} width={15} />
                            </span>
                          </div>
                        }
                        className="company-card"
                      >
                        <Row>
                          <Col span={24}>{item.number ? item.number : "N/A"} | {item.vatNumber ? item.vatNumber : "N/A"}</Col>
                          <Col span={24} className="setTitle">
                            {item.billingAddress1 ? item.billingAddress1 : "N/A"}, {item.billingPostCode ? item.billingPostCode : "N/A"}, {item.billingCity ? item.billingCity : "N/A"}
                          </Col>
                          <Col span={24}>{item.industry ? item.industry : "N/A"}</Col>
                          <Col span={24} className="stastic-main">
                            <div className={"stastic-div"}>
                              <div>
                                <span className="st-sicon">
                                  <CoinIcon height={15} />
                                </span>
                                {item.totalAmount == 'infinity' ? (
                                  <span className="st-stext" style={{marginTop:"6px"}}><InfinityIcon height={12} width={12} /> </span>
                                ) : <span className="st-stext">{item.totalAmount}</span>
                                }
                              </div>
                            </div>
                            <div className={"stastic-div"}>
                              <div>
                                <span className="st-sicon">
                                  <HirarchyIcon height={18} width={18} />
                                </span>
                                <span className="st-stext">{item.departmentCount}</span>
                              </div>
                            </div>
                            <div className={"stastic-div"}>
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
          <Row>
            <Col span={24}>
              <div className="user_section">
                <UserLicenseModal
                  visible={visibleUserLicenseModal}
                  visibleFunc={setVisibleUserLicenseModal}
                  pageName={'dashboard'}
                />
                <AddEditUserDepartmentModal
                  visible={visibleAddEditUserDepartmentModal}
                  visibleFunc={setVisibleAddEditUserDepartmentModal}
                  pageName={'dashboard'}
                />
                <UserResetPasswordModal
                  visible={visibleUserResetPasswordModal}
                  visibleFunc={setVisibleUserResetPasswordModal}
                  pageName={'dashboard'}
                />
                <UserEditModal
                  visible={visibleUserEditModal}
                  visibleFunc={setVisibleUserEditModal}
                  pageName={'dashboard'}
                />
                <UserLoginActivitiesModal
                  visible={visibleUserLoginActivitiesModal}
                  visibleFunc={setVisibleUserLoginActivitiesModal}
                  pageName={'dashboard'}
                />
                <Title level={5} className="heading">
                  Users
                </Title>
                <div className={"user_list " + (!userPagination || userPagination.totalRecords < 10 ? "":"user_list_height")}>
                  {
                  (!userList || userList.length == 0) ? (
                    <div className="noData"><Empty /></div>
                  ) :
                  userList.map(
                    (item,index) => (
                      <Card
                        key={item.id}
                        title={<NavLink
                          to={`/user-detail/${item.id}`}
                          className="nav-text"
                        >
                          {(item.firstName ? item.firstName : "N/A") + " " + (item.lastName ? item.lastName : "N/A")}
                        </NavLink>}
                        extra={
                          <div style={{ display: "flex", justifyContent:'flex-end' }}>
                            {hasFlag(item.countryCode) ? <img alt="img" height={15} src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${item.countryCode}.svg`} /> : null}
                            <span style={{ display: "flex", marginLeft: "10px", cursor:"pointer" }} onClick={() => editUser(item.id)}>
                              <PenIcon height={15} width={15} />
                            </span>
                          </div>
                        }
                        className="user-card"
                      >
                        <Row>
                          <Col span={24}>{(item.contractNumber ? item.contractNumber : "N/A") + " | " + (item.orderNumber ? item.orderNumber : "N/A")}</Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <AtIcon height={13} width={13} />
                              {
                                !item.eMail ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`mailto:${item.eMail}`}>
                                    {item.eMail}
                                  </a>
                                )
                              }                              
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <PhoneIcon height={13} width={13} />
                              {
                                !item.telephone ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`tel:${item.telephone}`}>
                                    {item.telephone}
                                  </a>
                                )
                              }                             
                            </div>
                          </Col>
                          <Col span={24}>
                            <div className="ucard-cnt">
                              <MobileIcon height={13} width={13} />                              
                              {
                                !item.mobile ? (<span style={{marginLeft:"10px"}}>N/A</span>) : (
                                  <a href={`tel:${item.mobile}`}>
                                    {item.mobile}
                                  </a>
                                )
                              }
                            </div>
                          </Col>
                          <Col span={24} className="ustastic-main">
                            <div className={"ustastic-div"} onClick={() => editUser(item.id,true)}>
                              <div>
                                <span className="st-sicon">
                                  <SalesIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">{item.license ? item.license : "N/A"}</span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => editUser(item.id,true)}>
                              <div>
                                <span className="st-sicon">
                                  <UserIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">{item.licenseRole  ? item.licenseRole : "N/A"}</span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => editUser(item.id,true)}>
                              <div>
                                <span className="st-sicon">
                                  <CalendarCheckIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">{item.licenseExpiryDate  ? item.licenseExpiryDate : "N/A"}</span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => getUserDepartments(item.id) }>
                              <div>
                                <span className="st-sicon">
                                  <HirarchyIcon height={18} width={18} />
                                </span>
                                <span className="st-stext">{item.departmentCount}</span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => getUserLoginActivitiesF(item.id) }>
                              <div>
                                <span className="st-sicon">
                                  <AerrowRightIcon height={15} width={15} />
                                </span>
                                <span className="st-stext">{getDateDurationText(item.lastLogin,moment())}</span>
                              </div>
                            </div>
                            <div className={"ustastic-div"} onClick={() => editUserResetPassword(item.id)}>
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
                    )
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24} className="bottom_footer">
              <Button className="footer-btn" type="primary" onClick={() => setVisibleCompanyAddModal(true)}>
                <div style={{display:"flex",justifyContent:'center'}}>
                  <span style={{marginRight:"5px"}}><PlusIcon height={14} width={14} /></span>
                  <span>Add New Company</span>
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
