import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from "./NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" />
                <Route path="/shop" />
                <Route path="/cart" />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
