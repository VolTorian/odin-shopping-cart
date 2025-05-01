import { useOutletContext } from "react-router";

function Cart () {
    const { cartItems } = useOutletContext();

    return (
        <div>
            <h3>Cart</h3>
            {cartItems.size === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                <div>Nonempty cart</div>
            )}
        </div>
    );
}

export default Cart;