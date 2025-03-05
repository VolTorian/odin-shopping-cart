import './App.css'

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import NavBar from "./NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default App
