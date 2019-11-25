import React, {useEffect, useState} from "react";
import {Button, Card, TreeSelect, Input, Modal, Menu} from "antd";
import {useSystemAction, useSystemState} from "../context";
import requests from "../requests";

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

const Copy = ({path,name,visible,setVisible}) => {
    const {initRoot} = useSystemAction();
    const {root, currentPath} = useSystemState();
    const [newDir, setNewDir] = useState('/');
    const [newName, setNewName] = useState('copy_'+name);


    const MoveFile = (name) => {
        console.log(newDir)
    };

    const onChangeDir = value => {
        setNewDir(value);
    };

    const open = () => {
        setVisible(!visible)
    };

    const treeData = getTree(root);

    return(
        <React.Fragment>
            <Modal
                title={"Copy File"}
                visible={visible}
                onOk={MoveFile}
                // footer={false}
                onCancel={open}
            >
                <div>
                    Choose directory:
                    <TreeSelect
                        style={{ width: '100%', marginBottom: 10}}
                        value={newDir}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        onChange={onChangeDir}
                    />

                    Choose name:
                    <Input
                        value={newName}
                        onChange={({target: {value}}) => setNewName(value)}
                    />
                </div>

            </Modal>
        </React.Fragment>
    )
};
export default Copy;