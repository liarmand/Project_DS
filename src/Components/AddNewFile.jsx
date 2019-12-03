import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal} from "antd";
import CustomUpload from "./Upload";
import {useSystemAction} from "../context";
import requests from "../requests";
import callbacks from "../callbacks";

const { Search } = Input;

const AddNewFile = ({path,visible,setVisible,uploading}) => {
    const {initRoot} = useSystemAction();
    useEffect(()=>{
        setVisible(visible)
    },[visible]);

    const addNewFile = (name) => {
        return requests.createFile(path,name).then(r => {
            initRoot();
            open();
            return `http://localhost:5000/files/transaction?dir=${path}&name=${name}`
        }).catch(e=>{
            open();
            callbacks.error(e.response.data.message);
        })
    };

    const open = () => {
        setVisible(!visible)
    };


    return(
        <Modal
            title={uploading?"Upload new file":"Create new file"}
            visible={visible}
            onOk={addNewFile}
            footer={false}
            onCancel={open}
        >
            <div>
                {uploading?
                    <CustomUpload path={path} addNewFile={addNewFile}/>:
                    <Search
                        placeholder="input file name"
                        enterButton="Add"
                        onSearch={value  => {addNewFile(value)}}
                    />
                }

                {/*<div style={{width:'40%', float: 'left',height:'100%'}}>*/}
                {/*    <CustomUpload/>*/}
                {/*</div>*/}
                {/*<div style={{width:'10%', textAlign:'center',paddingTop:'10%',display:'inline-block'}}>OR</div>*/}
                {/*<div style={{width:'40%', float: 'right',height:'100%',paddingTop:'5%'}}>*/}
                {/*    */}
                {/*</div>*/}
            </div>

        </Modal>
    )
};
export default AddNewFile;