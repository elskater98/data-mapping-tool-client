import React, {Fragment, useState} from "react";
import {Button, message, Steps} from "antd";
import {Outlet, useNavigate} from "react-router-dom";

const {Step} = Steps;

const MappingPage = () => {

    const [current, setCurrent] = useState(0);
    const [steps, setSteps] = useState([
        {
            title: 'Load Data',
            content: 'Load Data',
            enable: false
        },
        {
            title: 'Process Data',
            content: 'Process Data',
            enable: false
        },
        {
            title: 'Save Data',
            content: 'Save Data',
            enable: false
        },
    ]);


    let navigate = useNavigate();

    const handleNavigation = (index: number) => {
        switch (index) {
            case 0:
                navigate("upload/")
                break
        }
        setCurrent(index);
    }

    const next = () => {
        handleNavigation(current + 1)
    };

    const prev = () => {
        handleNavigation(current - 1)
    };
    
    const [count, setCount] = React.useState<unknown | null | any>(0);
    return (<Fragment>
        <Steps current={current}>
            {steps.map(item => (
                <Step key={item.title} title={item.title}/>
            ))}
        </Steps>

        <div className="steps-content">
            <Outlet context={[count, setCount]}/>
        </div>

        <div className="steps-action">
            {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            )}

            {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
            )}
            {current > 0 && (
                <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                    Previous
                </Button>
            )}
        </div>
    </Fragment>);

}
export default MappingPage