import React, { Fragment, useState, useEffect, useRef } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/all_user.css";

import {
  Row,
  Col,
  Typography,
  Table,
  Input,
  Button,
  Breadcrumb,
  Divider,
 Form,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getCommon } from "../redux/actions/common";
import { getAllUsers } from "../redux/actions/user";

const { Title } = Typography;

function Dashboard(props) {
  const { location } = props;
  const dispatch = useDispatch();
  const [filterForm] = Form.useForm();

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userList = useSelector(
    (state) => (state.user && state.user.all_user_list) || []
  );

  const userPagination = useSelector(
    (state) => (state.user && state.user.pagination) || []
  );

  const licenseList = useSelector(
    (state) => (state.common && state.common.licenseList) || []
  );
  const licenseRoleList = useSelector(
    (state) => (state.common && state.common.licenseRoleList) || []
  );
  const userLanguageList = useSelector(
    (state) => (state.common && state.common.userLanguageList) || []
  );

  let newLicenseList = licenseList.map((data) => {
      return {
        text: data.label,
        value: data.value,
      }
  });

  let newLanguageList = userLanguageList.map((data) => {
    return {
      text: data.label,
      value: data.value,
    }
});

let newLicenseRoleList = licenseRoleList.map((data) => {
    return {
      text: data.label,
      value: data.value,
    }
});


var headers = {
  "Content-Type": "application/json",
  Authorization: `JWT ${JWT_TOKEN}`,
};
let setHeaders = { headers: headers };
const hiddenUserLoadMoreBtnRef = useRef(null);

  const columns = [
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
      width:"10%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["company_name"] ? a["company_name"] : '';
        let second_col = b["company_name"] ? b["company_name"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Company`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["company_name"] ? record["company_name"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
      title: "Contract Number",
      dataIndex: "contractNumber",
      key: "contractNumber",
      width:"9%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["contractNumber"] ? a["contractNumber"] : '';
        let second_col = b["contractNumber"] ? b["contractNumber"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Contract Number`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["contractNumber"] ? record["contractNumber"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      width:"13%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["firstName"] ? a["firstName"] : '';
        let second_col = b["firstName"] ? b["firstName"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search First Name`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["firstName"] ? record["firstName"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    render:(value,record) => {
      return (
        <NavLink
          to={`/user-detail/${record.id}`}
          className="nav-text"
        >
          {record.firstName ? record.firstName : "N/A"}
        </NavLink>
      )
    }
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      width:"12%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["lastName"] ? a["lastName"] : '';
        let second_col = b["lastName"] ? b["lastName"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Last Name`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["lastName"] ? record["lastName"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
        title: "Language",
        dataIndex: "language",
        key: "language",
        width:"8%",
        ellipsis: true,
        sorter: (a, b) => {
          let first_col  = a["language"] ? a["language"] : '';
          let second_col = b["language"] ? b["language"] : '';
          return first_col.localeCompare(second_col);
        },
        filters: newLanguageList,
        onFilter: (value, record) => record.language.indexOf(value) === 0,
      },
    {
      title: "Email",
      dataIndex: "eMail",
      key: "eMail",
      width:"14%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["eMail"] ? a["eMail"] : '';
        let second_col = b["eMail"] ? b["eMail"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Email`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["eMail"] ? record["eMail"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
      title: "Phone",
      dataIndex: "telephone",
      key: "telephone",
      width:"10%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["telephone"] ? a["telephone"] : '';
        let second_col = b["telephone"] ? b["telephone"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Phone`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["telephone"] ? record["telephone"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      width:"9%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["mobile"] ? a["mobile"] : '';
        let second_col = b["mobile"] ? b["mobile"] : '';
        return first_col.localeCompare(second_col);
      },
      filterDropdown:({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (      
        <Form
          name="contactFilterForm"
          className="contactFilterForm"
          form={filterForm}
        >
          <Form.Item
            name="search"
          >
            <Input
              placeholder={`Search Mobile`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])} 
              onPressEnter={() => confirm()} 
            />
          </Form.Item>
          <Divider />
          <div className="filterBtnGrp">
            <Button type="link" onClick={() => {clearFilters();filterForm.resetFields();}} >
              Reset
            </Button>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => confirm()}>
              Filter
            </Button>
          </div>
        </Form>
        ),
      onFilter: (value, record) => record["mobile"] ? record["mobile"].toString().toLowerCase().includes(value.toLowerCase())
          : '',
    },
    {
      title: "License",
      dataIndex: "license",
      key: "license",
      width:"7%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["license"] ? a["license"] : '';
        let second_col = b["license"] ? b["license"] : '';
        return first_col.localeCompare(second_col);
      },
      filters: newLicenseList,
      onFilter: (value, record) => record.license === value,
    },
    {
      title: "License role",
      dataIndex: "licenseRole",
      key: "licenseRole",
      width:"8%",
      ellipsis: true,
      sorter: (a, b) => {
        let first_col  = a["licenseRole"] ? a["licenseRole"] : '';
        let second_col = b["licenseRole"] ? b["licenseRole"] : '';
        return first_col.localeCompare(second_col);
      },
      filters: newLicenseRoleList,
      onFilter: (value, record) => record.licenseRole.indexOf(value) === 0,
    },
  ];

  const dataSource = userList;

  useEffect(() => {
    const fetchData = async () => {
        await dispatch(getCommon({}, setHeaders));
        await getUserList();
        await onScroll();
    };
    fetchData();
  }, []);

  const onScroll = () => {
    var UserContent = document.querySelector("div.ant-table-body");
    
    if(UserContent) {
      UserContent.addEventListener('scroll', (event) => {
        
        let scrollTop = event.target.scrollTop ;
        let clientHeight = event.target.clientHeight;
        let scrollHeight = event.target.scrollHeight;
        
        if (Math.ceil(scrollTop + clientHeight) === scrollHeight) {
          console.log('Reached User bottom');
          hiddenUserLoadMoreBtnRef.current.click();
        }
      });
    }  
  }

  const loadMoreUserData = () => {
    if(userPagination){
      let current_page = + userPagination.currentPage;
      let total_page = userPagination.totalPages;
      if(current_page < total_page){          
          let userParam = { current_page: parseInt(current_page + 1) };
          dispatch(getAllUsers(userParam,setHeaders));
      }
    }
  }

  const getUserList = () => {
    let param1 = {};
    dispatch(getAllUsers(param1, setHeaders));
  };

  return (
    <Fragment>
      <Helmet>
        <title>All Users</title>
      </Helmet>
      <Layout location={location}>
        <div className="all_user_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/`}>Dashboard</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>All Users</Breadcrumb.Item>
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
                <Title level={5} className="heading">
                  Users
                </Title>
                <div className="user_list full_screen">
                  <Table
                    className="tbl"
                    pagination={false}
                    scroll={{ y: "calc(100vh - 280px)" }}
                    columns={columns}
                    dataSource={dataSource}
                    showSorterTooltip={false}
                    // onRow={(r) => ({
                    //   onClick: () => {
                    //     console.log(r);
                    //     // openContactDetailModal(r._id);
                    //   },
                    // })}
                  />
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
