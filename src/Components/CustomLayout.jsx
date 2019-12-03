import {Layout, Menu, Icon, Breadcrumb, Button} from 'antd';
import React, {useEffect, useState} from "react";
import CustomTree from "./CustomTree";
import CustomBreadcrumb from "./CustomBreadcrumb";
import axios from 'axios';
import {useSystemAction} from "../context";
import Init from "./Init";

const { Header, Content, Footer, Sider } = Layout;

const CustomLayout = ({children}) => {
    const [loading,setLoading] = useState(true);
    const {initRoot} = useSystemAction();

    useEffect(()=>{
        initRoot()
            .then(response => {
                setLoading(false);
            })
            .catch(e => {
                console.log(e);
            })
    },[]);

    return <Layout style={{minHeight:'100vh'}}>

        <Sider
            width= "280px"
            style={{
                overflow: 'scroll',
                height: '100vh',
                minWidth: '20vw',
                position: 'fixed',
                left: 0,
            }}
        >
            <div className="logo" />

            <div style={{height:'82vh'}}>
                {loading?
                    <Icon type="loading" style={{color:'hsla(0,0%,100%,.65)', fontSize:'5vw'}} />:
                    <CustomTree/>
                }
            </div>
            <Init/>


        </Sider>
        <Layout>
            <Content style={{ padding: '0 50px',marginLeft: '280px' }}>
                <CustomBreadcrumb/>
                <div style={{ background: '#fff', padding: 24, minHeight: '80vh' }}>
                    {loading?
                        <Icon type="loading" style={{color:'hsla(0,0%,100%,.65)', fontSize:'5vw'}} />:
                        children
                    }
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>DS Project</Footer>
        </Layout>
    </Layout>
};

export default CustomLayout;