import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather-comp';
import Form from './components/form-comp';
import Title from './components/title-comp';

const API_key = "e2be14a84108cb20bb1f5e6b89aac4e2";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            desc: "",
            error: false,
            curr_date: undefined
        };
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-rain",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clear_night: "wi-night-clear",
            Clouds: "wi-day-fog",
            Clouds_night: "wi-night-fog"
        };
    }

    convert_temp(temp) {
        let cell = Math.floor(temp - 273.15);
        return cell;
    }

    convert_date(epoch) {
        let myDate = new Date(epoch * 1000)
        return myDate.toLocaleString();
    }

    get_weatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({icon: this.weatherIcon.Rain});
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeId === 800:
                this.setState({icon: this.weatherIcon.Clear});
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icon: this.weatherIcon.Clouds});
                break;
        }
    }

    get_weatherIcon_night(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId <= 232:
                this.setState({icon: this.weatherIcon.Thunderstorm});
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({icon: this.weatherIcon.Drizzle});
                break;
            case rangeId >= 500 && rangeId <= 531:
                this.setState({icon: this.weatherIcon.Rain});
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({icon: this.weatherIcon.Snow});
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({icon: this.weatherIcon.Atmosphere});
                break;
            case rangeId === 800:
                this.setState({icon: this.weatherIcon.Clear_night});
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({icon: this.weatherIcon.Clouds_night});
                break;
        }
    }

    getWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;

        if (city) {
            const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`);

            const response = await api_call.json();

            console.log(response);

            this.setState({
                city: `${response.name}, ${response.sys.country}`,
                celsius: this.convert_temp(response.main.temp),
                temp_max: this.convert_temp(response.main.temp_max),
                temp_min: this.convert_temp(response.main.temp_min),
                desc: response.weather[0].description,
                curr_date: this.convert_date(response.dt)
            });
            // this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
            if (JSON.stringify(response.weather[0].icon).indexOf("n") > -1) {
                this.get_weatherIcon_night(this.weatherIcon, response.weather[0].id);
                console.log("night")
            } else {
                this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
                console.log("day")
            }
        } else {
            this.setState({error: true});
        }
    };

    render() {
        return (
            <div className="App">
                <Title/>
                <Form loadweather={this.getWeather} error={this.state.error}/>
                <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temp_celsius={this.state.celsius}
                    temp_max={this.state.temp_max}
                    temp_min={this.state.temp_min}
                    desc={this.state.desc}
                    weatherIcon={this.state.icon}
                    currDate={this.state.curr_date}
                />
            </div>
        );
    }
}

export default App;
