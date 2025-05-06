function CartItemListing({ data, removeFromCartCallback }) {
    // console.log(data)
    return (
        <div>
            <div className="cart-item-listing">
                <div className="image-container">
                    <img src={data.image} alt="" />
                </div>
                <div className="cart-item-info">
                    <h4>{data.title}</h4>
                    <div><strong>${(data.pricePer * data.amount).toFixed(2)}</strong> (quantity of <strong>{data.amount}</strong> at ${data.pricePer.toFixed(2)} each)</div>
                </div>
                <div>
                    <button onClick={() => removeFromCartCallback(data.id)}>Remove</button>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default CartItemListing;