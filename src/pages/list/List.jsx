import React, { useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './list.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import useFetch from '../../hooks/useFetch'


function List() {
    const location = useLocation()
    //console.log(location);
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date)
    const [option, setOption] = useState(location.state.option)
    const [openDate, setOpenDate] = useState(false)
    const [min, setMin] = useState(undefined)
    const [max, setMax] = useState(undefined)

    const { data, loading, error, reFetch } = useFetch(`http://localhost:8000/hotel/all-hotels?city=${destination}&min=${min || 0}&max=${max || 500}`)
    //console.log(data);
    const res = data && data.allHotels;
    //console.log(res);

    const handleClick = () => {
        reFetch()
    }

    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listSearch">
                        <h1 className="lsTitle">
                            Search
                        </h1>
                        <div className="lsItem">
                            <label htmlFor="">Destination</label>
                            <input type="text" name="" id="" placeholder={destination} />
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Check in Date: </label>
                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to  ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                            {openDate && (<DateRange
                                onChange={(item) => setDate([item.selection])}
                                minDate={new Date()}
                                ranges={date}
                            />)}
                        </div>
                        <div className="lsItem">
                            <label htmlFor="">Options</label>
                            <div className="lsOptions">
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Min Price <small>per night</small></span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Max Price <small>per night</small></span>
                                    <input type="number" onChange={e => setMin(e.target.value)} className="lsOptionInput" />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Adults</span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={option.adult} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Children</span>
                                    <input type="number" min={0} className="lsOptionInput" placeholder={option.children} />
                                </div>
                                <div className="lsOptionItem">
                                    <span className="lsOptionText">Rooms</span>
                                    <input type="number" min={1} className="lsOptionInput" placeholder={option.room} />
                                </div>
                            </div>
                        </div>
                        <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                        {loading ? (
                            "Loading Please wait"
                        ) : (
                            <>
                                {res && res.map((item, index) => (
                                    <SearchItem item={item} key={index} />
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List