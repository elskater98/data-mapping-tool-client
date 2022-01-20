import React, {Fragment, useState} from "react";
import {Button, message, Steps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import store from "../store";
import {setIndex} from "../actions";

const {Step} = Steps;

const MappingPage = () => {

    const [current, setCurrent] = useState(store.getState().mapping.index);
    const [nextStep, setNextStep] = useState(store.getState().mapping.upload)
    const [prevStep, setPrevStep] = useState(false)
    const navigate = useNavigate();

    const [steps, setSteps] = useState([
        {
            title: 'Load Data',
        },
        {
            title: 'Sample Data',
        }
    ]);


    const handleNavigation = (index: number) => {
        switch (index) {
            case 0:
                navigate("upload/")
                break
            case 1:
                navigate("sample/")
                break
        }
        setCurrent(index);
        store.dispatch(setIndex(index));
    }

    const next = () => {
        handleNavigation(current + 1)
    };

    const prev = () => {
        handleNavigation(current - 1)
    };

    let unsubscribe = store.subscribe(() => {
        switch (store.getState().mapping.index) {
            case 0: // upload
                setNextStep(store.getState().mapping.file);
                break

            case 1: // sample
                setNextStep(true);
                setPrevStep(true);
                break
        }
    });

    return (<Fragment>
        <Steps current={current}>
            {steps.map(item => (
                <Step key={item.title} title={item.title}/>
            ))}
        </Steps>

        <div className="steps-content">
            <Outlet/>
        </div>

        <div className="steps-action">
            {current < steps.length - 1 && (
                <Button type="primary" disabled={!nextStep} onClick={() => next()}>
                    Next
                </Button>
            )}

            {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
            )}
            {current > 0 && (
                <Button style={{margin: '0 8px'}} disabled={!prevStep} onClick={() => prev()}>
                    Previous
                </Button>
            )}
        </div>
    </Fragment>);

}
export default MappingPage