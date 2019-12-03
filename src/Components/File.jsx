import React, {useState} from "react";
import {Card, Dropdown, Menu} from "antd";
import requests from "../requests";
import {useSystemAction} from "../context";
import Move from "./Move";
import Rename from "./Rename";
import Copy from "./Copy";
import Info from "./Info";
import callbacks from "../callbacks";

const extensions = ['add', 'eps', 'indd', 'cdr', 'gif', 'psd', '', 'wmv', 'dll', 'zip', 'doc', 'sql', 'raw',
    'js', 'xml', 'txt', 'png', 'aac', 'ps', 'xls', 'avi', 'html', 'jpg', '3ds', '1', 'mov', 'cad', 'mp3',
    'pdf', 'ppt', 'flv', 'fla', 'dmg', 'tif', 'iso', 'php', 'mpg', 'css', 'dat', 'svg', 'ai', 'default', 'bmp', 'midi', 'mp4'];

const File = ({file}) => {
    const {initRoot} = useSystemAction();
    const [visibleC,setVisibleC] = useState(false);
    const [visibleM,setVisibleM] = useState(false);
    const [visibleR,setVisibleR] = useState(false);
    const [visibleI,setVisibleI] = useState(false);
    const name = file.name.split('.');
    const extension = name[name.length - 1];

    console.log(extensions.find(e => extension===e))

    const img = extensions.find(e => extension===e) ? `/icons/${extension}.png` : `/icons/default.png`;

    const handleDelete = () => {
        requests.deleteFile(file.dir,file.name).then(r => {
            callbacks.success(`${file.name} was deleted`)
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
            <Menu.Item key="d" onClick={handleDownload}>Download</Menu.Item>
            <Menu.Item key="c" onClick={()=>{setVisibleC(true)}}>Copy</Menu.Item>
            <Menu.Item key="r" onClick={()=>{setVisibleR(true)}}>Rename</Menu.Item>
            <Menu.Item key="m" onClick={()=>{setVisibleM(true)}}>Move</Menu.Item>
            <Menu.Item key="g" onClick={()=>{setVisibleI(true)}}>Get info</Menu.Item>
            <Menu.Item key="del" onClick={handleDelete}>Delete file</Menu.Item>
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

        <Move path={file.dir} name={file.name} visible={visibleM} setVisible={setVisibleM}/>
        <Rename path={file.dir} name={file.name} visible={visibleR} setVisible={setVisibleR}/>
        <Copy path={file.dir} name={file.name} visible={visibleC} setVisible={setVisibleC}/>
        <Info path={file.dir} name={file.name} visible={visibleI} setVisible={setVisibleI}/>
    </div>
};

export default File;