import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import './form.css';

const Form = (props) => {
    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
    } = usePlacesAutocomplete();

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = (val) => {
        setValue(val, false);
    };

    return (
        <form onSubmit={props.loadweather}>
            <Combobox onSelect={handleSelect} aria-labelledby="demo">
                <div className="ui icon input">
                    <ComboboxInput name="city" value={value} onChange={handleInput} disabled={!ready}/>
                    <i aria-hidden="true" className="search icon"></i>
                </div>
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                        data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description}/>
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </form>
    );
};

export default Form;