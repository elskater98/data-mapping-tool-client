import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoFound from "./pages/NoFound";

import {Col, Layout, Row, Select} from 'antd';
import logo from './assets/beegroup_logo.png'
import LoginDrawer from "./parts/LoginDrawer";

const {Header, Content, Footer} = Layout;

// Constants
const current_year = new Date().getFullYear();

ReactDOM.render(
    <React.StrictMode>
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
                        <div style={{marginLeft: "65%"}}>
                            <LoginDrawer/>
                        </div>

                    </Col>
                </Row>
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-background"
                     style={{margin: '25px 0', padding: 24, minHeight: 380, height: "80vh"}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App/>}/>
                            <Route path="*" element={<NoFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </Content>

            <Footer style={{textAlign: 'center'}}>BeeGroup © {current_year} </Footer>
        </Layout>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
