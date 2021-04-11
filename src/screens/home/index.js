import React, { useRef, useEffect, useState } from 'react';
//animation
import {
  Animated, ScrollView,
} from 'react-native';

//theme
import { colors, space, sizes, position, radius } from '../../theme';

//icons
import { Plus } from '../../components/icons'
//components
import { Box, Fab, Card, Button, CardText, SwipeList, Modal, SummaryItem, PageImageBox, ListHiddenItem, CustomSafeAreaView } from '../../components'
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
    title: '1 asdas das das das d',
  },
  {
    key: '3ac68afc-c605-48d3-a4f8-fb42d91aa97f63',
    title: '2',
  },
  {
    key: '58694a0f-3da1-471f-bd96-14235571e29d72',
    title: '3',
  },
  {
    key: '58694a0f-3da1-471f-bd96-14115571e29d72',
    title: '4',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1435571e29d72',
    title: '5',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1425571e29d72',
    title: '6',
  },
  {
    key: '58694a0f-3da1-471f-bd96-1415571e29d72',
    title: 'Third Item Selamlar Kardeşlerim Nasılsınız İyimisiniz',
  },
];

import axios from 'axios'
const Home = ({ navigation }) => {
  const [rowTranslateAnimatedValues, setRowAnimation] = useState({})
  const [todoListLoading, setTodoListLoading] = useState(false)
  const [data, setData] = useState(DATA)
  const [modalVisible, setModalVisible] = useState(false)
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
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };
  const deleteRow = (rowMap, rowKey) => {
    // const newData = [...DATA];
    const newData = data.filter(item => item.key !== rowKey);
    //newData.splice(prevIndex, 1);
    setData(newData);
    closeRow(rowMap, rowKey);

  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <>
      <ListHiddenItem closeRow={() => {
        closeRow(rowMap, data.item.key)
      }} deleteRow={() => {
        deleteRow(rowMap, data.item.key)
      }} />
    </>
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

        <Card direction='row'>

          <Button

            onPressOut={() => {
              setModalVisible(false)
            }}
            onLongPress={() => {
              setModalVisible(true)
              console.log('uzun bastın')
            }}>
            <CardText
              string={data.item.title.length > Consts.ellipsisLength ? `#${data.index + 1} ` + data.item.title.substring(0, Consts.ellipsisLength) + ` ...` : data.item.title}
            />
          </Button>

          <CheckBox
            tintColors={{ true: colors.primary, false: colors.pageBg }}
            hideBox
            style={{ marginRight: 16 }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          />
        </Card>
      </Animated.View>

    </>
  );
  return (
    <>
      <CustomSafeAreaView backgroundColor={colors.pageBg} barStyle='light-content' statusBarColor={colors.primary}>

        <Button zIndex={position.zIndexFull} size={sizes.size50} borderRadius={radius.full} onPress={() => navigation.navigate('newItemModal')} position='absolute' bottom={position.bottom10} right={position.right10}>
          <Fab style={Consts.defaultShadow} as={Animated.View} alignItems='center' justifyContent='center' size={sizes.size50} borderRadius={radius.full} bg={colors.fab} position='absolute' bottom={fabAnimation} right={position.right10} >
            <Plus />
          </Fab>
        </Button>
        <Modal visible={modalVisible} />
        <PageImageBox image={require('../../images/wallpaper.jpeg')} mainText={Consts.homePageText} subText={`# ${totalDay}`} />
        <Box flex={1} p={space.p20}>
          <SummaryItem />
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {todoListLoading === true && <SwipeList
              data={data}
              style={{
                flex: 1,
                backgroundColor: colors.pageBg, overflow: 'hidden'
              }}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-90}
              disableRightSwipe
              previewRowKey={'0'}
              previewOpenValue={20}
              previewOpenDelay={100}
              onRowDidOpen={onRowDidOpen}
              useNativeDriver={true}
            />}
          </ScrollView>
        </Box>
      </CustomSafeAreaView>
    </>
  );
};
export default Home;
