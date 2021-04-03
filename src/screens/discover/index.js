import React from 'react';
import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, BoxCenter, FocusStatusBar } from '../../components'
import { colors } from '../../theme'
const Discover = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: colors.pageBg, flex: 1, position: 'relative' }}>
            <FocusStatusBar barStyle="dark-content" backgroundColor={colors.pageBg} />

            <BoxCenter>
                <Button
                    title="Seni Seviyorum 1"
                    onPress={() => navigation.navigate('Detail')}
                />
            </BoxCenter>
        </SafeAreaView>
    );
};
export default Discover;
