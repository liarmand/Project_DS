import React, {useContext, useReducer} from "react";
import requests from "./requests";
import callbacks from "./callbacks";

const SystemContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case'SET_ROOT':
            return {
                ...state,
                root: action.payload,
            };
        case'CHANGE_DIR':
            return {
                ...state,
                currentPath:action.payload,
            };
        case'LOG_OUT':
            return {
                ...state,
                token: null,
                isAuthorize: false,
            };
        case 'GET_USER':
            return {
                ...state,
                ...action.payload,
            };
        case 'RECEIVE_ADMIN_TOKEN':
            return {
                ...state,
                admin_token: action.payload,
            };

        default:
            return state;

    }
};

export const SystemContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, {currentPath: '/', root:undefined});

    const initRoot = async () => {
        let root = undefined;
        try {
            root = await requests.getDir('/');
        }
        catch (e) {
            callbacks.error(e.message);
            // console.log(e.message)
        }

        const dir = localStorage.getItem('dir');
        dispatch({
            type: 'SET_ROOT',
            payload: root.data,
        });
        dir.length && dir!=='null' && await cd(dir)

    };

    const cd = async (value) => {
        dispatch({
            type: 'CHANGE_DIR',
            payload: value,
        })
        localStorage.setItem('dir', value);
    };


    const actions = {cd, initRoot};

    return (
        <SystemContext.Provider value={{state, actions}}>
            {children}
        </SystemContext.Provider>
    )
};

export const useSystemState = () => {
    return useContext(SystemContext).state
};

export const useSystemAction = () => {
    return useContext(SystemContext).actions
};