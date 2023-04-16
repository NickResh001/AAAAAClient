//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>
//);

//// If you want to start measuring performance in your app, pass a function
//// to log results (for example: reportWebVitals(console.log))
//// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Settlement from './Components/settlement/Settlement'
import SettlementCreate from './Components/SettlementCreate/SettlementCreate'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import LogIn from './Components/LogIn/LogIn'
import Logoff from './Components/Logoff/Logoff'
import RegionsList from './Components/RegionList/RegionList'

const App = () => {

    const [settlements, setSettlements] = useState([])
    const addSettlement = (settlement) => setSettlements([...settlements, settlement])
    const removeSettlement = (removeId) => setSettlements(settlements.filter(({ settlementId }) =>
        settlementId !== removeId));

    const [user, setUser] = useState({ isAuthenticated: false, userName: "" })
    useEffect(() => {
        const getUser = async () => {
            return await fetch("https://localhost:7082/api/account/isauthenticated")
                .then((response) => {
                    response.status === 401 &&
                        setUser({ isAuthenticated: false, userName: "" })
                    return response.json()
                })
                .then(
                    (data) => {
                        if (
                            typeof data !== "undefined" &&
                            typeof data.userName !== "undefined"
                        ) {
                            setUser({ isAuthenticated: true, userName: data.userName })
                        }
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getUser()
    }, [setUser])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout user={user} />}>
                    <Route index element={<h3>Main page</h3>} />
                    <Route
                        path="/settlements"
                        element={
                            <>
                                <RegionsList />
                                <SettlementCreate
                                    user={user}
                                    addSettlement={addSettlement}
                                />
                                <Settlement
                                    settlements={settlements}
                                    setSettlements={setSettlements}
                                    removeSettlement={removeSettlement}
                                    user={user}
                                />
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={<LogIn user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/register"
                        element={<Register user={user} setUser={setUser} />}
                    />
                    <Route
                        path="/logoff"
                        element={<Logoff setUser={setUser} />} />
                    <Route
                        path="*"
                        element={<h3>404</h3>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <App />
)