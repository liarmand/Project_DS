import {Upload, Icon, message, Button} from 'antd';
import React from "react";
import requests from "../requests";
import callbacks from "../callbacks";

const CustomUpload = ({path, addNewFile}) =>  {
    const props = {
        name: 'attach',
        action(file) {
            addNewFile(file.name);
            return `http://18.194.234.210:5000/files/transaction?dir=${path}&name=${file.name}`;
        },
        onChange(info) {
            if (info.file.status === 'done') {
                console.log(info)
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Upload {...props}>
            <Button>
                <Icon type="upload" /> Click to Upload
            </Button>
        </Upload>
    );
};

export default CustomUpload;