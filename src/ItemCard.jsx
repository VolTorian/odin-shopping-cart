function ItemCard({ data }) {

    return (
        <div className="item-card">
            <h3>{data.id}</h3>
            <h6>{data.title}</h6>
        </div>
    )
}

export default ItemCard;