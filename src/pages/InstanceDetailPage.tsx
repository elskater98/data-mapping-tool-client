import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import OntologyService from "../services/OntologyService";
import {Button, Card, Col, Form, Input, message, Modal, Progress, Row, Select, Table, Tag, Tooltip, Upload} from "antd";
import InstanceService from "../services/InstanceService";
import {
    AppstoreAddOutlined,
    CloudDownloadOutlined,
    CloudUploadOutlined,
    DownOutlined,
    InboxOutlined,
    LockOutlined,
    SettingOutlined,
    UnlockOutlined
} from '@ant-design/icons';
import {useForm} from "antd/lib/form/Form";
import {alphabeticalSort} from "../utils/sorter";
import ConfigService from "../services/ConfigService";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";
import fileDownload from 'js-file-download';

const {Column} = Table;
const {Meta} = Card;
const {Dragger} = Upload;

const InstanceDetailPage = () => {
    const params = useParams();

    const ontologyService = new OntologyService();
    const instanceService = new InstanceService();
    const fileService = new FileService();
    const configService = new ConfigService().getConfig()
    const authService = new AuthService()

    const [classes, setClasses] = useState<any>([]);
    const [instance, setInstance] = useState<any>({});
    const [visibleClasses, setVisibleClasses] = useState(false);
    const [visibleEditInstance, setVisibleEditInstance] = useState(false);
    const [visibleUpload, setVisibleUpload] = useState(false);

    const [lock, setLock] = useState(true);

    const [classesForm] = useForm();
    const [editForm] = useForm();
    const [uploadForm] = useForm();

    const navigate = useNavigate();

    useEffect(() => {
        getInstanceInfo();
        getClasses();
    }, []);

    const getInstanceInfo = () => {
        instanceService.getInstance(params.id).then((res) => {
            setInstance(res.data.data)
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const getClasses = () => {
        ontologyService.getClasses().then((res) => {
            let data = res.data.data;
            setClasses(data);
        }).catch((err) => {
            message.error(err.toString())
        });
    }

    // Class Modal

    const closeClasses = () => {
        setVisibleClasses(false);
        classesForm.resetFields();
    }

    const showClasses = () => {
        setVisibleClasses(true);
    }

    const onFinishClasses = () => {
        let values = classesForm.getFieldValue('select');
        setInstance({...instance, classes_to_map: values});

        let aux_map: any = instance.mapping;
        if (Object.keys(instance.mapping).length == 0) {
            for (let i of classes) {
                aux_map[i.label] = {status: false, fileSelected: instance.filenames[0], columns: {}}
            }
            setInstance({...instance, mapping: aux_map})
        }

        instanceService.editInstances(params.id, {
            classes_to_map: values,
            mapping: aux_map
        }).then((res) => {
            setInstance({...instance, classes_to_map: values})
            closeClasses();
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
            getInstanceInfo();
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

        setInstance({...instance, filenames: aux_files});
        instanceService.editInstances(params.id, {filenames: aux_files}).then((res) => {
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
                message.error(err.data().error)
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

    return (<>
        {/* Classes Modal */}
        <Modal visible={visibleClasses} onCancel={closeClasses} onOk={classesForm.submit}>
            <Form layout={"vertical"} form={classesForm} onFinish={onFinishClasses}>
                <Form.Item name={"select"} label={"Classes"} rules={[{required: true}]}
                           initialValue={instance.classes_to_map}>
                    <Select mode="multiple" placeholder="Select the class/es that you would like to map."
                            options={classes}/>
                </Form.Item>
            </Form>
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
                <Table bordered={true} size={"middle"} dataSource={instance.classes_to_map}>
                    <Column width={"80vh"} title={"Class"}
                            sortDirections={['descend', 'ascend']}
                            sorter={{compare: (a: any, b: any) => alphabeticalSort(a, b)}}/>
                    <Column align={"center"} title={"Actions"} render={(value, record, index) => {
                        return <Button size={"small"} shape={"circle"} icon={<AppstoreAddOutlined/>}
                                       onClick={() => startMapping(value)}/>
                    }}/>
                </Table>

            </Col>
            <Col span={2} style={{paddingLeft: "2%"}}>
                <Button type={"primary"} shape="circle" icon={<DownOutlined/>} onClick={showClasses}/>
            </Col>
            <Col span={10}>
                <Card loading={!instance} title={"Ref.: " + params.id}
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
                                <Card style={{marginTop: "1%"}} loading={!instance}>
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
            </Col>
            <Col span={1}/>
        </Row>

    </>)

}
export default InstanceDetailPage;