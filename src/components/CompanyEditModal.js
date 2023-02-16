import React, { Fragment,useEffect } from "react";
import "./css/company_edit_modal.css";

import { Modal, Button, Row, Col, Input, Form, Select, DatePicker, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
//
import { updateCompany,getCompanies,getCompany } from "../redux/actions/company";

function CompanyEditModal(props) {
  const [editForm] = Form.useForm();
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
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );

  var headers = {
    'Content-Type': 'application/json',
    'Authorization': `JWT ${JWT_TOKEN}`
  }
  let setHeaders = {"headers" : headers};

  useEffect(() => {
    editForm.setFieldsValue({
      companyName : companyEdit.name ? companyEdit.name : "",
      number : companyEdit.number ? companyEdit.number : "",
      billingCountry : companyEdit.billingCountry ? companyEdit.billingCountry : "",
      vatNumber : companyEdit.vatNumber ? companyEdit.vatNumber : "",
      billingAddress1 : companyEdit.billingAddress1 ? companyEdit.billingAddress1 : "",
      billingPostCode : companyEdit.billingPostCode ? companyEdit.billingPostCode : "",
      billingCity : companyEdit.billingCity ? companyEdit.billingCity : "",
      industry : companyEdit.industry ? companyEdit.industry : "",
    });
  }, [companyEdit]);
  
  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let recordId = companyEdit.id ? companyEdit.id : ""
    
    let {number, companyName, vatNumber, billingAddress1, billingPostCode, billingCity, billingCountry, industry} = formValues;
    let param = { recordId, number, companyName, vatNumber, billingAddress1, billingPostCode, billingCity, billingCountry, industry  };
    await dispatch(updateCompany(param,setHeaders));
    
    if(props.pageName === 'dashboard') {

    }

    else if (props.pageName === 'companyDetail') {
      let param = { recordId };
      dispatch(getCompany(param, setHeaders));
    }

    closeAddModal();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    editForm.resetFields();
  };

  return (
    <Fragment>
      <Modal
        title="Edit Company"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="company_edit_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="company_edit_submit_btn"
            onClick={() => editForm.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="company_edit_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={editForm}
              layout="vertical"
              className="company_edit_form"
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
                        required: true,
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
                        required: true,
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
                        required: true,
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
                        required: true,
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
                        required: true,
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

export default CompanyEditModal;
