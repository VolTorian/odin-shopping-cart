function ItemCard({ data }) {

    return (
        <div className="item-card">
            {/* <h3>{data.id}</h3> */}
            <div className="image-container">
                <img src={data.image} alt={"Image for " + data.title} />
            </div>
            <h4 className="item-title">{data.title}</h4>
            <div className="item-rating">{data.rating.rate}/5 out of {data.rating.count} ratings</div>
        </div>
    )
}

export default ItemCard;