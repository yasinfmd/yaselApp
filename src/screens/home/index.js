import React, { useRef, useEffect, useState } from 'react';
//animation
import { Animated, FlatList, ScrollView } from 'react-native';
//safearea
import SafeAreaView from 'react-native-safe-area-view';

//theme
import { colors, space, sizes, position, radius } from '../../theme';

//icons
import { Plus } from '../../components/icons'
//components
import { Box, Text, Fab, BackgroundImage, FocusStatusBar, Card, Button, CardText, Title } from '../../components'

//consts
import Consts from '../../consts'

//helpers
import { dateDiff } from '../../helpers/utils'

const Home = ({ navigation }) => {
  const fabAnimation = useRef(new Animated.Value(-500)).current;
  const [totalDay, setTotalDay] = useState(0)
  useEffect(() => {
    Animated.timing(fabAnimation, {
      toValue: position.bottom10,
      duration: 2200
    }).start()
  }, [fabAnimation])

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  useEffect(() => {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0)
    const day = dateDiff(today);
    setTotalDay(day)
  }, [])

  const renderItem = ({ item, index }) => (
    <>
      <Card >
        <CardText string={`#${index + 1} Her Gün Daha Çok Sevilecek  ❤️`} />
      </Card>
    </>
  );
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.pageBg, flex: 1, position: 'relative' }}>
        <FocusStatusBar barStyle="light-content" backgroundColor={colors.primary} />

        <Button zIndex={position.zIndexFull} size={sizes.size50} borderRadius={radius.full} onPress={() => navigation.navigate('newItemModal')} position='absolute' bottom={position.bottom10} right={position.right10}>
          <Fab style={Consts.defaultShadow} as={Animated.View} alignItems='center' justifyContent='center' size={sizes.size50} borderRadius={radius.full} bg={colors.fab} position='absolute' bottom={fabAnimation} right={position.right10} >
            <Plus />
          </Fab>
        </Button>


        <Box bg={colors.primary} p={space.p20} width={sizes.fullWidth} height={sizes.height350} borderBottomLeftRadius={radius.mid}  >
          <Box flex={1} >
            <BackgroundImage radius={radius.small} image={require('../../images/background.jpg')} />
          </Box>
          <Box p={space.p10} width={sizes.fullWidth} alignItems='flex-end'>
            <Text color={colors.white} fontFamily='BadScript-Regular' letterSpacing={1} fontSize={[16]} >
              {Consts.homePageText}
            </Text>
            <Text color={colors.white} letterSpacing={1} fontFamily='BadScript-Regular' fontSize={[20]}>
              # {totalDay}
            </Text>
          </Box>
        </Box>
        <Box flex={1} p={space.p20}>
          <Box justifyContent='center' mb={20}>
            <Title title={Consts.todoListText} />
          </Box>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              style={{ flex: 1, backgroundColor: colors.pageBg, overflow: 'hidden' }}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </ScrollView>


        </Box>


      </SafeAreaView>
    </>
  );
};
export default Home;
