function CartItemListing({ data }) {
    return (
        <div>
            <h4>{data.title}</h4>
            <div>Quantity: {data.amount}</div>
            <hr></hr>
        </div>
    );
}

export default CartItemListing;