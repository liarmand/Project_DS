import {Breadcrumb} from "antd";
import React from "react";
import {useSystemState} from "../context";

const CustomBreadcrumb = () => {
    const {currentPath} = useSystemState();
    console.log(currentPath.split('/'));

    const path = currentPath.split('/').filter(d => d&&d.length);
    return(
        <Breadcrumb style={{ margin: '16px 0', textAlign: 'left' }}>
            <Breadcrumb.Item>root</Breadcrumb.Item>
            {path.map((d,did)=>(
                <Breadcrumb.Item key={did}>{d}</Breadcrumb.Item>
            ))}
            {/*<Breadcrumb.Item> </Breadcrumb.Item>*/}
        </Breadcrumb>
    )
};

export default CustomBreadcrumb;

