import React from "react";
import {Button, Dropdown, Icon, Menu, Tree} from 'antd';
import {useSystemAction, useSystemState} from "../context";
import AddNewDirectory from "./AddNewDirectory";

const {TreeNode} = Tree;
const CustomTree = () => {
    const {root, currentPath} = useSystemState();
    const {cd} = useSystemAction();

    const onSelect = (keys, event) => {
        const path = keys[0];
        if (path && currentPath !== path)
            cd(path);
    };


    const getTree = (node) => {
        const path = node.path.split('/');
        const name = path[path.length - 1];
        if (node.dirs.length) {
            return (
                <TreeNode title={<AddNewDirectory name={name} path={node.path}/>} key={node.path}>

                    {node.dirs.map(d => getTree(d))}

                </TreeNode>
            )
        } else {
            return <TreeNode title={<AddNewDirectory name={name} path={node.path}/>} key={node.path}/>
        }
    };

    return (
        <div style={{textAlign: 'left', marginLeft: '2vw'}}>
            <Tree showLine defaultExpandedKeys={[currentPath]} onSelect={onSelect} draggable onRightClick={'hi'}>
                <TreeNode title={<AddNewDirectory name={'root'} path={'/'}/>} key="/">
                    {root.dirs.map(d => getTree(d))}
                </TreeNode>
            </Tree>
        </div>
    )

};
export default CustomTree;