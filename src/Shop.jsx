import { useOutletContext } from "react-router";
import ItemCard from "./ItemCard";

function Shop () {
    const [shopItems] = useOutletContext();

    const hasNull = shopItems.some((item) => item === null);  
    
    return (
        <div className="shop">
            <h3>Shop</h3>
            <div className="cards-section">
                {hasNull ? (
                    <h3>Loading, please wait...</h3>
                ) : (
                    shopItems.map((item) => {
                        return <ItemCard key={item.id} data={item} />
                    })
                )}
            </div>
        </div>
    );
}

export default Shop;