import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoginProvider } from "./content/LoginContext";
import { TestProvider } from './content/TestContext';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

ReactDOM.render(

  <React.StrictMode>
  <BrowserRouter>

      <LoginProvider>
      <TestProvider>

<Routes>
  <Route  path="/*" element={<App/>}/>
</Routes>
      </TestProvider>

    </LoginProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

