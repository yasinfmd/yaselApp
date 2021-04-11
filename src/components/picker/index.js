import React, { useState, useEffect, useMemo } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

//components
import RNPickerSelect from 'react-native-picker-select';
import { CircleColor, Button } from '../../components'
//consts
import Consts from '../../consts'

//colors
import { colors, sizes, position } from '../../theme';

//packages
import NetInfo from "@react-native-community/netinfo";
//service
import { FetchAllOptions } from '../../service/options'
//context
import { useOptionsState, useOptionsActions } from '../../context/Options/store'
const Picker = ({ placeholder = {}, defaultVal = {}, customCircle, selectedValue, dataSourceUrl }) => {
    const { optionsList } = useOptionsState();
    const { setOptions } = useOptionsActions();
    const [isOffline, setOfflineStatus] = useState(false);
    const [defaultValue, setDefaultValue] = useState(defaultVal);
    const [dataSourceLoading, setDataSourceLoading] = useState(false);
    const [selectedCircleColor, setSelectedCirclerColor] = useState('#fff')
    // const [items, setItems] = useState([]);
    const setSelectedItem = (value) => {
        console.log('eleman değişti')
        if (customCircle) {
            const isExist = findItem(value)
            if (isExist) {
                setSelectedCirclerColor(isExist.customColor)
            }
        }
        setDefaultValue(value)
        //setSelectedValue(value);
        // setSelectedValue(value);
    };
    //find Object
    const findItem = (value) => {
        if (optionsList.length > 0) {
            const finded = optionsList.find((item) => item.value === value)
            return finded;
        }
        return null
    }
    //selectedValue
    useEffect(() => {
        if (defaultValue) {
            if (optionsList.length > 0) {
                setSelectedValue(defaultValue);
            }
        }
    }, [defaultValue, optionsList])
    //selectedValue
    const setSelectedValue = (value) => {
        const isExist = findItem(value)
        if (isExist) {
            selectedValue(isExist)
        }
    }

    //net connection
    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            setOfflineStatus(offline);
        });
        return () => removeNetInfoSubscription();
    }, []);
    //request 
    useEffect(() => {
        if (isOffline === false) {
            fetchOptionsList();
        }
    }, [isOffline])
    //request
    const fetchOptionsList = async () => {
        setDataSourceLoading(true)
        try {
            if (optionsList.length === 0) {
                const result = await FetchAllOptions(dataSourceUrl)
                if (result.isSuccess === true) {
                    setOptions(result.result)
                    //setDefaultValue(result.result[0].value)

                    //setSelectedItem(result.result[0].value)
                    //setItems(result.result)
                }
            } else {
                setSelectedItem(optionsList[0].value)
            }
        } catch (error) {
            //Errors
        } finally {
            setDataSourceLoading(false)
        }
    }

    //loadingIcon
    const renderCustomIcon = useMemo(() => {
        if (dataSourceLoading) {
            return <ActivityIndicator size="small" color={colors.primary} />
        }
        return <CircleColor color={selectedCircleColor} size={sizes.size20} />
    }, [dataSourceLoading, selectedCircleColor, customCircle])



    return (
        <RNPickerSelect
            fixAndroidTouchableBug={true}
            disabled={dataSourceLoading}
            onValueChange={(value, label) => { setSelectedItem(value, label) }}
            value={defaultValue}
            onOpen={() => {
                console.log('asdasdasd')
            }}
            placeholder={placeholder}
            Icon={() => customCircle ? renderCustomIcon : null}
            useNativeAndroidPickerStyle={false}
            style={{
                ...pickerSelectStyles, iconContainer: {
                    top: position.top20,
                    right: position.right16,
                }
            }}
            items={optionsList}
        />
    )
}
const pickerSelectStyles = StyleSheet.create(Consts.defaultPickerStyle);

export default Picker