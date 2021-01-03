import React, { useState, useEffect, useReducer } from "react";
import { CCard, CCardHeader, CButton } from "@coreui/react";
import {
  Table,
  Space,
  Spin,
  Row,
  Col,
  Form,
  Button,
  notification,
  Popconfirm,
} from "antd";
import moment from "moment";
import Moment from "react-moment";
import {
  CheckCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
// import ImgCrop from "antd-img-crop";
import "./style.css";
import productApi from "../../api/productApi";


function Product() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
 
    },
    {
      title: "image",
      dataIndex: "image",
      key: "image",
 
      render: (images) => (
        <img style={{ width: "100%" }} src={`http://localhost:3000/${images}`} />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
   
    {
      title: "Description",

      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "prices",
      key: "prices",
    
  
    },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",

      render: (time) => (
        <p>
          <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
        </p>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 50,
      render: (text, record) => (
        <Space size="middle">
          {/* <Button onClick={() => updateProduct(record)} type="primary">
            Edit
          </Button> */}
          <Popconfirm
            title="Are you sure？"
            icon={<DeleteOutlined style={{ color: "red" }} />}
            // onConfirm={() => deleteProduct(record)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];
  // upload image
  const [form] = Form.useForm();
  const [fileList, setfileList] = useState([]);
  const [state, setstate] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: [],
  });
  const [detail, setdetail] = useState(null);
  const [imgfile, setimgfile] = useState(null);
  const [data, setdata] = useState([]);

  const handleOk = (values) => {
    if (detail === null) {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          // onCreate(values);
          console.log(">>>value", values);
          var CurrentDate = moment().toISOString();

          const data = {
            ...values,
            imagesProduct: imgfile,
            createAt: CurrentDate,
          };
          console.log("data >>>", data);
          var form_data = new FormData();

          for (var key in data) {
            form_data.append(key, data[key]);
          }
          const fetchCreateProduct = async () => {
            try {
              // setloadingmodal(true);
              const response = await productApi.createproduct(form_data);
              console.log("Fetch products succesfully: ", response);
              setstate({ ...state, fileList: [] });
              setdata([...data, response.newProducts]);
              setimgfile(null);
              // setloadingmodal(false);
              notification.info({
                message: `Created Successfully`,
                icon: <CheckCircleOutlined style={{ color: "#33CC33" }} />,
                placement: "bottomRight",
              });
            } catch (error) {
              console.log("failed to fetch product list: ", error);
            }
          };
          fetchCreateProduct();
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }
  };

  const initialData = [];
  const [isLoading, setIsLoading] = useState(false);
  const [isvisible, SetVisible] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
    
        const response = await productApi.getAll();
        console.log("Succesfully: ", response);
        setdata(response.ProductList);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch product list: ", error);
      }
    };
    getProduct();
  }, []);
  
  const handleClick = () => {
    setdetail(null);
    SetVisible(!isvisible);
  };

  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">Product</CCardHeader>
        <Row>
          <Col lg={14}>
            <CButton
              style={{
                width: "200px",
                height: "50px",
                margin: "20px 0px 20px 20px",
              }}
              shape="pill"
              color="info"
              onClick={handleClick}
            >
              {/* <i style={{ fontSize: "20px" }} class="cil-playlist-add"></i>  */}
              Add Product
            </CButton>
          </Col>
        </Row>
      </CCard>
      {isLoading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={data} rowKey="_id" />
      )}
    </>
  );
}

export default Product;
