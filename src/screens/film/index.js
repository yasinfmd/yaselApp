import React from 'react';
import { View, Text, Button } from 'react-native';
import Box from '../../components/box';
import { SafeAreaView } from 'react-native-safe-area-context';
import BoxCenter from '../../components/box-center';
const Film = ({ navigation }) => {
    return (
        <BoxCenter>
            <Button
                title="Seni Seviyorum 2"
                onPress={() => navigation.navigate('Detail')}
            />
        </BoxCenter>
    );
};
export default Film;
