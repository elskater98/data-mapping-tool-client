import React, {Fragment} from "react";
import {message, Upload} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;

const UploadPage = () => {

    function onChange(info: any) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`, 1);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`, 2);
        }
    }

    return (
        <Fragment>
            <Dragger maxCount={1}
                     accept={".json,.csv"}
                     action={"http://localhost:8080/files/upload"}
                     headers={{Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY0MjQzMzM2NSwianRpIjoiMDFiODAyMTEtZWFhZi00ZTM3LTk4NzgtYWQ2YTYxMzk4ZWMzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InJvb3RAZ21haWwuY29tIiwibmJmIjoxNjQyNDMzMzY1LCJleHAiOjE2NDI2OTI1NjUsInJvbGVzIjpbIkFkbWluaXN0cmF0b3IiXX0.yIYUVuP6t43iuq68yD7pLcRQPbu7LtQZZNZz8NOTvvg"}}
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


export default UploadPage;