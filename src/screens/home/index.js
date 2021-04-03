import React, { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { colors, space, sizes, position, radius } from '../../theme';
import { Plus } from '../../components/icons'
import { Box, Text, Fab, BackgroundImage, FocusStatusBar } from '../../components'
import Consts from '../../consts'
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



  useEffect(() => {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0, 0)
    const day = dateDiff(today);
    setTotalDay(day)
  }, [])
  return (
    <>
      <SafeAreaView style={{ backgroundColor: colors.pageBg, flex: 1, position: 'relative' }}>
        <FocusStatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <Fab as={Animated.View} alignItems='center' justifyContent='center' size={sizes.size50} borderRadius={radius.full} bg={colors.fab} position='absolute' bottom={fabAnimation} right={position.right10} >
          <Plus />
        </Fab>

        <Box bg={colors.primary} p={space.p20} width={sizes.fullWidth} height={sizes.height350} borderBottomLeftRadius={radius.mid}  >
          <Box flex={1} >
            <BackgroundImage radius={radius.small} image={require('../../images/background.jpg')} />
          </Box>
          <Box p={space.p10} width={sizes.fullWidth} alignItems='flex-end'>
            <Text color={colors.white} fontFamily='BadScript-Regular' letterSpacing={1} fontSize={[15]} >
              {Consts.homePageText}
            </Text>
            <Text color={colors.white} letterSpacing={1} fontFamily='BadScript-Regular' fontSize={[20]}>
              # {totalDay}
            </Text>
          </Box>
        </Box>
        <Box flex={1} p={space.p20}>
          <Text>
            Buraya Liste Gelecek
          </Text>
        </Box>


      </SafeAreaView>
    </>
  );
};
export default Home;
