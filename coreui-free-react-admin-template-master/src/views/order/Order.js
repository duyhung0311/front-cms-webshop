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
  Row, Col,
  Modal, Input, Drawer
} from "antd";
import userApi from "../../api/orderApi";
import moment from "moment";
import Moment from "react-moment";
import orderApi from "../../api/orderApi"

function Bill() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setuserId] = useState("User");
  const [address, setaddress] = useState("");
  const [detaildata, setdetaildata] = useState([]);
  const [isvisible, SetVisible] = useState(false);
  const [data, setdata] = useState([]);

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "_id",
      key: "_id",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: 250,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 200,
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => <a> {text === false ? (
        <p>TRUE</p>
      ) : (
          <p >FALSE</p>
        )}</a>,

      // render: (text) => (
      //   <>
      //     {text === false ? (
      //       <Tag color="#f50">UNCONFIRM</Tag>
      //     ) : (
      //         <Tag color="#87d068">CONFIRMED</Tag>
      //       )}
      //   </>
      // ),
    },
    // {
    //   title: "Note",
    //   dataIndex: "note",
    //   key: "note",
    //   width: 200,
    //   // render: (text) => <a>{text}</a>,
    // },
    {
      title: "Create at",
      dataIndex: "createAt",
      key: "createAt",
      width: 200,
      render: (time) => (
        <p>
          <Moment format="YYYY/MM/DD hh:mm">{time}</Moment>
        </p>
      ),
    },
    {
      title: "Done at",
      dataIndex: "doneAt",
      key: "doneAt",
      width: 200,
      render: (time) => (
        <>
          {/* {time === undefined ? (
            <Tag color="#f50">UNFINISHED</Tag>
          ) : ( */}
          <>
            {/* <Tag color="#87d068"> */}
            <Moment format="DD/MM/YYYY hh:mm">{time}</Moment>
            {/* </Tag> */}
          </>
          {/* )} */}
        </>
      ),
    },





    // {
    //   title: "Action",
    //   key: "action",
    //   width: 200,
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <Button
    //         onClick={() => onViewdetail(record)}
    //         type="primary">
    //         Detail
    //       </Button>
    //       {record.status === true ? (
    //         <Button
    //           onClick={() => onConfirmorder(record)
    //           }
    //           type="primary"
    //           disabled
    //         >
    //           Confirm
    //         </Button>
    //       ) : (
    //           <Button
    //             onClick={() => onConfirmorder(record)}
    //             type="primary"
    //             style={{ backgroundColor: "#87d068", border: "0px" }}
    //           >
    //             Confirm
    //           </Button>
    //         )}
    //     </Space>
    //   ),
    // },
  ];
  const toggle = () => {
    SetVisible(!isvisible);
  };
  const onViewdetail = (record) => {
    SetVisible(!isvisible);
    // form.setFieldsValue(record);
    if (record.userId !== "") setuserId(record.userId);
    else setuserId("User");

    setaddress(record.customerAddress);
    setdetaildata(record.productlist);
  };
  useEffect(() => {
    const fetchOrderList = async () => {
      // dispatch({type: "FETCH_INIT" });
      try {
        setIsLoading(true);
        const tokenUser = Cookies.get("token");
        // const params = {_page: 1, _limit: 10 };

        const response = await orderApi.getAll(tokenUser);
        console.log("Fetch user list succesfully: ", response);
        setdata(response.ListOrders);
        setIsLoading(false);
      } catch (error) {
        console.log("failed to fetch user list: ", error);
      }
    };
    fetchOrderList();
  }, []);






  const columnsDetail = [
    {
      title: "PRODUCT ID",
      dataIndex: "product_id",
      key: "_id",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "SIZE",
    //   dataIndex: "size",
    //   key: "size",
    //   // render: (text) => <a>{text}</a>,
    // },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <>
      <CCard>
        <CCardHeader className="CCardHeader-title ">ORDER</CCardHeader>
        {/* <CButton
          style={{
            width: "200px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "20px",
          }}
          shape="pill"
          color="info"
          // onClick={showModal}
        >

          Create
        </CButton> */}
        <CCardBody>

          <Table columns={columns} dataSource={data} rowKey="_id" />

        </CCardBody>
        {/* <Modal
          title="DETAIL ORDER"
          visible={isvisible}
          onCancel={toggle}
          style={{ marginTop: "5%"}}
          width={800}
          footer={[]}
        >
          <Form >
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={12}>
                <a>UserID: {userId}</a>
              </Col>
              <Col span={12}>
                <a>Address: {address}</a>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "20px" }}>
              <Col span={24}>
                <Table
                  columns={columnsDetail}
                  dataSource={detaildata}
                  rowKey="_id"
                />
              </Col>
            </Row>
          </Form>
        </Modal> */}
      </CCard>


    </>
  )
}

export default Bill
