
import { AsyncPaginate } from 'react-select-async-paginate';
import React, { useState } from 'react';
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000&namePrefix=${inputValue}`
            , geoApiOptions
        )
            .then((res) => res.json())
            .then((res) => {
                return {
                    options: res.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch(err => console.log(err))

    }

    console.log(loadOptions)

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Search for a city"
            debounceTimeout={1500}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;