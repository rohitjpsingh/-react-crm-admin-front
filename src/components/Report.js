import React, { Fragment, useEffect } from "react";
import Layout from "./layout";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import "./css/report.css";

import {
  Row,
  Col,
  Breadcrumb,
  TreeSelect
} from "antd";


import { useSelector, useDispatch } from "react-redux";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

import { getCommon } from "../redux/actions/common";
import { getCompaniesReport,getUsersReport,getValuesReport,getLicenseRolesReport,getLicensesReport,getUserLoggedInReport } from "../redux/actions/report";

const { TreeNode } = TreeSelect;

function Report(props) {
  const { location } = props;
  const dispatch = useDispatch();
    
  // Resolves charts dependancy
  charts(FusionCharts);
  FusionTheme(FusionCharts);

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const licenseList = useSelector(
    (state) => (state.common && state.common.licenseList) || []
  );
  const valuesReport = useSelector(
    (state) => (state.report && state.report.values) || []
  );
  const usersReport = useSelector(
    (state) => (state.report && state.report.users) || []
  );
  const companiesReport = useSelector(
    (state) => (state.report && state.report.companies) || []
  );
  const licenseRolesReport = useSelector(
    (state) => (state.report && state.report.licenseRoles) || []
  );
  const licensesReport = useSelector(
    (state) => (state.report && state.report.licenses) || []
  );
  const userLoggedInReport = useSelector(
    (state) => (state.report && state.report.loggedInActivities) || []
  );
  
  var headers = {
    "Content-Type": "application/json",
    Authorization: `JWT ${JWT_TOKEN}`,
  };
  let setHeaders = { headers: headers };

  useEffect(() => {
    dispatch(getCommon({}, setHeaders));
    getTotalValuesCountrywise();
    getTotalUsersCountrywise();
    getTotalCompaniesCountrywise();
    getTotalOfLicense();
    getTotalOfLicenseRole();
    getTotalOfUserLoggedIn();
  }, []);

  const getTotalValuesCountrywise = () => {
    dispatch(getValuesReport({}, setHeaders));
  }
  
  const getTotalUsersCountrywise = () => {
    dispatch(getUsersReport({}, setHeaders));
  }

  const getTotalCompaniesCountrywise = () => {
    dispatch(getCompaniesReport({}, setHeaders));
  }
  const getTotalOfLicense = () => {
    dispatch(getLicensesReport({}, setHeaders));
  }
  const getTotalOfLicenseRole = () => {
    dispatch(getLicenseRolesReport({}, setHeaders));
  }
  const getTotalOfUserLoggedIn = () => {
    dispatch(getUserLoggedInReport({}, setHeaders));
  }

  const handleValueFilter = (value) => {
    let param = {licenseType:value ? value : ''};
    dispatch(getValuesReport(param, setHeaders));
  }
  const handleUserFilter = (value) => {
    let param = {licenseType:value ? value : ''};
    dispatch(getUsersReport(param, setHeaders));
  }
  const handleRoleFilter = (value) => {
    let param = {licenseType:value ? value : ''};
    dispatch(getLicenseRolesReport(param, setHeaders));
  }
  

  return (
    <Fragment>
      <Helmet>
        <title>Report</title>
      </Helmet>
      <Layout location={location}>
        <div className="report_page">
          <Row>
            <Col span={24} className="main-heading">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <NavLink to={`/dashboard`}>Dashboard</NavLink>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Report</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="report_section">
                <Row>
                  <Col span={24}>
                    <div className="valueReport"> 
                    <div className="filter">
                        {/* <Select
                            className="licenseFilter"
                            placeholder="Select license type"
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
                            onChange={handleValueFilter}
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
                          </Select> */}

                            <TreeSelect
                              className="licenseFilter"
                              showSearch
                              allowClear
                              onChange={handleValueFilter}
                              treeCheckable={true}
                              placeholder="Select license type"
                            >
                              {licenseList.length > 0
                                ? licenseList.map((data, index) => (
                                    <TreeNode
                                      key={data.value}
                                      value={data.value}
                                      title={data.label}
                                    />
                                  ))
                                : null}
                            </TreeSelect>
                      </div>                     
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "Values Analysis",
                            subcaption: "All Values",
                            xaxisname: "Countries",
                            yaxisname: "Total Values",
                            formatnumberscale: "1",
                            plottooltext: `Total Values <b>$dataValue</b> For $label Country`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: valuesReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="userReport">
                    <div className="filter">
                        {/* <Select
                        className="licenseFilter"
                            placeholder="Select license type"
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
                            onChange={handleUserFilter}
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
                          </Select> */}
                          <TreeSelect
                              className="licenseFilter"
                              showSearch
                              allowClear
                              onChange={handleUserFilter}
                              treeCheckable={true}
                              placeholder="Select license type"
                            >
                              {licenseList.length > 0
                                ? licenseList.map((data, index) => (
                                    <TreeNode
                                      key={data.value}
                                      value={data.value}
                                      title={data.label}
                                    />
                                  ))
                                : null}
                            </TreeSelect>
                      </div> 
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "Users Analysis",
                            subcaption: "All Users",
                            xaxisname: "Countries",
                            yaxisname: "Total Users",
                            formatnumberscale: "1",
                            plottooltext: `Total Users <b>$dataValue</b> For $label Country`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: usersReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="licenseReport">
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "License Analysis",
                            subcaption: "All Types of License",
                            xaxisname: "License Types",
                            yaxisname: "Total Licenses",
                            formatnumberscale: "1",
                            plottooltext: `Total Licenses <b>$dataValue</b> For $label`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: licensesReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="licenseRoleReport">
                    <div className="filter">
                        {/* <Select
                        className="licenseFilter"
                            placeholder="Select license type"
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
                            onChange={handleRoleFilter}
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
                          </Select> */}
                          <TreeSelect
                              className="licenseFilter"
                              showSearch
                              allowClear
                              onChange={handleRoleFilter}
                              treeCheckable={true}
                              placeholder="Select license type"
                            >
                              {licenseList.length > 0
                                ? licenseList.map((data, index) => (
                                    <TreeNode
                                      key={data.value}
                                      value={data.value}
                                      title={data.label}
                                    />
                                  ))
                                : null}
                            </TreeSelect>
                      </div> 
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "License Role Analysis",
                            subcaption: "All Types of License Role",
                            xaxisname: "License Roles",
                            yaxisname: "Total Roles",
                            formatnumberscale: "1",
                            plottooltext: `Total Roles <b>$dataValue</b> For $label Role`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: licenseRolesReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="companyReport">
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "Companies Analysis",
                            subcaption: "All Companies",
                            xaxisname: "Countries",
                            yaxisname: "Total Companies",
                            formatnumberscale: "1",
                            plottooltext: `Total Companies <b>$dataValue</b> For $label Country`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: companiesReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="userLoginnedReport">
                      <ReactFusioncharts
                        type="column3d"
                        width="100%"
                        height="450"
                        dataFormat="JSON"
                        dataSource={{
                          chart: {
                            caption: "Logged In Activities Analysis",
                            subcaption: "All Users",
                            xaxisname: "Dates",
                            yaxisname: "Total Users",
                            formatnumberscale: "1",
                            plottooltext: `Total Users <b>$dataValue</b> For Date $label`,
                            theme: "fusion",
                            drawcrossline: "1",
                            showValues: "1",
                            canvasTopPadding: "20",
                            placevaluesinside: "0",
                            alignCaptionWithCanvas: "0",
                            valueFontBold: "1",
                            yAxisNameFontBold: "1",
                            xAxisNameFontBold: "1",
                          },
                          data: userLoggedInReport,
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
    </Fragment>
  );
}
export default Report;
