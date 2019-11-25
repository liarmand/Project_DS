import {Upload, Icon, message, Button} from 'antd';
import React from "react";
import requests from "../requests";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const CustomUpload = ({path, addNewFile}) =>  {
    const props = {
        name: 'attach',
        action(file) {
            addNewFile(file.name);
            return `http://localhost:5000/files/transaction?dir=${path}&name=${file.name}`;
        },
        // customRequest: async ({file}) => {
        //     console.log(file)
        //     const p = requests.uploadFile(path,file);
        //     return p;
        // },
        onChange(info) {
            // if (info.file.status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            // }
            if (info.file.status === 'done') {
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