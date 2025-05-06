import './App.css'

import { useEffect, useState } from 'react'
import { Outlet } from 'react-router';

import NavBar from "./NavBar";

function App() {
    const SHOP_ITEM_COUNT = 20;
    const [shopItems, setShopItems] = useState([]);
    const [cartItems, setCartItems] = useState(new Map());
    const [cartAmount, setCartAmount] = useState(0);

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
                        return updated;
                    });
                });
        };
    }

    function addToCart(item) {
        const newMap = new Map(cartItems);

        if (newMap.has(item.id)) {
            const existingItem = newMap.get(item.id);
            newMap.set(item.id, { ...existingItem, amount: existingItem.amount + item.amount });
        }
        else {
            newMap.set(item.id, {
                title: item.title,
                amount: item.amount,
                image: item.image,
                pricePer: item.pricePer
            });
        }

        calculateItemCount(newMap);
    }

    function removeFromCart(itemId) {
        const newMap = new Map(cartItems);
        newMap.delete(itemId);

        calculateItemCount(newMap);
    }

    function calculateItemCount(newMap) {
        let amount = 0;
        newMap.forEach((data, itemId) => {
            amount += data.amount;
        });

        setCartItems(newMap);
        setCartAmount(amount);
    }

    return (
        <>
            <NavBar amountInCart={cartAmount}/>
            <Outlet context={{ shopItems, addToCart, cartItems, removeFromCart }} />
        </>
    );
}

export default App;