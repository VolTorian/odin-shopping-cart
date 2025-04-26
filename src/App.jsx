import './App.css'

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';

import NavBar from "./NavBar";

function App() {
    const SHOP_ITEM_COUNT = 20;
    const [shopItems, setShopItems] = useState([]);
    const [cartItems, setCartItems] = useState(new Map());

    useEffect(() => {
        fetchItems(SHOP_ITEM_COUNT);
    }, []);

    async function fetchItems(numberOfItems) {
        const initialList = new Array(numberOfItems).fill(null);
        setShopItems(initialList);

        for (let i = 1; i <= numberOfItems; i++) {
            fetch(`https://fakestoreapi.com/products/${i}`)
                .then((response) => response.json())
                .then((data) => {
                    setShopItems((prev) => {
                        const updated = [...prev];
                        updated[i - 1] = data;
                        // console.log(data.id)
                        return updated;
                    });
                });
        };
    }

    function addToCart(item) {
        const newMap = new Map(cartItems);
        newMap.set(item, 1)

        setCartItems(newMap);
    }

    return (
        <>
            <NavBar amountInCart={cartItems.size}/>
            <Outlet context={[shopItems, addToCart]} />
        </>
    );
}

export default App;