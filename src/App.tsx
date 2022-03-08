import React from 'react';
import './App.css'
import {Col, Layout, Row} from "antd";
import logo from "./assets/beegroup_logo.png";
import CustomHeader from "./parts/CustomHeader";
import NoFound from "./pages/NoFound";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomaPage from "./pages/HomaPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import {Roles} from "./utils/Roles";
import {Provider} from "react-redux";
import store from "./store";
import ListInstances from "./pages/ListInstances";
import InstanceDetailPage from "./pages/InstanceDetailPage";
import MappingInstance from "./parts/MappingInstance";
import MappingRelationsInstance from "./parts/MappingRelationsInstance";
import PreviewResults from "./parts/PreviewResults";

// Components
const {Header, Content, Footer} = Layout;

// Constants
const current_year = new Date().getFullYear();


function App() {
    let navigate = useNavigate();
    return (
        <Provider store={store}>
            <Layout>
                <Header style={{
                    backgroundColor: "white",
                    boxShadow: "5px 5px 8px 2px rgba(208, 216, 243, 0.6)",
                    position: 'fixed',
                    zIndex: 1,
                    width: '100%'
                }}>
                    <Row>
                        <Col span={14}>
                            <img onClick={() => {
                                navigate('/')
                            }} className="logo" src={logo} alt="BeeGroup Logo"/>
                        </Col>
                        <Col span={10}>
                            <div style={{marginLeft: "70%"}}>
                                <CustomHeader/>
                            </div>
                        </Col>
                    </Row>
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                    <div className="site-layout-background"
                         style={{margin: '25px 0', padding: 24, minHeight: 380, height: "80vh"}}>
                        <Routes>
                            <Route path="/" element={<ProtectedRoute
                                roles={[Roles.User, Roles.Admin]}><HomaPage/></ProtectedRoute>}>
                                <Route path={""} element={<Navigate to={"instances/"}/>}/>
                                <Route path={"instances/"} element={<ListInstances/>}/>
                                <Route path={"instances/:id"} element={<InstanceDetailPage/>}/>
                                <Route path={"instances/:id/mapping"} element={<MappingInstance/>}/>
                                <Route path={"instances/:id/link"} element={<MappingRelationsInstance/>}/>
                                <Route path={"instances/:id/preview"} element={<PreviewResults/>}/>
                            </Route>
                            <Route path="*" element={<NoFound/>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>BeeGroup © {current_year} </Footer>
            </Layout>
        </Provider>)
}

export default App;
