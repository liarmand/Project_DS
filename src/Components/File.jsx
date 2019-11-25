import React from "react";
import {Card, Dropdown, Menu} from "antd";
import requests from "../requests";
import {useSystemAction} from "../context";

const extensions = ['txt'];

const File = ({file}) => {
    const {initRoot} = useSystemAction();
    const name = file.name.split('.');
    const extension = name[name.length - 1];
    const img = extension === 'txt' ? `/icons/${extension}.png` : `/icons/default.png`;

    const handleDelete = () => {
        requests.deleteFile(file.dir,file.name).then(r => {
            initRoot();
        });
    };

    const handleDownload = () => {
        requests.downloadFile(file.dir,file.name).then(response => {
            console.log(response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
        });
    };

    const getInfo = () => {
        requests.getFileInfo(file.dir+'/'+file.name).then(r => {
            console.log(r.data)
        })
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={handleDelete}>Delete file</Menu.Item>
            <Menu.Item key="2" onClick={handleDownload}>Download</Menu.Item>
            <Menu.Item key="e" onClick={getInfo}>Get info</Menu.Item>
        </Menu>
    );

    return <div style={{width: 140, display: 'inline-block', margin: 10}}>
        <Dropdown overlay={menu} trigger={['click']}>
        <Card
            cover={<img style={{width:140}} alt="file" src={img}/>}
            bordered={false}
            hoverable
            style={{width: 140}}
            bodyStyle={{padding: 0}}
        />
        </Dropdown>

        <div style={{textAlign: 'center'}}>{file.name}</div>

    </div>
};

export default File;