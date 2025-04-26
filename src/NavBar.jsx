import { Link } from "react-router";

function NavBar({ amountInCart }) {
    return (
        <div className="navbar">
            <Link to=""><button>Home</button></Link>
            <Link to="shop"><button>Shop</button></Link>
            <Link to="cart"><button>Cart: {amountInCart}</button></Link>
        </div>
    );
}

export default NavBar;