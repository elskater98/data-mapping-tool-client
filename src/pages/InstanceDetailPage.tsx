import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    message,
    Modal,
    Progress,
    Row,
    Select,
    Space, Switch,
    Table,
    Tag,
    Tooltip,
    Upload
} from "antd";
import InstanceService from "../services/InstanceService";
import {
    AppstoreAddOutlined,
    ClearOutlined,
    CaretRightOutlined,
    CheckOutlined,
    CloseOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DownOutlined,
    FileSearchOutlined,
    InboxOutlined,
    LinkOutlined,
    LockOutlined, PlusOutlined,
    SearchOutlined,
    SettingOutlined,
    RollbackOutlined,
    UnlockOutlined
} from '@ant-design/icons';
import {useForm} from "antd/lib/form/Form";
import {alphabeticalSort} from "../utils/sorter";
import ConfigService from "../services/ConfigService";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";
import fileDownload from 'js-file-download';
import MappingService from "../services/MappingService";

const {Column} = Table;
const {Meta} = Card;
const {Dragger} = Upload;

const InstanceDetailPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    // Services
    const ontologyService = new OntologyService();
    const instanceService = new InstanceService();
    const fileService = new FileService();
    const mappingService = new MappingService();
    const configService = new ConfigService().getConfig()
    const authService = new AuthService()

    // Variables
    const [classes, setClasses] = useState<any>([]);
    const [instance, setInstance] = useState<any>({});
    const [generateConfig, setGenerateConfig] = useState<any>([]);
    const [generateOptions, setGenerateOptions] = useState<any>([]);
    const [relations, setRelations] = useState<any>([]);

    // Search
    const [classSearch, setClassSearch] = useState<any>([])
    const [relationSearch, setRelationSearch] = useState<any>([])

    // Booleans
    const [visibleClasses, setVisibleClasses] = useState(false);
    const [visibleEditInstance, setVisibleEditInstance] = useState(false);
    const [visibleUpload, setVisibleUpload] = useState(false);
    const [lock, setLock] = useState(true);

    // Forms
    const [classesForm] = useForm();
    const [editForm] = useForm();
    const [uploadForm] = useForm()

    // loading
    const [loading, setLoading] = useState<any>({instances: false, classes: false});


    useEffect(() => {
        getInstanceInfo();
    }, []);

    const getInstanceInfo = () => {
        setLoading({...loading, instances: true})

        instanceService.getInstance(params.id).then((res) => {

            let data = res.data.data
            getClasses(data.current_ontology);
            setInstance(data)

            // generate select init values
            setGenerateConfig((data.classes_to_map))
            setGenerateOptions(data.classes_to_map.map((i: string) => {
                return {value: i, label: i}
            }));

            setClassSearch(data.classes_to_map);
            getRelations(data)
            setLoading({...loading, instances: false})

        }).catch((err) => {
            message.error(err.toString())
            setLoading({...loading, instances: false})
        })
    }

    const getClasses = (id: string) => {
        setLoading({...loading, classes: true})
        ontologyService.getClasses(id).then((res) => {
            setClasses(res.data.data);
            setLoading({...loading, classes: false})
        }).catch((err) => {
            message.error(err.toString())
            setLoading({...loading, classes: false})
        });
    }

    const getRelations = (instance: any) => {
        ontologyService.getRelationsBetweenClasses(instance.current_ontology, {classes: instance.classes_to_map}).then((res) => {
            let rel = Object.keys(res.data.relations).map((rel: string) => {
                return instance.relations[rel]
            })

            setRelations(rel);
            setRelationSearch(rel);
        });
    }

    // Class Modal

    const closeClasses = () => {
        setVisibleClasses(false);
        classesForm.resetFields();
    }

    const showClasses = () => {
        classesForm.setFieldsValue({select: instance.classes_to_map})
        setVisibleClasses(true);
    }

    const onFinishClasses = () => {
        let values = classesForm.getFieldValue('select');

        // set new values
        setGenerateConfig(values);
        setGenerateOptions(values.map((i: string) => {
            return {value: i, label: i}
        }));

        let newInstance = {...instance, classes_to_map: values}

        setInstance(newInstance)
        getRelations(newInstance)
        setClassSearch(values)
        closeClasses();

        instanceService.editInstances(params.id, {
            classes_to_map: values,
        }).catch((err) => {
            message.error(err.toString())
        })

    }

    // Edit Instance Modal

    const showEditInstance = () => {
        setVisibleEditInstance(true);
    }

    const closeEditInstance = () => {
        setVisibleEditInstance(false);
    }

    const onFinishEditInstance = () => {
        instanceService.editInstances(params.id, editForm.getFieldsValue()).then((res) => {
            closeEditInstance();
            setInstance(res.data.instance)
            message.success(res.data.successful);
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const onChangeDragger = (info: any) => {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`, 2);
        }
    }

    // Upload Modal

    const closeUploadModal = () => {
        setVisibleUpload(false);
        uploadForm.resetFields();
    }

    const onFinishUpload = () => {
        const filenames = uploadForm.getFieldValue('filenames').fileList.map((file: any) => {
            return file.name
        })

        let aux_files = Array.from(new Set(instance.filenames.concat(filenames)));

        instanceService.editInstances(params.id, {filenames: aux_files}).then((res) => {
            setInstance(res.data.instance);
            message.success(res.data.successful)
        }).catch(err => message.error(err.toString()))
        closeUploadModal()
    }

    // File
    const removeFile = (item: any) => {
        let filename_list = instance.filenames;
        const index = filename_list.indexOf(item);

        // Local Changes
        if (index >= 0 && filename_list.length > 1) {
            filename_list.splice(index, 1);
            setInstance({...instance, filenames: filename_list})
            instanceService.editInstances(params.id, {filenames: filename_list}).catch((err) => {
                message.error(err.data().error);
            })
        }
    }

    const downloadFiles = () => {
        instance.filenames.map((i: string) => {
            fileService.download(i).then((res) => {
                fileDownload(res.data, i)
            }).catch((err) => {
                message.error(err.toString())
            })
        })
    }

    // Mapping

    const startMapping = (_class: string) => {
        navigate('mapping', {
            state: {
                ref: params.id,
                _class: _class,
                subject: instance.mapping[_class].subject,
                current_file: instance.mapping[_class].fileSelected,
                files: instance.filenames.map((i: any) => {
                    return {value: i, label: i}
                })
            }
        });
    }

    const startLink = (relation: any) => {
        navigate('link', {
            state: {
                ref: params.id,
                relation: relation
            }
        })
    }

    const selectRelation = (value: any, record: any) => {
        let newInstance = instance;
        newInstance.relations[record.relation].selected = !value
        setInstance(newInstance)
        instanceService.editInstances(params.id, {relations: newInstance.relations}).catch(err => message.error(err.toString()))
    }

    const generate = () => {
        mappingService.generateYARRML({ref: params.id, classes: generateConfig}).then((res) => {
            message.success("The YARRRML file has been generated successfully.")
            fileDownload(res.data.yaml, `${params.id}.yaml`)
        }).catch(err => message.error(err.toString()))
    }

    const preview = () => {
        navigate("preview", {
                state: {
                    instance: instance,
                    relations: relations
                }
            }
        )
    }

    // Search Functions
    const handleClassSearch = (value: string) => {
        value === '' ? setClassSearch(instance.classes_to_map) : setClassSearch(instance.classes_to_map.filter((i: any) => i.includes(value)))
    }

    const handleRelationSearch = (value: string) => {
        value === '' ? setRelationSearch(relations) : setRelationSearch(relations.filter((i: any) => i.relation.includes(value)))
    }

    // Add and clean functions

    const addAll = () => {
        classesForm.setFieldsValue({select: classes})
    }

    const undo = () => {
        classesForm.setFieldsValue({select: instance.classes_to_map})

    }

    const cleanAll = () => {
        classesForm.resetFields(['select'])

    }

    return (<>
        {/* Classes Modal */}
        <Modal visible={visibleClasses} onCancel={closeClasses} onOk={classesForm.submit} width={"50%"}>
            <Form layout={"vertical"} form={classesForm} onFinish={onFinishClasses}>
                <Form.Item name={"select"} label={"Classes"} rules={[{required: true}]}>
                    <Select mode="multiple"
                            placeholder="Select the class/es that you would like to map."
                            options={classes}/>
                </Form.Item>
            </Form>
            <Divider/>
            <Space size={"middle"}>
                <Tooltip title={"Add All"} placement={"bottom"}><Button onClick={addAll} shape={"circle"}
                                                                        icon={<PlusOutlined/>}/></Tooltip>
                <Tooltip title={"Clean All"} placement={"bottom"}><Button onClick={cleanAll} shape={"circle"}
                                                                          icon={<ClearOutlined/>}/>
                </Tooltip>
                <Tooltip title={"Undo All"} placement={"bottom"}><Button onClick={undo} shape={"circle"}
                                                                         icon={<RollbackOutlined/>}/></Tooltip>
            </Space>

        </Modal>

        {/* Edit Instance Modal */}

        <Modal
            width={"100vh"}
            visible={visibleEditInstance}
            title="Create Instance"
            onCancel={closeEditInstance}
            onOk={editForm.submit}>

            <Form form={editForm} layout={"vertical"}
                  initialValues={{name: instance.name, description: instance.description}}
                  onFinish={onFinishEditInstance}>
                <Row>
                    <Col span={10}>
                        <Form.Item name={"name"} label={"Name"} rules={[{required: true}]}>
                            <Input placeholder={"Instance Name"}/>
                        </Form.Item>

                    </Col>
                    <Col span={2}/>
                    <Col span={10}>
                        <Form.Item name={"description"} label={"Description"}>
                            <Input.TextArea showCount maxLength={280}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>

        <Modal width={"80vh"} visible={visibleUpload}
               onCancel={closeUploadModal}
               onOk={uploadForm.submit}>
            <Form form={uploadForm} layout={"vertical"} onFinish={onFinishUpload}>
                <Form.Item name={"filenames"}>
                    <Dragger
                        style={{marginTop: "2vh"}}
                        accept={".json,.csv"}
                        action={configService.api_url + "/files/upload"}
                        headers={{Authorization: "Bearer " + authService.hasCredentials()}}
                        onChange={onChangeDragger}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined/>
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company
                            data or other
                            band files.
                        </p>
                    </Dragger>
                </Form.Item>
            </Form>

        </Modal>

        {/* Content */}
        <Row>
            <Col span={1}/>
            <Col span={10}>
                <h3><b>Classes</b></h3>
                <Table bordered rowKey={(record) => {
                    return record
                }} size={"small"} pagination={{pageSize: 5}} dataSource={classSearch}
                       loading={loading.instances}>
                    <Column title={"Class"}
                            sortDirections={['descend', 'ascend']}
                            sorter={{compare: (a: any, b: any) => alphabeticalSort(a, b)}}
                            filterIcon={() => <SearchOutlined/>}
                            filterDropdown={() => {
                                return (
                                    <div style={{padding: 8}}>
                                        <Input.Search
                                            allowClear={true}
                                            defaultValue={""}
                                            onSearch={i => handleClassSearch(i)}
                                            placeholder={`Search Class`}
                                            style={{marginBottom: 8, display: 'block'}}
                                        />
                                    </div>
                                );
                            }}
                    />
                    <Column align={"center"} title={"Actions"} render={(value, record, index) => {
                        return <Space><Tooltip title={"Map"} placement={"bottom"}><Button size={"small"}
                                                                                          shape={"circle"}
                                                                                          icon={<AppstoreAddOutlined/>}
                                                                                          onClick={() => startMapping(value)}/></Tooltip></Space>
                    }}/>
                </Table>
                <Divider/>
                <h3><b>Link</b></h3>
                <Table bordered size={"small"} pagination={{pageSize: 5}} dataSource={relationSearch}
                       loading={loading.instances}>
                    <Column title={"Relation"} dataIndex={"relation"}

                            sortDirections={['descend', 'ascend']}
                            sorter={{
                                compare: (a: any, b: any) => alphabeticalSort(a.relation, b.relation),
                                multiple: 2
                            }}
                            filterIcon={() => <SearchOutlined/>}
                            filterDropdown={() => {
                                return (
                                    <div style={{padding: 8}}>
                                        <Input.Search
                                            allowClear={true}
                                            defaultValue={""}
                                            onSearch={i => handleRelationSearch(i)}
                                            placeholder={`Search Relation`}
                                            style={{marginBottom: 8, display: 'block'}}
                                        />
                                    </div>
                                );
                            }}
                    />
                    <Column title={"Selected"} dataIndex={"selected"} align={"center"}
                            sortDirections={['descend', 'ascend']}
                            filters={[{text: "Selected", value: true}, {text: "Unselected", value: false}]}
                            onFilter={((value, record) => record.selected === value)}

                            sorter={{
                                compare: (a: any, b: any) => alphabeticalSort(a.selected.toString(), b.selected.toString()),
                                multiple: 2
                            }}

                            render={((value, record, index) => {
                                return <Switch checked={value} checkedChildren={<CheckOutlined/>}
                                               unCheckedChildren={<CloseOutlined/>} onClick={() => {
                                    selectRelation(value, record)
                                }}/>
                            })
                            }/>
                    <Column title={"Actions"} align={"center"} render={((value, record) => {
                        return <Space><Tooltip title={"Link"} placement={"bottom"}><Button size={"small"}
                                                                                           shape={"circle"}
                                                                                           icon={<LinkOutlined/>}
                                                                                           onClick={() => {
                                                                                               startLink(record)
                                                                                           }}/></Tooltip></Space>
                    })
                    }/>
                </Table>
            </Col>
            <Col span={2} style={{paddingLeft: "2%"}}>
                <Button type={"primary"} shape="circle" icon={<DownOutlined/>} onClick={showClasses}/>
            </Col>
            <Col span={10}>
                <Card size={"small"} loading={loading.instances} title={"Ref.: " + params.id}
                      actions={[
                          <Tooltip title={"Edit"} placement={"bottom"}><SettingOutlined onClick={showEditInstance}
                                                                                        key="setting"/></Tooltip>,
                          <Tooltip title={"Upload"} placement={"bottom"}><CloudUploadOutlined onClick={() => {
                              setVisibleUpload(true)
                          }} key={"upload"}/></Tooltip>,
                          <Tooltip title={"Download"} placement={"bottom"}><CloudDownloadOutlined
                              onClick={downloadFiles}
                              key={"download"}/></Tooltip>]}>
                    <Meta title={<b>{instance.name}</b>} description={instance.description}/>
                    <div style={{marginTop: "1%"}}>
                        <h4><b>{instance.createdAt}</b></h4>
                        <h4>Created By: <b>{instance.createdBy}</b></h4>
                        <Progress percent={instance.status} strokeColor="#52c41a"/>

                        <Row justify={"center"} gutter={10} style={{alignItems: "center"}}>
                            <Col span={23}>
                                <Card size={"small"} style={{marginTop: "1%"}} loading={loading.instances}>
                                    {instance.filenames?.map((i: any) => {
                                        return <Tag closable={instance.filenames.length > 1 && !lock} onClose={() => {
                                            removeFile(i)
                                        }} key={i} color={"blue"}>{i}</Tag>
                                    })}
                                </Card>
                            </Col>
                            <Col span={1}>
                                <Button type={"text"} icon={lock ? <LockOutlined/> : <UnlockOutlined/>} onClick={() => {
                                    setLock(!lock)
                                }}/>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <Divider/>
                <Card title={"Generate YARRRML"} actions={[

                    <Tooltip title={"Preview"} placement={"bottom"}> <FileSearchOutlined key={"preview"}
                                                                                         onClick={preview}/></Tooltip>,
                    <Tooltip title={"Run"} placement={"bottom"}><CaretRightOutlined key="run" style={{color: "green"}}
                                                                                    onClick={generate}/></Tooltip>
                ]}>
                    <Row>
                        <Col span={24}>
                            <Select mode={"multiple"} loading={loading.instances} showSearch options={generateOptions}
                                    style={{minWidth: "100%"}}
                                    value={generateConfig} onChange={(value) => {
                                setGenerateConfig(value)
                            }}/>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={1}/>
        </Row>

    </>)

}
export default InstanceDetailPage;