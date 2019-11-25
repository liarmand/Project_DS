import {Button, Modal, Input} from "antd";
import React, {useEffect, useState} from "react";
import {useSystemAction} from "../context";
import requests from "../requests";

const {Search} = Input;

const AddNewDirectory = ({name, path}) => {
    const {initRoot} = useSystemAction();
    const [visibleAdd, setVisibleAdd] = useState(false);

    const [visibleSetting, setVisibleSetting] = useState(false);

    useEffect(() => {
        setVisibleAdd(visibleAdd)
    }, [visibleAdd]);

    const addNewDir = (name) => {
        // console.log(name)
        requests.createDir(path, name).then(r => {
            initRoot();
            openAdd();
        })
    };

    const deleteDir = () => {
        let temp = -1;
        while (true) {
            const index = path.indexOf('/', temp + 1);
            if (index === -1)
                break;
            console.log(index);
            temp = index
        }
        const dir = temp === 0 ? '/' : path.slice(0, temp);

        requests.deleteDir(dir, name).then(r => {
            initRoot();
            openSetting();
        })
    };


    const openAdd = () => {
        setVisibleAdd(!visibleAdd)
    };
    const openSetting = () => {
        setVisibleSetting(!visibleSetting)
    };


    return (
        <span style={{height: '30px'}}>
            <div
                style={{paddingTop: 0, float: 'left', display: 'inline-block', height: '24px'}}>{name}</div>
            <Button type="link"
                    ghost icon="plus" size="small"
                    style={{padding: 0, display: 'inline-block'}}
                    onClick={openAdd}
            />

            {path !== '/' &&
            <>
                <Button type="link"
                        ghost icon="setting" size="small"
                        style={{padding: 0, display: 'inline-block'}}
                        onClick={openSetting}
                />
                <Modal
                    title={`Settings ${name}`}
                    visible={visibleSetting}
                    footer={<div>
                        <Button type="danger" size="small" onClick={deleteDir}>Delete</Button>
                    </div>}
                    onCancel={openSetting}
                >
                    <div>
                        <Search
                            placeholder="input new directory name"
                            enterButton="Rename"
                            onSearch={value => {
                            }}
                        />

                    </div>

                </Modal>
            </>
            }

            <Modal
                title="Create new directory"
                visible={visibleAdd}
                footer={false}
                onCancel={openAdd}
            >
                <div>
                    <Search
                        placeholder="input directory name"
                        enterButton="Add"
                        onSearch={value => {
                            addNewDir(value)
                        }}
                    />
                </div>

            </Modal>
        </span>
    )
};

export default AddNewDirectory;