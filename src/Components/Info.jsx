import React, {useEffect, useState} from "react";
import {Button, Card, TreeSelect, Input, Modal, Menu} from "antd";
import {useSystemAction, useSystemState} from "../context";
import requests from "../requests";


const Info = ({path,name,visible,setVisible}) => {
    const [newDir, setNewDir] = useState('/');
    const [info, setInfo] = useState({});

    useEffect(()=>{
        requests.getFileInfo(path+'/'+name).then(r => {
            setInfo(r.data);
            console.log(r.data)
        })
    },[name,path,visible]);

    const MoveFile = (name) => {
        console.log(newDir)
    };

    const open = () => {
        setVisible(!visible)
    };

    return(
        <React.Fragment>
            <Modal
                title={"File Info"}
                visible={visible}
                onOk={MoveFile}
                footer={false}
                onCancel={open}
            >
                <div style={{fontSize: 'large', width:'20%',display:'inline-block', textAlign:'right',marginRight:'3%'}}>
                    Dir:<br/>
                    Name:<br/>
                    Size:<br/>
                </div>
                <div style={{fontSize: 'large', width:'60%',display:'inline-block'}}>
                    {info.dir}<br/>
                    {info.name}<br/>
                    {info.metadata&&(info.metadata.size/1024/1024).toFixed(3)} MByte<br/>
                </div>

            </Modal>
        </React.Fragment>
    )
};
export default Info;