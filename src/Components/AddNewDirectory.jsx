import {Button, Modal, Input} from "antd";
import React, {useEffect, useState} from "react";
import {useSystemAction} from "../context";
import requests from "../requests";
import callbacks from "../callbacks";

const {Search} = Input;

const AddNewDirectory = ({name, path}) => {
    const {initRoot, cd} = useSystemAction();
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
        }).catch(e=>{
            callbacks.error(e.response.data.message)
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
            cd(dir);
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
                        ghost icon="delete" size="small"
                        style={{padding: 0, display: 'inline-block'}}
                        onClick={openSetting}
                />
                <Modal
                    title={`Confirm deletion`}
                    visible={visibleSetting}
                    footer={<div>
                        <Button onClick={openSetting}>No</Button>
                        <Button type="danger" onClick={deleteDir}>Yes</Button>
                    </div>}
                    onCancel={openSetting}
                >
                    All files in this directory will be deleted. Do you want to delete this directory?

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