import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";
import requests from "../requests";
import {useSystemAction} from "../context";
import callbacks from "../callbacks";

const Init = () => {
    const [visible,setVisible] = useState(false);
    const [space,setSpace] = useState();
    const {initRoot, cd} = useSystemAction();

    useEffect(()=>{
        requests.getInfo().then(r => {
            setSpace(undefined)
        })
    },[visible]);

    const init = () => {
        console.log('init');
        requests.init().then(r=>{
            cd('/');
            initRoot();
            // open();
            setSpace(r.data.available_space/1024/1024/1024);
            callbacks.success("DFS was init");
        }).catch(e=>{
            callbacks.success(e.response.data.message)
        })
    };

    const open = () => setVisible(!visible);

    return <div>
        <Button style={{width:150}} type="primary" onClick={open}>
            Initialize
        </Button>
        <Modal
            title="Confirm action"
            visible={visible}
            onOk={init}
            onCancel={open}
        >
            {space?`${space.toFixed(3)} GB are available`:'This action will delete al data from file system'}
            {/*<p>Some contents...</p>*/}
            {/*<p>Some contents...</p>*/}
            {/*<p>Some contents...</p>*/}
        </Modal>

    </div>
};

export default Init;