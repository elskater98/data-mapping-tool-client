import {Fragment} from "react";
import store from "../store";
import FileService from "../services/FileService";

const SampleData = () => {

    const filename = store.getState().mapping.sample;
    const fileService = new FileService();

    return (<Fragment>

    </Fragment>);
}

export default SampleData;