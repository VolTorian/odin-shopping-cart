import './App.css'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from "./NavBar";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route exact path="/" element={<Home /> } />
                <Route path="/shop" element={<Shop /> }/>
                <Route path="/cart" element={<Cart /> }/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
