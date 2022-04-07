import React, {useState} from 'react';
import './App.css'
import {Col, Layout, Menu, Row} from "antd";
import logo from "./assets/beegroup_logo.png";
import CustomHeader from "./parts/CustomHeader";
import NoFound from "./pages/NoFound";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import HomaPage from "./pages/HomaPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import {Roles} from "./utils/Roles";
import {Provider} from "react-redux";
import store from "./store";
import {NodeIndexOutlined, BranchesOutlined} from "@ant-design/icons";
import ListInstances from "./pages/ListInstances";
import InstanceDetailPage from "./pages/InstanceDetailPage";
import MappingInstance from "./parts/MappingInstance";
import MappingRelationsInstance from "./parts/MappingRelationsInstance";
import PreviewResults from "./parts/PreviewResults";
import PreviewOntology from "./parts/PreviewOntology";
import OntologyService from "./services/OntologyService";
import ListOntologies from "./pages/ListOntologies";

// Components
const {Header, Content, Footer} = Layout;

// Constants
const current_year = new Date().getFullYear();


function App() {
    let navigate = useNavigate();
    const location = useLocation();

    const ontologyService = new OntologyService();

    const [ontologyVersion, setOntologyVersion] = useState<any>("v1");

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
                            <Menu mode="horizontal" selectedKeys={[location.pathname]}>
                                <Menu.Item key={"/"}>
                                    <img onClick={() => {
                                        navigate('/')
                                    }} className="logo" src={logo} alt="BeeGroup Logo"/>
                                </Menu.Item>

                                <Menu.Item key={"/instances"} title={"Instances"} icon={<NodeIndexOutlined/>}
                                           onClick={() => {
                                               navigate('/instances')
                                           }}>Instances</Menu.Item>

                                <Menu.Item key={"/ontologies"} title={"Ontologies"} icon={<BranchesOutlined/>}
                                           onClick={() => {
                                               navigate('/ontologies')
                                           }}>Ontologies</Menu.Item>
                            </Menu>
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
                            <Route path={""} element={<PreviewOntology/>}/>
                            <Route path="/" element={<ProtectedRoute
                                roles={[Roles.User, Roles.Admin]}><HomaPage/></ProtectedRoute>}>
                                <Route path={"instances/"} element={<ListInstances/>}/>
                                <Route path={"instances/:id"} element={<InstanceDetailPage/>}/>
                                <Route path={"instances/:id/mapping"} element={<MappingInstance/>}/>
                                <Route path={"instances/:id/link"} element={<MappingRelationsInstance/>}/>
                                <Route path={"instances/:id/preview"} element={<PreviewResults/>}/>
                            </Route>
                            <Route path={"ontologies/"} element={<ListOntologies/>}/>
                            <Route path="*" element={<NoFound/>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>BeeGroup © {current_year} ~ {ontologyVersion}</Footer>
            </Layout>
        </Provider>)
}

export default App;
