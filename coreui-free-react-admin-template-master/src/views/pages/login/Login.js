import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import { Form, Input, Button } from "antd";
import Cookies from "js-cookie";
import { LoginAuth } from "../../../LoginAuth";
import CIcon from "@coreui/icons-react";
import loginApi from "../../../api/loginApi";
import {
  UserOutlined,LockOutlined
} from '@ant-design/icons';
const Login = (props) => {
  const [Directstate, setDirectstate] = useState({ redirectToReferrer: false });
  const handleLogin = (values) => {

    console.log(values);
    const loginAdmin = async () => {
      try {
        const response = await loginApi.signinUser(values);
        console.log("Login succesfully: ", response);
        LoginAuth.authenticate(() => {
          setDirectstate(() => ({
            redirectToReferrer: true,
          }));
        }); 
        Cookies.set("duynhan", response.token);
      } catch (error) {
        alert("Hello! I am an alert box!!");
        console.log(": ", error);
      }
    };
    loginAdmin();
  };
 
  const [form] = Form.useForm();
  const {from} = props.location.state || {from: {pathname: "/"}};
  const {redirectToReferrer} = Directstate;
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Form form={form} 
                  onFinish={handleLogin}
                  >
                    <h1>ADMIN LOGIN</h1>
                    <p className="text-muted">Sign In to admin account</p>
                    <Form.Item
                      name="email"
                      className="mb-3"
                  
                      rules={[{ required: true }]}
                    >
                      <Input
                        // prefix={<UserOutlined />}
                        style={{width:"100%"}}
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      className="mb-3"
                      rules={[{ required: true }]}
                    >
                      <Input
                        // prefix={<LockOutlined />}
                        style={{width:"100%"}}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </Form.Item>

                    <CRow>
                      <CCol xs="12">
                        <Button
                          color="primary"
                          style={{
                            width: "100%",
                            backgroundColor: "blue",
                            color: "white",
                            border:"0px",
                            height:"30px"
                            
                          }}
                          htmlType="submit"
                        >
                          Login
                        </Button>
                      </CCol>
                    </CRow>
                  </Form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
