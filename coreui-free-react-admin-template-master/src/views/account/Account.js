import React, { lazy, useState, useEffect } from "react";
import { CCard, CCardHeader, CButton, CCardBody } from "@coreui/react";
import { LockOutlined } from "@ant-design/icons";
import "./style.css";
import Cookies from "js-cookie";
import {
  Table,
  Space,
  Spin,
  Form,
  notification,
  Button,
  Popconfirm,
  Tag,
  Row,Col,
  Modal, Input
} from "antd";

import userApi from "../../api/userApi";

function Account() {
  const [form] = Form.useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [tabledata, settabledata] = useState([]);
  const [isvisible, SetVisible] = useState(false);
  const [detail, setdetail] = useState(null);
  const [data, setdata] = useState([]);

  const handleClick = () => {
    setdetail(null);
    SetVisible(!isvisible);
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "fName",
      key: "fName",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "isAdmin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (text) => (
        <>
          {text === false ? (
            <Tag color="#87d068">USER</Tag>
          ) : (
            <Tag color="#f50">ADMIN</Tag>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    const fetchUserList = async () => {
      // dispatch({ type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const tokenUser = Cookies.get("token");
        // const params = { _page: 1, _limit: 10 };

        const response = await userApi.getallUser(tokenUser);
        console.log("Fetch user list succesfully: ", response);
        setdata(response.ListUserCreated);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch user list: ", error);
      }
    };
    fetchUserList();
  }, []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createUser = () => {

    form.validateFields().then((values) => {
      console.log(">>value", values)
      const createUser = async () => {
        try {
          const response = await userApi.register(values);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      createUser();
    })

  }
  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">USER</CCardHeader>
        {/* <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
          onClick={showModal}
        >

          Create
        </CButton> */}
        <CCardBody>

          <Table columns={columns} dataSource={data} rowKey="_id" />

        </CCardBody>
      </CCard>
      <Modal
        title="USER"
        visible={isModalVisible}
        onOk={createUser}
        onCancel={closeModal}
        style={{ marginTop: "5%" }}
      >
        {/* <Spin spinning={loadingmodal} size="large"> */}
        <Form
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          form={form}
          size={"large"}
        >
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={24}>
              <Form.Item name="name">
                <Input placeholder="User name" />
              </Form.Item>

            </Col>
            <Col span={24}>
              <Form.Item name="email">
                <Input placeholder="Email" />
              </Form.Item>

            </Col> <Col span={24}>
              <Form.Item name="password">
                <Input placeholder="Password" />
              </Form.Item>

            </Col>

          </Row>
        </Form>
        {/* </Spin> */}
      </Modal>
    </>
  );
}

export default Account;
