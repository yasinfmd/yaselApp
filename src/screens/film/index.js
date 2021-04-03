import React from 'react';
import { Button, StatusBar } from 'react-native';
import Box from '../../components/box';
import { SafeAreaView } from 'react-native-safe-area-context';
import BoxCenter from '../../components/box-center';
import { colors } from '../../theme'
const Film = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: colors.pageBg, flex: 1, position: 'relative' }}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.pageBg} />
            <BoxCenter>
                <Button
                    title="Seni Seviyorum 2"
                    onPress={() => navigation.navigate('Detail')}
                />
            </BoxCenter>
        </SafeAreaView>
    );
};
export default Film;
