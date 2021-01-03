import React, { lazy, useEffect, useReducer, useState } from "react";
import { dataFetchReducer } from "./reducer/index";

import {
  CButton,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CLink,
} from "@coreui/react";
import {
  Table,
  Space,
  Spin,
  Modal,
  Row,
  Col,
  Input,
  Form,
  notification,
  Checkbox,
  Upload,
  Select,
  Button,
  Popconfirm,
} from "antd";
import "./style.css";
import CIcon from "@coreui/icons-react";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import Moment from "react-moment";
import './style.css';
import categoryApi from "../../api/categoryApi";
import {
  doGetList,
  doGetList_error,
  doGetList_success,
} from "./action/actionCreater";
function Category() {
  const [form] = Form.useForm();
 
  
  const columns = [
    {
      title: "Category ID",
      dataIndex: "_id",
      key: "_id",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text, record) => (
        <Space size="middle">
          <Button
          //  onClick={() => updateCategory(record)}
            type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            // onConfirm={() => deleteCategory(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [data,setdata] = useState([]);
  
  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log("Fetch products successfully: ", response);
        setdata(response.ListCateCreated);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    fetchCategoryList();
  }, []);
  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Category</CCardHeader>
        <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
          // onClick={toggle}
        >
          {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
          Add Category
        </CButton>
        <CCardBody>
         
              <Table columns={columns} dataSource={data} rowKey="_id" />
          
        </CCardBody>
      </CCard>
      <Modal
        // title={detail ? "UPDATE CATEGORY" : "ADD CATEGORY"}
        // visible={isvisible}
        // onOk={handleOk}
        // onCancel={toggle}
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
              <Col span={12}>
                <Form.Item name="name">
                  <Input placeholder="Category name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="name">
                  <Input placeholder="action name" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        {/* </Spin> */}
      </Modal>
    </>
  )
}

export default Category;
