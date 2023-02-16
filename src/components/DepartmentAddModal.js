import React, { Fragment } from "react";
import "./css/department_add_modal.css";

import { Modal, Button, Row, Col, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
//
import { addDepartment,getDepartments } from "../redux/actions/department";

function DepartmentAddModal(props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );

  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );

  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let companyId = companyEdit ? companyEdit.id : "";
    let {deptName} = formValues;
    let param = { companyId, deptName };
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    await dispatch(addDepartment(param,setHeaders));
    
    if(props.pageName === 'companyDetail'){
      let param1 = { companyId };
      dispatch(getDepartments(param1,setHeaders)); 
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
        title="New Department"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="department_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="department_submit_btn"
            onClick={() => form.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="department_add_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={form}
              layout="vertical"
              className="department_add_form"
              onFinish={onFinish}
            >
              <Form.Item
                name={"deptName"}
                rules={[
                    {
                    required: true,
                    message: "Field Required!",
                    },
                ]}
                hasFeedback
                >
                <Input placeholder="Department name" />
                </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
}

export default DepartmentAddModal;
