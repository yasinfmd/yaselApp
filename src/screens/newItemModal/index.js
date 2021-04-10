import React, { useState } from 'react'

import { Input, Box, Picker, CustomSafeAreaView } from '../../components'
import { colors, space, radius, font, sizes, border } from '../../theme'
const ModalScreen = ({ navigation, children }) => {
    const [dynamicHeight, setDynamicHeight] = useState(sizes.height56)
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <Box p={space.p20} bg={colors.pageBg}>
                <Input showSoftInputOnFocus={true} multiline={true} returnKeyType='done'
                    onSubmitEditing={(e) => {
                        console.log('bbbb', e.nativeEvent.key)
                    }}
                    onContentSizeChange={(e) => {
                        e.nativeEvent.contentSize.height > sizes.height56 ? setDynamicHeight(e.nativeEvent.contentSize.height) : sizes.height56
                    }} blurOnSubmit={true} autoFocus={true} mb={space.mb20} bg={colors.white} width='100%' borderRadius={radius.bsmall} fontSize={font.size14} maxHeight={200} height={dynamicHeight}
                    borderColor={colors.borderColor}
                    pl={space.pl16} py={space.pv17} border={border.xsmall} color={colors.inputText} />
                <Picker dataSourceUrl='/options' defaultVal={null} customCircle selectedValue={(val) => {
                    console.log('pickerdan', val)
                }} />
            </Box>
        </CustomSafeAreaView>
    );
}
export default ModalScreen;