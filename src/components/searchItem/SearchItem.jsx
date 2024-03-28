import { Link } from 'react-router-dom'
import './searchItem.css'

function SearchItem({ item }) {
    return (
        <div className="searchItem">
            {item.photos ? (
                <img src={item.photos[0]} alt="" className="siImg" />
            ) : (
                <div className="noPhotos">No photos available</div>
            )}
            <div className="siDesc">
                {item.name && <h1 className="siTitle">{item.name}</h1>}
                {item.distance && <span className="siDistance">{item.distance}</span>}
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    Studio Apartment with Air conditioning
                </span>
                {item.description && <span className="siFeatures">{item.description}</span>}

                <span className="siCancelOp">Free cancellation </span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="siDetails">
                {item.rating && (
                    <div className="siRating">
                        <button>{item.rating}</button>
                        <span>Excellent</span>
                    </div>
                )}
                <div className="siDetailsText">
                    {item.cheapestPrice && <span className="siPrice">Starting from {item.cheapestPrice}</span>}
                    <span className="isTaxOp">
                        Includes Taxes and Fees
                    </span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className='siCheckButton'>See Availability</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SearchItem