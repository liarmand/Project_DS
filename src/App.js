import React from 'react';
import './App.css';
import CustomLayout from "./Components/CustomLayout";
import CustomTree from "./Components/CustomTree";
import {SystemContextProvider} from "./context";
import Directory from "./Components/Directory";

function App() {
  return (
    <div className="App">
        <SystemContextProvider>
            <CustomLayout>
                <Directory/>
            </CustomLayout>
        </SystemContextProvider>
    </div>
  );
}

export default App;
