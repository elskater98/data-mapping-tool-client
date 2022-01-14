import {Outlet, Link, Navigate, useNavigate} from "react-router-dom";
import React, {Fragment, useState} from "react";
import {Steps, Button, message} from 'antd';

const {Step} = Steps;

const steps = [
    {
        title: 'Load Data',
        content: 'Load Data'
    },
    {
        title: 'Process Data',
        content: 'Process Data',
    },
    {
        title: 'Save Data',
        content: 'Save Data',
    },
];

const HomaPage = () => {
    const [current, setCurrent] = useState(0);
    let navigate = useNavigate();

    const next = () => {
        switch (current + 1) {
            case 0:
                navigate("/")
                break
            case 1:
                navigate("/integration")
                break
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        switch (current - 1) {
            case 0:
                navigate("/")
                break
            case 1:
                navigate("/integration")
                break
        }
        setCurrent(current - 1);
    };

    return (
        <Fragment>
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
        </Fragment>
    );
}

export default HomaPage;