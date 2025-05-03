import { useOutletContext } from "react-router";
import CartItemListing from "./CartItemListing";

function Cart () {
    const { cartItems } = useOutletContext();

    return (
        <div>
            <h3>Cart</h3>
            <div className="cart-items-section">
                {cartItems.size === 0 ? (
                    <div>Your cart is empty</div>
                ) : (
                    Array.from(cartItems.entries()).map(([id, data]) => {
                        return <CartItemListing key={id} data={data}/>;
                    })
                )}
            </div>
        </div>
    );
}

export default Cart;