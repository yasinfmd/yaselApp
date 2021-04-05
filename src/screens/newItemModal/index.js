import React, { useEffect } from 'react'
import { Input, Box, Picker, FocusStatusBar } from '../../components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, space, radius, font, sizes, border } from '../../theme'
const ModalScreen = ({ navigation, children }) => {

    return (
        <SafeAreaView style={{ backgroundColor: colors.pageBg, flex: 1, position: 'relative' }}>
            <FocusStatusBar barStyle="dark-content" backgroundColor={colors.pageBg} />
            <Box p={space.p20} bg={colors.pageBg}>
                <Input mb={space.mb20} bg={colors.white} width='100%' borderRadius={radius.bsmall} fontSize={font.size14} height={sizes.height56}
                    borderColor={colors.borderColor}
                    pl={space.pl16} py={space.pv17} border={border.xsmall} color={colors.inputText} />
                <Picker dataSourceUrl='' items={[
                    { label: 'Football', value: 'football', color: null },
                    { label: 'Önemli', value: 'orange', color: null, },
                    { label: 'Football', value: 'football', color: null },
                    { label: 'Baseball', value: 'baseball', color: null },
                    { label: 'Hockey', value: 'hockey', color: null },
                ]} />
            </Box>
        </SafeAreaView>
    );
}
export default ModalScreen;