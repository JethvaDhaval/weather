import React, { useEffect, useState } from 'react';
import { getWeather } from '../api/Api'
import './SearchBar.css'

const SearchBar = () => {
    const [city, setCity] = useState("Rajkot");
    const [weather, setWeather] = useState({
        location: {
            name: "",
            region: "",
            country: ""
        },
        current: {
            temp_c: "",
            condition: {
                text: "",
                icon: ""
            }
        },
        forecast: {
            forecastday: []
        }
    });

    const [hoursweather, setHoursWeather] = useState([]);

    const [onoff, setOnOff] = useState(true);

    useEffect(() => {
        getWeather(city)
            .then((data) => {
                setWeather(data);
            }).catch(error => console.log("Error:", error))
    }, [])

    const getCityWeather = (e) => {
        if (city === "") {

        }
        else {
            getWeather(city)
                .then((data) => {
                    setWeather(data);
                }).catch(error => console.log("Error:", error))
            setHoursWeatherEmpty();
            setOnOff(true);
        }
    }

    const setHoursWeatherEmpty = () => {
        if (city !== weather.location.name)
            setHoursWeather([]);
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13 && city !== "") {
            e.preventDefault();
            getCityWeather(e);
        }
    }

    const getLastUpdatedDate = () => {
        let d = new Date(weather.current.last_updated);
        return (d.getHours() + ":" + d.getMinutes()).toString();
    }

    const getDays = (date) => {
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let d = new Date(date);
        return days[d.getDay()];
    }

    const getDates = (date) => {
        let d = new Date(date);
        return d.getDate();
    }

    return (
        <div>
            <nav className="navbar navbar-light bg-dark justify-content-between p-1" style={{ opacity: 0.4 }}>
                <label className="navbar-brand text-light ml-1" style={{ fontFamily: "serif", fontSize: "20px" }}>Forecast</label>
                <div className="form-inline input-group col-md-4" >
                    <input className="form-control form-control-sm bg-transparent text-light font-weight-bold" type="search" placeholder="Enter City..." aria-label="Search" value={city} onChange={e => { setCity(e.target.value); setOnOff(false); }} onKeyUp={e => { handleEnter(e) }} />
                    <span className="input-group-append">
                        <button className="btn btn-white btn-sm text-light border border-light" type="button" onClick={getCityWeather}>
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </nav>

            {onoff === true ?
                <div className="container">
                    <div className="bg-transparent border-0 text-light mt-4">
                        <span
                            className="bg-transparent border-0 text-light mt-4"
                            style={{ fontFamily: "revert", fontSize: "22px", marginBottom: "50px" }}>
                            {weather.location.name} {weather.location.region}, {weather.location.country}
                        </span><br />
                        <div>
                            <img src={weather.current.condition.icon} className="border-0" style={{ marginTop: "-25px" }} alt="" />
                            <span className="bg-transparent border-0 text-light" style={{ fontFamily: "revert", fontSize: "50px" }}>{weather.current.temp_c}&#8451;</span>
                        </div>
                        <span className="bg-transparent border-0 text-light" style={{ fontFamily: "revert", fontSize: "20px" }}>{weather.current.condition.text}</span>
                        <br />
                        <span className="bg-transparent border-0 text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>Updated as of {getLastUpdatedDate()} </span>
                        <br />
                        <span className="bg-transparent border-0 text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>Feels Like {weather.current.feelslike_c}&#176; &emsp; Wind {weather.current.wind_kph} km/h &emsp; Visibility {weather.current.vis_km} km </span>
                        <br />
                        <span className="bg-transparent border-0 text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>Barometer {weather.current.pressure_mb} mb &emsp; Humidity {weather.current.humidity}% &emsp; Cloud {weather.current.cloud}% </span>
                    </div>
                    <div>

                        <label
                            className="bg-transparent border-0 text-light mt-4 d-flex justify-content-start"
                            style={{ fontFamily: "revert", fontSize: "22px", }}>
                            Daily
                    </label>

                        <table className="table text-light" >
                            <tbody>
                                <tr>
                                    {weather.forecast.forecastday.map((weathers, index) => (
                                        <td key={index} className="tdday" scope="row" onLoad={() => { if (index === 0) { setHoursWeather(weathers.hour) } }} onClick={() => { setHoursWeather(weathers.hour) }} >{getDays(weathers.date)} {getDates(weathers.date)}
                                            <br />
                                            <img src={weathers.day.condition.icon} className="border-0" style={{ width: "40px" }} alt="" />
                                            <br />
                                            <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "20px" }}>{weathers.day.maxtemp_c}&#176;</span>{" "}
                                            <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "12px" }}>{weathers.day.mintemp_c}&#176;</span>
                                            <br />
                                            <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "14px" }}>{weathers.day.condition.text}</span>
                                        </td>))}
                                </tr>
                            </tbody>
                        </table>

                        <label
                            className="bg-transparent border-0 text-light mt-4 d-flex justify-content-start"
                            style={{ fontFamily: "revert", fontSize: "22px", }}>
                            Hourly
                    </label>

                        <div className="overflow-auto">
                            <table className="table text-light">
                                <tbody>
                                    <tr>
                                        {hoursweather.map((hours, index) => (
                                            <td key={index} scope="row" style={{ width: "100px" }}>
                                                <div style={{ width: "100px" }}>
                                                    <div>
                                                        <img src={hours.condition.icon} className="border-0" style={{ width: "40px" }} alt="" />
                                                        <br />
                                                        <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "20px" }}>{hours.temp_c}&#176;</span>
                                                        <br />
                                                        <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>{hours.condition.text}</span>
                                                    </div>
                                                    <img src={"https://img.icons8.com/plasticine/2x/water.png"} style={{ width: "20px" }} alt="" />
                                                    <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>{hours.chance_of_rain}%</span>
                                                    <br />
                                                    <span className="bg-transparent text-light" style={{ fontFamily: "revert", fontSize: "13px" }}>{hours.time}</span>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : ""
            }
        </div>
    );
}

export default SearchBar;