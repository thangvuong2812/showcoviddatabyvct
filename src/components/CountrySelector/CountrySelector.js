import React from 'react'
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';


export default function CountrySelector({value, handleChange, countries}) {
    return <FormControl>
        <InputLabel htmlFor="country-selector" shrink>Quốc gia</InputLabel>
        <NativeSelect
            value={value} 
            onChange={handleChange} 
            inputProps={{
                name: 'country',
                id: 'country-selector'
            }}>
            {
                countries.map(({Country, ISO2}) => {
                    return <option key={ISO2} value={ISO2.toLowerCase()}>{Country}</option>
                })
            }
        </NativeSelect>
        <FormHelperText>Chọn quốc gia</FormHelperText>
    </FormControl>
}

CountrySelector.defaultProps = {
    countries: [],
}