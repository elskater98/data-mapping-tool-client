import React, {Fragment, useState} from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import store from "../store";
import {Button, message, Steps} from "antd";
import {setIndex} from "../actions/mapping_actions";
import MappingService from "../services/MappingService";
import OntologyService from "../services/OntologyService";


const {Step} = Steps;
const MappingData = () => {
    const [current, setCurrent] = useState(store.getState().mapping.index);
    const [nextStep, setNextStep] = useState(false)
    const [prevStep, setPrevStep] = useState(false)
    const [doneStep, setDoneStep] = useState(false)
    const navigate = useNavigate();

    const mappingService = new MappingService();
    const ontologyService = new OntologyService();
    const params = useParams();

    const [steps, setSteps] = useState([
        {
            title: 'Classes',
        },
        {
            title: 'Map Data Properties',
        }
    ]);

    const handleNavigation = (index: number) => {
        switch (index) {
            case 0:
                navigate("classes/")
                break
            case 1:
                navigate("properties/data/")
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

    const done = () => {
        let storeValues = store.getState().mapping;
        let properties: any = {}

        for (const property of store.getState().mapping.properties) {
            properties[property.columnName] = property.ontology
        }

        ontologyService.getProperties("object", {classes: storeValues.classesSelected.toString()}).then((relations) => {
            mappingService.editMappingInstance(params.id, {
                properties: properties,
                classes: storeValues.classesSelected,
                relations: relations.data['data']
            }).then((res) => {
                mappingService.runProcess(params.id).then((res) => {
                    message.success("Processing mapping....")
                    navigate("/mapping")
                }).catch((err) => {
                    message.error(err.toString())
                })
            }).catch((err) => {
                message.error(err.toString())
            })
        }).catch((err) => {
            message.error(err.toString())
        })
    }

    const validateMapping = () => {
        for (let item of store.getState().mapping.properties) {
            if (item.ontology.length == 0) {
                return false;
            }
        }
        return true
    }

    let unsubscribe = store.subscribe(() => {
        switch (store.getState().mapping.index) {
            case 0: // classes
                setNextStep(store.getState().mapping.classesSelected.length > 0);
                break
            case 1: // properties
                setDoneStep(validateMapping())
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
    </Fragment>)
}
export default MappingData;