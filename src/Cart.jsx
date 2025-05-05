import { useOutletContext } from "react-router";
import CartItemListing from "./CartItemListing";

function Cart () {
    const { cartItems } = useOutletContext();

    function calculateTotalPrice() {
        let total = 0;
        cartItems.forEach((data, id) => {
            total += data.pricePer * data.amount;
        });

        return total.toFixed(2);
    }

    return (
        <div>
            <h3>Cart</h3>
            <div className="cart-items-section">
                {cartItems.size === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    <div>
                        {Array.from(cartItems.entries()).map(([id, data]) => {
                            return <CartItemListing key={id} data={data}/>;
                        })}
                        <br />
                        <div>Total: <strong>${calculateTotalPrice()}</strong></div>
                        <br />
                        <button onClick={() => console.log("okay let's just pretend you actually bought the stuff")}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;