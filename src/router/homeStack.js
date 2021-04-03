import { createStackNavigator } from '@react-navigation/stack';

//pages
import Home from '../screens/home'
function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Şimdi Geri Dön </Text>
        </View>
    );
}

const HomeStack = createStackNavigator();
export const HomeStackRouter = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name='Seni Seviyorum Yavru 👅' component={Home} />
            <HomeStack.Screen name='Detail' component={DetailsScreen} />
        </HomeStack.Navigator>
    )
}