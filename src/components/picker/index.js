import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Box } from '../../components'
import Consts from '../../consts'

//seçili olana renk
// { label: 'Orange', value: 'orange', color: colors.primary },
/*
[
                { label: 'Önemli', value: 'orange', color: null, },
                { label: 'Football', value: 'football', color: null },
                { label: 'Baseball', value: 'baseball', color: null },
                { label: 'Hockey', value: 'hockey', color: null },
            ]
*/
const Picker = ({ items = [], placeholder = {}, defaultValue = {}, selectedValue }) => {
    const [defaultValue, setDefaultValue] = useState(defaultValue)
    const setSelectedItem = (value) => {
        setDefaultValue(value)
        //selectedValue(value)
    }
    return (
        <RNPickerSelect
            onValueChange={(value) => { setSelectedItem(value) }}
            value={defaultValue}
            placeholder={placeholder}
            Icon={() => <Box size='20' bg='red' borderRadius={9999} alignItems='center' justifyContent='center' />}
            useNativeAndroidPickerStyle={false}
            style={{
                ...pickerSelectStyles, iconContainer: {
                    top: 20,
                    right: 16,
                }
            }}
            items={items}
        />
    )
}
const pickerSelectStyles = StyleSheet.create(Consts.defaultPickerStyle);

export default Picker