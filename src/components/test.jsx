import React from "react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
} from "react-places-autocomplete";

export default function App() {
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <div className="ui icon input">
                            <input {...getInputProps({ placeholder: "Type address" })} />
                            <i aria-hidden="true" className="search icon"></i>
                        </div>

                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#5f89e6" : "#fff"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, { style })}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
}

// import React from 'react';
// import PlacesAutocomplete from 'react-places-autocomplete';
// import { Input } from 'semantic-ui-react';
// import {
//     geocodeByAddress,
//     geocodeByPlaceId,
//     getLatLng,
// } from 'react-places-autocomplete';
// import './form.css';
//
// const Form = props => {
//     const [address, setAddress] = React.useState("");
//
//     const [coordinates, setCoordinates] = React.useState({
//         lat: null,
//         lng: null
//     });
//
//     const handleSelect = async value => {
//         const results = await geocodeByAddress(value);
//         const latLng = await getLatLng(results[0]);
//         setAddress(value);
//         setCoordinates(latLng);
//     };
//
//     return (
//         <div className="container">
//             <div>{props.error ? error(): null}</div>
//             <form onSubmit={props.loadweather}>
//                 {/*<Input name='city' icon='search' placeholder='Search...' />*/}
//                 <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
//                     {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//                         <div>
//                             <div className="ui icon input">
//                                 <input {...getInputProps({ placeholder: "Type address", name: "city"})} />
//                                 <i aria-hidden="true" className="search icon"></i>
//                             </div>
//                             {/*<Input name='city' icon='search' placeholder='Search...' {...getInputProps()}/>*/}
//                             <div>
//                                 {loading ? <div>...loading</div> : null}
//
//                                 {suggestions.map(suggestion => {
//                                     const style = {
//                                         backgroundColor: suggestion.active ? "#5f89e6" : "#fff"
//                                     };
//
//                                     return (
//                                         <div {...getSuggestionItemProps(suggestion, { style })}>
//                                             {suggestion.description}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     )}
//                 </PlacesAutocomplete>
//             </form>
//         </div>
//     );
// };
//
// function error() {
//     return (
//         <div className="alert alert-danger mx-5" role="alert">
//             Please enter a city!
//         </div>
//     );
// }
//
// export default Form;