import {Fragment, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import MappingService from "../services/MappingService";
import {message} from "antd";

const CreateMapping = (props: any) => {
    const mappingService = new MappingService();
    const [data, setData] = useState();
    const params = useParams();

    useEffect(() => {
        mappingService.getMappingInstance(params['id']).then((res) => {

        }).catch((err) => {
            message.error(err.toString())
        });
    }, [])

    return (<Fragment>

    </Fragment>)
}
export default CreateMapping;