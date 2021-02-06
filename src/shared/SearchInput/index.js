import { TextField } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import debounce from 'lodash/debounce';

const SearchInput = ({onChange, title}) => {
    const [value, setValue] = useState('');

    const debouncedSearch = useCallback(debounce((newValue) => {
        onChange(newValue)
    }, 250, { 'maxWait': 1000 }), [onChange]);

    const handleChange = (newValue) => {
        setValue(newValue);
        debouncedSearch(newValue)
    }

    return (
        <TextField
            style={{marginLeft: '10px', marginRight: '10px', position: 'absolute', right: 60}}
            id="outlined-basic"
            label={title || "Search something..."}
            variant="outlined"
            value={value}
            onChange={e => handleChange(e.target.value)}
        />
    )
}

export default SearchInput;