import {InboxOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {message, Upload} from 'antd';
import React from 'react';

const {Dragger} = Upload;



const UploadFile = (props: any) => {


    return props.isVisible ? <>
        <Dragger
            style={{marginTop: "2vh"}}
            accept={".csv"}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
    </> : <></>
}
export default UploadFile;