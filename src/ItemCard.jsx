function ItemCard({ data }) {

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
                <input type="number" step="1" min="1" value="1" />
                <button>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemCard;