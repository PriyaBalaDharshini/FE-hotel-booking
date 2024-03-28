import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import './hotel.css'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'

function Hotel() {
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);

    const location = useLocation()

    const id = location.pathname.split("/")[2];

    const { data, loading, error, reFetch } = useFetch(`http://localhost:8000/hotel/find/${id}`);;
    let res = data && data.hotel
    const { date, option } = useContext(SearchContext);
    console.log(date);

    let date_1 = date[0].endDate;
    let date_2 = date[0].startDate;

    const dayDifference = (date1, date2) => {
        const daysTime = 1000 * 60 * 60 * 24;
        if (!date1 || !date2) {
            return 0; // Handle case where date is not available
        }
        const timeDifference = Math.abs(date2.getTime() - date1.getTime());
        const daysDiff = Math.ceil(timeDifference / daysTime);
        return daysDiff;
    };
    const days = (dayDifference(date_1, date_2));

    const handleOpen = (i) => {
        setSlideNumber(i)
        setOpen(true)
    }
    const handleMove = (direction) => {
        let newSlideNumber;
        if (direction === "l") {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
        }
        setSlideNumber(newSlideNumber)
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ?
                ("loading PLease wait"
                ) : (
                    <div className="hotelContainer">
                        {open &&
                            <div className="slider">
                                <FontAwesomeIcon icon={faCircleXmark} onClick={() => setOpen(false)} className='close' />
                                <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")} />
                                <div className="sliderWrapper">
                                    <img src={res && res.photos[slideNumber]} alt="" className="sliderImg" />
                                </div>
                                <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")} />
                            </div>
                        }
                        <div className="hotelWrapper">
                            <button className="bookNow">
                                Reserve or Book Now!
                            </button>
                            <h1 className="hotelTitle">{res && res.name}</h1>
                            <div className="hotelAddress">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <span>{res && res.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location – {res && res.distance} from center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over RS {res && res.cheapestPrice} at this property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {res && res.photos.map((photo, i) => (
                                    <div className="hotelImgWrapper" key={i}>
                                        <img onClick={() => handleOpen(i)} src={res.photos} alt="" className="hotelImg" />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsText">
                                    <h1 className="hotelTitle">{res && res.title}</h1>
                                    <p className="hotelDesc">
                                        {res && res.description}
                                    </p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for a  {days && days} night stay!</h1>
                                    <span>
                                        Located in the real heart of Krakow, this property has an
                                        excellent location score of 9.8!
                                    </span>
                                    <h2>
                                        <b> RS. {days * (res && res.cheapestPrice) * option.room} </b> ({days && days} nights)

                                    </h2>
                                    <button>Reserve or Book Now!</button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>)}



        </div>
    )
}

export default Hotel