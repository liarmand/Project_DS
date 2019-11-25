import axios from 'axios';

const baseUrl = 'http://localhost:5000';
const getDir = (path) =>
    axios.get(`${baseUrl}/dirs`, {
        params: {
            path,
        }
    });

const createFile = (dir,name) =>
    axios({
        "method": "POST",
        "url": `${baseUrl}/files`,
        "data": {
            dir,
            name
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

const deleteFile = (dir,name) =>
    axios({
        "method": "DELETE",
        "url": `${baseUrl}/files`,
        "data": {
            dir,
            name
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

const createDir = (dir,name) =>
    axios({
        "method": "POST",
        "url": `${baseUrl}/dirs`,
        "data": {
            dir,
            name
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

const deleteDir = (dir,name) =>
    axios({
        "method": "DELETE",
        "url": `${baseUrl}/dirs`,
        "data": {
            dir,
            name
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

const uploadFile = (dir,file) =>{
    const formData = new FormData();
    formData.append('attach',file);
    console.log(file);
    return axios({
        "method": "POST",
        "url": `${baseUrl}/files/transaction`,
        "async": true,
        "crossDomain": true,

        params:{
            name: file.name,
            dir,
        },
        "data": formData,
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
    });
};


const downloadFile = (dir,name) =>{
    return axios({
        "method": "GET",
        "url": `${baseUrl}/files/transaction`,
        "async": true,
        "crossDomain": true,
        responseType: 'blob',

        params:{
            name,
            dir,
        },

    });
};

const getFileInfo = (path) =>{
    return axios({
        "method": "GET",
        "url": `${baseUrl}/files`,
        "async": true,
        "crossDomain": true,
        params:{
            path,
        },
    });
};


const requests = {getDir, createFile, deleteFile,createDir,deleteDir,uploadFile,downloadFile,getFileInfo};
export default requests;