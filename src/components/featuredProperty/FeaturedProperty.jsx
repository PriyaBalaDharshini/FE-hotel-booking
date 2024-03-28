import useFetch from '../../hooks/useFetch';
import './featuredProperty.css';

const FeaturedProperty = () => {
    const { data, loading, error } = useFetch(
        "http://localhost:8000/hotel/all-hotels?featured=true&limit=4&min=10&max=500"
    );

    // Check if data is defined and if allHotels array is present
    const res = data && data.allHotels;

    return (
        <div className="fp">
            {loading ? ("Loading Please wait") :
                <>
                    {/* Check if res is defined before mapping over it */}
                    {res && res.map((hotel, index) => (
                        <div className="fpItem" key={index}>
                            {/* Conditional rendering for photo */}
                            {hotel.photos ? (
                                <img src={hotel.photos[0]} alt="" className="fpImg" />
                            ) : (
                                <div className="noPhotos">No photos available</div>
                            )}
                            {/* Check if hotel.name is defined before rendering */}
                            {hotel.name && <span className="fpName">{hotel.name}</span>}
                            {/* Check if hotel.city is defined before rendering */}
                            {hotel.city && <span className="fpCity">{hotel.city}</span>}
                            {/* Check if hotel.cheapestPrice is defined before rendering */}
                            {hotel.cheapestPrice && <span className="fpPrice">Starting from {hotel.cheapestPrice}</span>}
                            {/* Check if hotel.rating is defined before rendering */}
                            {hotel.rating && (
                                <div className="fpRating">
                                    <button>{hotel.rating}</button>
                                    <span>Excellent</span>
                                </div>
                            )}
                        </div>
                    ))}
                </>}
        </div>
    );
};

export default FeaturedProperty;
