import { useRef, useState } from "react";

function ItemCard({ data, addToCartCallback }) {
    const [amount, setAmount] = useState(1);
    const detailsModal = useRef(null);

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
            title: data.title,
            amount: amount,
            image: data.image,
            pricePer: data.price
        };
        addToCartCallback(item);
    }

    function toggleDetails() {
        if (detailsModal.current.open) {
            console.log("O.o what this should not be reachable")
            detailsModal.current.close();
        }
        else {
            detailsModal.current.showModal();
        }
    }

    return (
        <div className="item-card">
            <div className="image-container">
                <img src={data.image} alt={"Image for " + data.title} />
            </div>
            <h4 className="item-title">{data.title}</h4>
            <div className="item-rating">{data.rating.rate}/5 out of {data.rating.count} ratings</div>
            <div className="item-price">${data.price.toFixed(2)}</div>
            <div className="item-card-buttons">
                <button onClick={toggleDetails}>Details</button>
                <input type="number" step="1" min="0" value={amount} onChange={handleAmountChange} onKeyDown={handleKeyDown} onBlur={handleLoseFocus}/>
                <button onClick={addToCart}>Add to Cart</button>
            </div>
            <dialog className="item-details-modal" ref={detailsModal}>
                <h4 className="item-title">{data.title}</h4>
                <div>{data.description}</div>
                <br />
                <button onClick={() => (detailsModal.current.close())}>Close</button>
            </dialog>
        </div>
    )
}

export default ItemCard;