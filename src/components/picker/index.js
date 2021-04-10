import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { CircleColor } from '../../components'
import Consts from '../../consts'
import axios from 'axios'
import { colors, sizes, position } from '../../theme';
import NetInfo from "@react-native-community/netinfo";

import { API_URL } from "@env"

const Picker = ({ placeholder = {}, defaultVal = {}, customCircle, selectedValue, dataSourceUrl }) => {
    const [isOffline, setOfflineStatus] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultVal);
    const [dataSourceLoading, setDataSourceLoading] = useState(false);
    const [selectedCircleColor, setSelectedCirclerColor] = useState('#fff')
    const [items, setItems] = useState([]);
    const setSelectedItem = (value) => {
        if (customCircle) {
            const isExist = findItem(value)
            if (isExist) {
                setSelectedCirclerColor(isExist.customColor)
            }
        }
        setDefaultValue(value)
        // setSelectedValue(value);
    };

    const findItem = (value) => {
        const finded = items.find((item) => item.value === value)
        return finded;
    }
    useEffect(() => {
        if (defaultValue) {
            setSelectedValue(defaultValue);
        }
    }, [defaultValue])
    const setSelectedValue = useCallback((value) => {
        const isExist = findItem(value)
        if (isExist) {
            selectedValue(isExist)
        }
    }, [])

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });
        return () => removeNetInfoSubscription();
    }, []);

    useEffect(() => {
        if (isOffline === false) {
            fetchOptionsList();
        }
    }, [isOffline])

    const fetchOptionsList = async () => {
        setDataSourceLoading(true)
        try {
            const { data } = await axios.get('https://morning-garden-20509.herokuapp.com/api/yasel/options')
            setItems(data)

        } catch (error) {
            //Errors
        } finally {
            setDataSourceLoading(false)
        }
    }

    const renderCustomIcon = useMemo(() => {
        if (dataSourceLoading) {
            return <ActivityIndicator size="small" color={colors.primary} />
        }
        return <CircleColor color={selectedCircleColor} size={sizes.size20} />
    }, [dataSourceLoading, selectedCircleColor, customCircle])



    return (
        <RNPickerSelect
            disabled={dataSourceLoading}
            onValueChange={(value, label) => { setSelectedItem(value, label) }}
            value={defaultValue}
            placeholder={placeholder}
            Icon={() => customCircle ? renderCustomIcon : null}
            useNativeAndroidPickerStyle={false}
            style={{
                ...pickerSelectStyles, iconContainer: {
                    top: position.top20,
                    right: position.right16,
                }
            }}
            items={items}
        />
    )
}
const pickerSelectStyles = StyleSheet.create(Consts.defaultPickerStyle);

export default Picker