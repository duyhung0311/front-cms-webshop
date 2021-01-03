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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
  };
  const createCate = () => {
   
    form.validateFields().then((values) => {
      console.log(">>value",values)
      const createCate = async () => {
        try {
          const response = await categoryApi.createCate(values);
          console.log(response);
        } catch (error) {
          console.log( error);
        }
      };
      createCate();
    })
    
  }
  useEffect(() => {
    const Cateapilist = async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response);
        setdata(response.ListCateCreated);
      } catch (error) {
        console.log( error);
      }
    };
    Cateapilist();
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
          onClick={showModal}
        >
        
        Create
        </CButton>
        <CCardBody>
         
              <Table columns={columns} dataSource={data} rowKey="_id" />
          
        </CCardBody>
      </CCard>
      <Modal
        title="CATEGORY"
        visible={isModalVisible}
        onOk={createCate}    
        onCancel ={closeModal}
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
                  <Input placeholder="Category name" />
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
