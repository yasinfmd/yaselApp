import React from 'react'

//safearea
import SafeAreaView from 'react-native-safe-area-view';

//components
import { FocusStatusBar } from '../../components'
const CustomSafeAreaView = ({ barStyle, backgroundColor, statusBarColor, children, ...props }) => {
    return (
        <SafeAreaView {...props} style={{ backgroundColor: backgroundColor, flex: 1, position: 'relative' }}>
            <FocusStatusBar barStyle={barStyle} backgroundColor={statusBarColor} />
            {children}
        </SafeAreaView>

    )
}
export default React.memo(CustomSafeAreaView)