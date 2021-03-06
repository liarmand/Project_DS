import React, {useEffect, useState} from "react";
import {Button, Card, TreeSelect, Input, Modal, Menu} from "antd";
import {useSystemAction, useSystemState} from "../context";
import requests from "../requests";
import callbacks from "../callbacks";

const getName = (path) => {
    const p = path.split('/');
    return p[p.length-1];
};
const getTree = (node) => {
    const title = node.path === '/'? 'root': getName(node.path);
    return {
        title,
        value: node.path,
        key:node.path,
        children: node.dirs.map(d => getTree(d))
    }
};

const Rename = ({path,name,visible,setVisible}) => {
    const [newName, setNewName] = useState(name);
    const {initRoot} = useSystemAction();

    useEffect(()=>{
        setNewName(name)
    },[visible]);


    const rename = () => {
        requests.moveFile(path,name,path,newName).then(r => {
            initRoot();
        }).catch(r=>{
            callbacks.error(r.response.data.message)
        });
        open();
    };

    const open = () => {
        setVisible(!visible)
    };

    return(
        <React.Fragment>
            <Modal
                title={"Rename File"}
                visible={visible}
                onOk={rename}
                // footer={false}
                onCancel={open}
            >
                <div>
                    Choose new name:
                    <Input
                        value={newName}
                        onChange={({target: {value}}) => setNewName(value)}
                    />
                </div>

            </Modal>
        </React.Fragment>
    )
};
export default Rename;