import React from 'react';
import './App.css'
import {Col, Layout, Row} from "antd";
import logo from "./assets/beegroup_logo.png";
import LoginDrawer from "./parts/LoginDrawer";
import NoFound from "./pages/NoFound";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import HomaPage from "./pages/HomaPage";
import UploadFile from "./parts/UploadFile";
import InstancePage from "./pages/InstancePage";
import ProtectedRoute from "./utils/ProtectedRoute";
import {Roles} from "./utils/Roles";
import {Provider} from "react-redux";
import store from "./store";
import SampleData from "./parts/SampleData";
import SelectData from "./parts/SelectData";
import ListInstances from "./parts/ListInstances";
import CreateMapping from "./parts/CreateMapping";
import MappingInstancesPage from "./pages/MappingInstancesPage";

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
                        <Col span={18}>
                            <img onClick={() => {
                                navigate('/')
                            }} className="logo" src={logo} alt="BeeGroup Logo"/>
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
                            <Route path="/instance" element={<ProtectedRoute
                                roles={[Roles.User, Roles.Admin]}><InstancePage/></ProtectedRoute>}>
                                <Route path="/instance" element={<Navigate to={"upload/"}/>}/>
                                <Route path="upload/" element={<UploadFile/>}/>
                                <Route path="sample/" element={<SampleData/>}/>
                                <Route path="select/" element={<SelectData/>}/>
                            </Route>
                            <Route path={"/mapping"} element={<ProtectedRoute
                                roles={[Roles.User, Roles.Admin]}><MappingInstancesPage/></ProtectedRoute>}>
                                <Route path="" element={<ListInstances/>}/>
                                <Route path="create/:id" element={<CreateMapping/>}/>
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
