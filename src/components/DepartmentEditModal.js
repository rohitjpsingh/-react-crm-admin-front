import React, { Fragment, useEffect } from "react";
import "./css/department_edit_modal.css";

import { Modal, Button, Row, Col, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
//
import { updateDepartment,getDepartments, getDepartment } from "../redux/actions/department";
import { getMemberDepartments } from "../redux/actions/user";

function DepartmentEditModal(props) {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const departmentEdit = useSelector(
    (state) => (state.department && state.department.single) || {}
  );
  const companyEdit = useSelector(
    (state) => (state.company && state.company.single) || {}
  );
  const userEdit = useSelector(
    (state) => (state.user && state.user.single) || {}
  );

  useEffect(() => {
    editForm.setFieldsValue({
      deptName : departmentEdit.name ? departmentEdit.name : "",
    });
  }, [departmentEdit]);

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues);
    let recordId = departmentEdit.id ? departmentEdit.id : "";
    let companyId = companyEdit ? companyEdit.id : "";
    let userId = userEdit ? userEdit.id : "";
    var headers = {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${JWT_TOKEN}`
    }
    let setHeaders = {"headers" : headers};
    let {deptName} = formValues;
    let param = { recordId, deptName };
    await dispatch(updateDepartment(param,setHeaders));
    
    if(props.pageName == 'companyDetail'){
      let param1 = { companyId };
      dispatch(getDepartments(param1,setHeaders)); 
    }
    else if(props.pageName == 'departmentDetail') {
      let setHeaders = { headers: headers };
      let param = { recordId };
      dispatch(getDepartment(param, setHeaders));
    }
    else if(props.pageName == 'userDetail') {
      let param = { recordId:userId };
      dispatch(getMemberDepartments(param, setHeaders));
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
        title="Edit Department"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="department_edit_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="department_edit_submit_btn"
            onClick={() => editForm.submit()}
          >
            Save
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="department_edit_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={editForm}
              layout="vertical"
              className="department_edit_form"
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

export default DepartmentEditModal;
