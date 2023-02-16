import React, { Fragment, useEffect } from "react";
import "./css/user_company_move_modal.css";

import { Modal, Button, Row, Col, Form, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getMoveCompanies } from "../redux/actions/company";
import { updateUserCompanyMoveUp } from "../redux/actions/user";


function UserCompanyMoveModal(props) {
  const [editForm] = Form.useForm();
  const dispatch = useDispatch();

  const current_user_id = useSelector(
    (state) => (state.auth && state.auth.user._id) || ""
  );
  const companyList = useSelector(
    (state) => (state.company && state.company.moveCompanies) || []
  );
  const JWT_TOKEN = useSelector(
    (state) => (state.auth && state.auth.token) || ""
  );
  const userEdit = useSelector(
    (state) => (state.user && state.user.single) || {}
  );  
  
var headers = {
  'Content-Type': 'application/json',
  'Authorization': `JWT ${JWT_TOKEN}`
}
let setHeaders = {"headers" : headers};

  useEffect(() => {
    editForm.setFieldsValue({      
      language:userEdit.language ? userEdit.language : "",
    });
  }, []);

  useEffect(() => {
    if(props.visible) {
      let param = {searchKeyword:'', pageFor:'companyMove'};
      
      dispatch(getMoveCompanies(param,setHeaders));
    }

  },[props.visible])
  

  const onFinish = async (formValues) => {
    console.log("Received values of form: ", formValues); 
    let companyId = userEdit ? userEdit.companyId : "";
    if(userEdit.companyId == formValues.companyId ) return;
    let param = {
      oldCompanyId:userEdit.companyId,
      companyId:formValues.companyId,
      userId:userEdit.id,
    };
    
    await dispatch(updateUserCompanyMoveUp(param,setHeaders));
    closeAddModal();
    props.reloadUserFunc();
  };

  const closeAddModal = () => {
    props.visibleFunc(false);
    editForm.resetFields();
  };

  return (
    <Fragment>
      <Modal
        title="Company Move Up"
        visible={props.visible}
        centered
        footer={[
          <Button
            type="text"
            className="company_moveup_cancel_btn"
            onClick={closeAddModal}
          >
            Cancel
          </Button>,
          <Button
            type="primary"
            className="company_moveup_submit_btn"
            onClick={() => editForm.submit()}
          >
            Save & Move
          </Button>,
        ]}
        onCancel={closeAddModal}
        className="company_moveup_modal"
        destroyOnClose={true}
      >
        <Row>
          <Col span={24}>
            <Form
              form={editForm}
              layout="vertical"
              className="company_moveup_form"
              onFinish={onFinish}
            >
              <Row gutter={[5]}>
                <Col span={24}>
                  <Form.Item
                    name={"companyId"}
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
                      placeholder="Company"
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
                      {companyList
                        .length > 0
                        ? companyList.map((data,index) => (
                            <Select.Option
                              key={data.id}
                              title={data.name}
                              value={data.id}
                            >
                              {data.name}
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

export default UserCompanyMoveModal;
