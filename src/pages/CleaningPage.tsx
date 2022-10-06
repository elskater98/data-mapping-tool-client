import React, {Fragment, useState} from "react";
import {ClearOutlined, FileAddOutlined, InfoOutlined, SaveOutlined} from '@ant-design/icons';
import {Button, Col, Row, Steps} from 'antd';
import store from "../store";
import {setNextStep, setPreviousStep} from "../actions/cleaning_actions";
import UploadFile from "../parts/UploadFile";

const {Step} = Steps;

const CleaningPage = () => {
    const [currentIndex, setCurrentIndex] = useState(store.getState().cleaning.index)

    const nextStep = () => {
        if (store.getState().cleaning.index < 4)
            store.dispatch(setNextStep())
    }
    const previousStep = () => {
        if (store.getState().cleaning.index > 0)
            store.dispatch(setPreviousStep())
    }

    store.subscribe(() => {
        setCurrentIndex(store.getState().cleaning.index)
    })


    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <Steps current={currentIndex}>
                        <Step title="Load Dataset" icon={<FileAddOutlined/>}/>
                        <Step title="Summary" icon={<InfoOutlined/>}/>
                        <Step title="Cleaning" icon={<ClearOutlined/>}/>
                        <Step title="Store" icon={<SaveOutlined/>}/>
                    </Steps>

                    <div className={"container"}>
                        <UploadFile isVisible={currentIndex === 0}/>
                    </div>
                    <Button onClick={nextStep}>Next</Button>
                    <Button onClick={previousStep}>Back</Button>
                </Col>
            </Row>

        </Fragment>
    );
}
export default CleaningPage;