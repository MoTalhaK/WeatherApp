import React from 'react';
import './weather.css'

const Weather = (props) => {
    return (
        <div className="container">
            <div className="cards pt-4">
                <h1 className="text-light">{props.city}</h1>
                <p className="text-light">{props.currDate}</p>
                <h5 className="py-4 weather-icon">
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                </h5>

                {props.temp_celsius ? (<h1 className="py-2 deg">{props.temp_celsius}&deg;</h1>): null}

                {/** max and min temps */}
                {minmaxTemp(props.temp_min, props.temp_max)}

                <h4 className="py-3 desc">{props.desc}</h4>
            </div>
        </div>
    );
};

function minmaxTemp(min, max) {
    if (min && max) {
        return (
            <h3 className="min-max">
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}

export default Weather;