import React, {useEffect, useState} from "react";
import {useSystemState} from "../context";
import { Menu, Dropdown } from 'antd';
import File from "./File";
import AddNewFile from "./AddNewFile";



const Directory = () => {
    const [files,setFiles] = useState([]);
    const [visible,setVisible] = useState(false);
    const [uploading,setUploading] = useState(false);
    const {currentPath, root} = useSystemState();

    useEffect(()=>{
        const path = currentPath.split('/');
        let dir = root;
        let tempPath = '';
        path.forEach(p => {
            if(p==='')
                return 0;
            tempPath = `${tempPath}/${p}`;
            dir = dir.dirs.find(d=>d.path===tempPath);
        });
        // console.log(dir)
        dir && setFiles(dir.files);
    },[root,currentPath]);

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={()=>{
                setUploading(false);
                setVisible(true)}}
            >Create new file</Menu.Item>
            <Menu.Item key="2" onClick={()=>{
                setUploading(true);
                setVisible(true)}}
            >Upload file</Menu.Item>
        </Menu>
    );

    return(
        <Dropdown overlay={menu} trigger={['contextMenu']}>
            <div style={{textAlign:'left', minHeight:'80vh'}}>
                {files.map(f=>(
                    <File file={f}  key={f.name}/>
                ))}
                <AddNewFile path={currentPath} visible={visible} setVisible={setVisible} uploading={uploading}/>
            </div>
        </Dropdown>

        )

};

export default Directory;