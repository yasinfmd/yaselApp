import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { Box, CircleColor } from '../../components'
import Consts from '../../consts'
import axios from 'axios'
import { colors } from '../../theme';

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
const Picker = ({ placeholder = {}, defaultVal = {}, selectedValue, dataSourceUrl }) => {
    const [defaultValue, setDefaultValue] = useState(defaultVal);
    const [dataSourceLoading, setDataSourceLoading] = useState(false);
    const [items, setItems] = useState([]);
    const setSelectedItem = (value) => {
        setDefaultValue(value)
        //selectedValue(value)
    };
    useEffect(() => {
        setDataSourceLoading(true)
        fetchOptionsList();
    }, []);

    const fetchOptionsList = async () => {
        const { data } = await axios.get('https://morning-garden-20509.herokuapp.com/api/yasel/options')
        setDataSourceLoading(false)
        setItems(data)
    }

    const renderCustomIcon = useMemo(() => {
        console.log('loadmı', dataSourceLoading)
        if (dataSourceLoading) {
            return <ActivityIndicator size="small" color={colors.primary} />
        }
        return <CircleColor color='red' size={20} />
    }, [dataSourceLoading])



    return (
        <RNPickerSelect
            disabled={dataSourceLoading}
            onValueChange={(value) => { setSelectedItem(value) }}
            value={defaultValue}
            placeholder={placeholder}
            Icon={() => renderCustomIcon}
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