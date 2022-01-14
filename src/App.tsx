import React from 'react';
import './App.css'
import {Col, Layout, Row} from "antd";
import logo from "./assets/beegroup_logo.png";
import LoginDrawer from "./parts/LoginDrawer";
import NoFound from "./pages/NoFound";
import {Route, Routes} from "react-router-dom";
import HomaPage from "./pages/HomaPage";
import {useCookies} from "react-cookie";
// Components
const {Header, Content, Footer} = Layout;

// https://dev.to/nilanth/how-to-secure-jwt-in-a-single-page-application-cko: It recommends to use Cookies to storage the JWT.

// Constants
const current_year = new Date().getFullYear();


function App() {
    return (
        <Layout>
            <Header style={{
                backgroundColor: "white",
                boxShadow: "5px 5px 8px 2px rgba(208, 216, 243, 0.6)",
                position: 'fixed',
                zIndex: 1,
                width: '100%'
            }}>
                <Row>
                    <Col span={18}>
                        <img className="logo" src={logo} alt="BeeGroup Logo"/>
                    </Col>
                    <Col span={6}>
                        <div style={{marginLeft: "70%"}}>
                            <LoginDrawer/>
                        </div>
                    </Col>
                </Row>
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-background"
                     style={{margin: '25px 0', padding: 24, minHeight: 380, height: "85vh"}}>
                    <Routes>
                        <Route path="/" element={<HomaPage/>}/>
                        <Route path="*" element={<NoFound/>}/>
                    </Routes>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>BeeGroup © {current_year} </Footer>
        </Layout>)
}

export default App;
