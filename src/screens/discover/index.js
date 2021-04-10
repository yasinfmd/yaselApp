import React from 'react';
import { Button } from 'react-native';

import { Box, BoxCenter, CustomSafeAreaView } from '../../components'
import { colors } from '../../theme'
const Discover = ({ navigation }) => {
    return (
        <CustomSafeAreaView barStyle='dark-content' statusBarColor={colors.pageBg} backgroundColor={colors.pageBg}>
            <BoxCenter>
                <Button
                    title="Seni Seviyorum 1"
                    onPress={() => navigation.navigate('Detail')}
                />
            </BoxCenter>
        </CustomSafeAreaView>
    );
};
export default Discover;
