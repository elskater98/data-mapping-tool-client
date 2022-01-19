import React, {Fragment} from "react";
import {message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {useCookies} from "react-cookie";
import ConfigService from "../services/ConfigService";
import store from "../store";
import {handleUploadStep} from "../actions";

const {Dragger} = Upload;

const UploadFile = () => {
    const [cookies, setCookies] = useCookies(['access_token']);
    const configService = new ConfigService().getConfig()

    function onChange(info: any) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`, 2);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`, 2);
        }

        store.dispatch(handleUploadStep(info.fileList.length > 0))
    }

    return (
        <Fragment>
            <Dragger maxCount={1}
                     accept={".json,.csv"}
                     action={configService.api_url + "/files/upload"}
                     headers={{Authorization: "Bearer " + cookies.access_token}}
                     onChange={onChange}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files.
                </p>
            </Dragger>
        </Fragment>
    );
}


export default UploadFile;