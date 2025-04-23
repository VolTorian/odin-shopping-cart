import { useState } from "react";

function ItemCard({ data }) {
    const [amount, setAmount] = useState(1);

    const handleAmountChange = (e) => {
        const newAmount = e.target.value;

        if (newAmount === "") {
            setAmount(1);
        }
        else if (parseInt(newAmount) >= 1) {
            setAmount(parseInt(newAmount));
        }
    };

    return (
        <div className="item-card">
            {/* <h3>{data.id}</h3> */}
            <div className="image-container">
                <img src={data.image} alt={"Image for " + data.title} />
            </div>
            <h4 className="item-title">{data.title}</h4>
            <div className="item-rating">{data.rating.rate}/5 out of {data.rating.count} ratings</div>
            <div className="item-card-buttons">
                <button>Details</button>
                <input type="number" step="1" min="0" value={amount} onChange={handleAmountChange}/>
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemCard;