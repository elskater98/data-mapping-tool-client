import React, {Fragment, useState} from "react";
import {Button, message, Steps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";
import store from "../store";
import {setCurrentMapping, setIndex} from "../actions/instances_actions";
import MappingService from "../services/MappingService";

const {Step} = Steps;

const InstancePage = () => {

    const [current, setCurrent] = useState(store.getState().instance.index);
    const [nextStep, setNextStep] = useState(store.getState().instance.upload)
    const [prevStep, setPrevStep] = useState(false)
    const [doneStep, setDoneStep] = useState(false)
    const navigate = useNavigate();
    const mappingService = new MappingService();

    const [steps, setSteps] = useState([
        {
            title: 'Load Data',
        },
        {
            title: 'Sample Data',
        },
        {
            title: 'Select Columns',
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
            case 2:
                navigate("select/")
                break
        }
        setCurrent(index);
        store.dispatch(setIndex(index));
    }

    const sendColumnsToMap = () => {
        const data = store.getState().instance;
        mappingService.createMappingInstance({
            rawColumns: data.columns,
            selectedColumns: data.columnsSelected,
            filename: data.file.name
        }).then((res) => {
            const ref = res.data['data']['ref']
            store.dispatch(setCurrentMapping(ref))
            message.info("New Mapping with ref.:" + ref)
        }).catch((err) => {
            message.error("The mapping has been failed during the creation.")
        });
    }

    const next = () => {
        handleNavigation(current + 1)
    };

    const prev = () => {
        handleNavigation(current - 1)
    };

    const done = () => {
        if (store.getState().instance.columnsSelected.length > 0) {
            sendColumnsToMap();
            navigate('/')
        }
    }

    let unsubscribe = store.subscribe(() => {
        switch (store.getState().instance.index) {
            case 0: // upload
                setNextStep(store.getState().instance.file);
                break

            case 1: // sample
                setNextStep(store.getState().instance.sample);
                setPrevStep(true);
                break

            case 2: // select
                setDoneStep(store.getState().instance.columnsSelected.length > 0);
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
                <Button type="primary" disabled={!doneStep} onClick={done}>
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
export default InstancePage;