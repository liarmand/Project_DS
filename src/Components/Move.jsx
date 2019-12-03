import React, {useEffect, useState} from "react";
import {Button, Card, TreeSelect, Input, Modal, Menu} from "antd";
import {useSystemAction, useSystemState} from "../context";
import requests from "../requests";
import callbacks from "../callbacks";

const getName = (path) => {
    const p = path.split('/');
    return p[p.length-1];
};
const getTree = (node, prefix='') => {
    const title = node.path === '/'? 'root': getName(node.path);
    return {
        title,
        value: node.path,
        key:node.path,
        children: node.dirs.map(d => getTree(d))
    }
};

const Move = ({path,name,visible,setVisible}) => {
    const {initRoot} = useSystemAction();
    const {root, currentPath} = useSystemState();
    const [newDir, setNewDir] = useState(path);


    const MoveFile = () => {
        console.log(path,name,newDir,name)
        requests.moveFile(path,name,newDir,name).then(r => {

            callbacks.success(`${name} was moved`);
            initRoot();
        });
        open();
        // console.log(newDir)
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
                title={"Move File"}
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
                </div>

            </Modal>
        </React.Fragment>
    )
};
export default Move;