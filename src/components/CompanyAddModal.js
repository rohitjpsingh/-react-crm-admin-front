import React, { Fragment } from "react";
import "./css/company_add_modal.css";

import { Modal, Button, Row, Col, Input, Form, Select, DatePicker, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
//
import { addCompany, getCompanies } from "../redux/actions/company";


function CompanyAddModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const countryList = useSelector(
    (state) => (state.common && state.common.countryList) || []
  );
  const industryList = useSelector(
    (state) => (state.common && state.common.industryList) || []
  );

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let {number, companyName, vatNumber, billingAddress1, billingPostCode, billingCity, billingCountry, industry} = formValues;
    let param = {number, companyName, vatNumber, billingAddress1, billingPostCode, billingCity, billingCountry, industry  };
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    await dispatch(addCompany(param,setHeaders));

    if(props.pageName === 'dashboard') {
      
    }
    closeAddModal();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    form.resetFields();
  };

  return (
    <Fragment>
      <Modal
        title="New Company"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="company_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="company_submit_btn"
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="company_add_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              className="company_add_form"
              onFinish={onFinish}
            >
              <Row gutter={[5]}>
                <Col span={18}>
                  <Form.Item
                    name={"companyName"}
                    rules={[
                      {
                        required: true,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"billingCountry"}
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
                      placeholder="Country"
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
                      {countryList
                        .length > 0
                        ? countryList.map((data,index) => (
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

              <Row gutter={[5]}>
                <Col span={12}>
                  <Form.Item
                    name={"number"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Orgnr" />
                  </Form.Item>                  
                </Col>
                <Col span={12}>                 
                  <Form.Item
                    name={"vatNumber"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Vat No" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[5]}>
                <Col span={12}>
                  <Form.Item
                    name={"billingAddress1"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Address 1" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"billingPostCode"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="Post Code" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"billingCity"}
                    rules={[
                      {
                        required: false,
                        message: "Field Required!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"industry"}
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
                      placeholder="Industry"
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
                      {industryList
                        .length > 0
                        ? industryList.map((data,index) => (
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
            </Form>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
}

export default CompanyAddModal;
