import React, { useEffect } from 'react'
import { Input, Box, Picker, FocusStatusBar, CustomSafeAreaView } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space, radius, font, sizes, border } from '../../theme'
const ModalScreen = ({ navigation, children }) => {

    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <Box p={space.p20} bg={colors.pageBg}>
                <Input autoFocus={true} mb={space.mb20} bg={colors.white} width='100%' borderRadius={radius.bsmall} fontSize={font.size14} height={sizes.height56}
                    borderColor={colors.borderColor}
                    pl={space.pl16} py={space.pv17} border={border.xsmall} color={colors.inputText} />
                <Picker dataSourceUrl='' defaultVal={null} customCircle selectedValue={(val) => {
                    console.log('pickerdan', val)
                }} />
            </Box>
        </CustomSafeAreaView>
    );
}
export default ModalScreen;