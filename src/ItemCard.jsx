import { useState } from "react";

function ItemCard({ data, addToCartCallback }) {
    const [amount, setAmount] = useState(1);

    function handleAmountChange(e) {
        const newAmount = e.target.value;

        if (newAmount === "") {
            setAmount("");
        }
        else if (parseInt(newAmount) >= 0) {
            setAmount(parseInt(newAmount));
        }
    };

    function handleKeyDown(e) {
        if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === "E") {
            e.preventDefault();
        }
    }

    function handleLoseFocus() {
        if (amount === "") {
            setAmount(0);
        }
    }

    function addToCart() {
        if (amount === "" || amount === 0) {
            return;
        }

        const item = {
            id: data.id,
            amount: amount
        };
        addToCartCallback(item);
    }

    return (
        <div className="item-card">
            {/* <h3>{data.id}</h3> */}
            <div className="image-container">
                <img src={data.image} alt={"Image for " + data.title} />
            </div>
            <h4 className="item-title">{data.title}</h4>
            <div className="item-rating">{data.rating.rate}/5 out of {data.rating.count} ratings</div>
            <div className="item-price">${data.price}</div>
            <div className="item-card-buttons">
                <button>Details</button>
                <input type="number" step="1" min="0" value={amount} onChange={handleAmountChange} onKeyDown={handleKeyDown} onBlur={handleLoseFocus}/>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemCard;