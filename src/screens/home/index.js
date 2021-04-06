import React, { useRef, useEffect, useState } from 'react';
//animation
import {
  Animated, ScrollView,
  Dimensions,
} from 'react-native';
//safearea
import SafeAreaView from 'react-native-safe-area-view';

//theme
import { colors, space, sizes, position, radius } from '../../theme';

//icons
import { Plus } from '../../components/icons'
//components
import { Box, Text, Fab, BackgroundImage, FocusStatusBar, Card, Button, CardText, Title } from '../../components'
import { SwipeListView } from 'react-native-swipe-list-view';
import CheckBox from '@react-native-community/checkbox';


//consts
import Consts from '../../consts'

//helpers
import { dateDiff } from '../../helpers/utils'



//state
import useMainState from '../../context/Main/useMainState';


const DATA = [
  {
    key: 'bd7acbea-c1b1-46c2-aed5-3431ad53abb28ba',
    title: 'First Item',
  },
  {
    key: '3ac68afc-c605-48d3-a4f8-fb42d91aa97f63',
    title: 'Second Item',
  },
  {
    key: '58694a0f-3da1-471f-bd96-14235571e29d72',
    title: 'Third Item',
  },
  {
    key: '58694a0f-3da1-471f-bd96-14115571e29d72',
    title: 'Third Item',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1435571e29d72',
    title: 'Third Item',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1425571e29d72',
    title: 'Third Item aaaa',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1415571e29d72',
    title: 'Third Item Selamlar Kardeşlerim Nasılsınız İyimisiniz',
  },
];
const Home = ({ navigation }) => {
  const [rowTranslateAnimatedValues, setRowAnimation] = useState({})
  const [todoListLoading, setTodoListLoading] = useState(false)
  const [animationRunning, setAnimationRunnig] = useState(false)
  const [data, setData] = useState(DATA)
  useEffect(() => {
    setRowAnimationObject()
    setTimeout(() => {
      setTodoListLoading(true)
    }, 500)
  }, [])
  const setRowAnimationObject = () => {
    const obj = {}
    DATA.forEach((item) => {
      obj[`${item.key}`] = new Animated.Value(1);
    })
    // Array(20)
    //   .fill('')
    //   .forEach((_, i) => {

    //   });

    setRowAnimation(obj)
  }
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
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
  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    console.log('swipeData', swipeData)
    if (
      value < -Dimensions.get('window').width &&
      animationRunning === false
      // !this.animationIsRunning
    ) {
      setAnimationRunnig(true)
      //this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: -10,
        duration: 50,
      }).start(() => {
        const newData = [...data];
        const prevIndex = data.findIndex(item => item.key === key);
        newData.splice(prevIndex, 1);
        setData(newData);
        setAnimationRunnig(false)
        //this.animationIsRunning = false;
      });
    }
  };

  /*
  
      string={`#${index + 1}  Her Gün Daha Çok Sevilecek :)`.length > 45 ? `#${index + 1}  Her Gün Daha Çok Sevilecek :)`.substring(0, Consts.ellipsisLength) + '..' : `#${index + 1}  Her Gün Daha Çok Sevilecek :)`}
      */


  const renderHiddenItem = () => (
    <Box borderRadius={20} alignItems='center' height={56} width='100%' bg='red' flexDirection='row' justifyContent='space-between'>
      <Box height={56} alignItems='center' justifyContent='center' width='100' borderRadius={20} position='absolute' bottom={0} top={0} right={0} >
        <Text color='#fff'>Sil</Text>
      </Box>
    </Box>
  );
  /* { item, index } */
  const renderItem = (data) => (
    <>
      <Animated.View
        style={[
          {
            marginBottom: (DATA.length - 1) === data.index ? 56 : 20,
            height: rowTranslateAnimatedValues[
              data.item.key
            ].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 56],
            }),
          },
        ]}
      >

        <Card direction='row'   >
          <CardText
            string={data.item.title.length > Consts.ellipsisLength ? `#${data.index + 1} ` + data.item.title.substring(0, Consts.ellipsisLength) + ` ...` : data.item.title}
          />
          <CheckBox
            tintColors={{ true: colors.primary, false: colors.pageBg }}
            hideBox
            style={{ marginRight: 16 }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </Card>

        {/* <View>
            {console.log('data', data)}
            <Text>I am {data.item.title} in a SwipeListView</Text>
          </View> */}
      </Animated.View>


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
            {todoListLoading === true && <SwipeListView
              disableRightSwipe
              data={data}
              style={{
                lex: 1,
                backgroundColor: colors.pageBg, overflow: 'hidden'
              }}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={true}
            />}


            {/* <FlatList
              style={{ flex: 1, backgroundColor: colors.pageBg, overflow: 'hidden' }}
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            /> */}
          </ScrollView>


        </Box>


      </SafeAreaView>
    </>
  );
};
export default Home;
