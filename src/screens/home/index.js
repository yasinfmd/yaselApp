import React, { useRef, useEffect, useState } from 'react';
//animation
import {
  Animated, ScrollView
} from 'react-native';

//theme
import { colors, space, sizes, position, radius } from '../../theme';



//icons
import { Plus, Cancel, Delete } from '../../components/icons'
//components
import { FilterColorItem, Box, Fab, Card, Button, CardText, SwipeList, Text, Modal, SkeletonCard, SummaryItem, PageImageBox, ListHiddenItem, CustomSafeAreaView } from '../../components'
import CheckBox from '@react-native-community/checkbox';

//consts
import Consts from '../../consts'

//helpers
import { dateDiff } from '../../helpers/utils'

import NetInfo from "@react-native-community/netinfo";


import { useIsFocused } from '@react-navigation/native';



import { useMainState, useMainActions } from '../../context/Main/store'

import { FetchAllOptions } from '../../service/options'


import { fetchAllTodo, updateTodo, deleteTodo } from '../../service/home'
const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [modalSubText, setModalSubText] = useState("")

  const [modalVisible, setModalVisible] = useState(false)
  const { generalList } = useMainState()
  const { setGeneralList } = useMainActions()
  const [isOffline, setOfflineStatus] = useState(false);

  const [optionsList, setOptionsList] = useState([])
  useEffect(() => {
    setIsLoading(true)
    fetchGeneralList('All')
  }, [isOffline])

  useEffect(() => {
    if (isOffline === false) {
      fetchOptionsList();
    }
  }, [isOffline])

  const fetchOptionsList = async () => {
    try {
      const result = await FetchAllOptions("options")
      if (result.isSuccess === true) {
        result?.result?.unshift({
          customColor: "#8c8c8c",
          value: 0,
          label: "All"
        })
        setOptionsList(result.result)
      }
    } catch (error) {
      //Errors
    } finally {
    }
  }

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  const fetchGeneralList = async (query) => {
    try {
      const result = await fetchAllTodo(`all?getBy=${query}`)
      if (result.isSuccess && !result.error) {
        const data = result.result;
        data.length > 0 && setGeneralList(data)
      }
    } catch (error) {

    }
    finally {
      setIsLoading(false)
    }
  }


  const fabAnimation = useRef(new Animated.Value(-500)).current;
  const [totalDay, setTotalDay] = useState("")
  useEffect(() => {
    Animated.timing(fabAnimation, {
      toValue: position.bottom10,
      duration: 2200,
      useNativeDriver: false
    }).start()

  }, [fabAnimation])
  useEffect(() => {
    setTotalDay(dateDiff())
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalDay(dateDiff())

    }, 1000 * 60);
    return () => clearInterval(intervalId)
  }, [])
  const onRowDidOpen = rowKey => {
    console.log('This row opened', rowKey);
  };

  const deleteRow = async (rowMap, rowKey) => {
    try {
      const result = await deleteTodo(`deleteTodo?todoId=${rowKey}`, {})
      if (result.isSuccess) {
        const newData = generalList.filter((item) => item.id != rowKey)
        setGeneralList(newData)
      }
    } catch (error) {
      console.log('error', error)
    }
    closeRow(rowMap, rowKey);
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const onFilterList = ({ value, label }) => {
    setIsLoading(true)
    fetchGeneralList(value === 0 ? label : value)
  }

  const updateStatus = async (data, val) => {
    try {
      const result = await updateTodo(`updateTodo?todoId=${data.item.id}`, {})
      if (result.isSuccess) {
        const newList = [...generalList]
        newList.forEach((item) => {
          if (item.id === data.item.id) {
            item.active = false
          }
        })
        setGeneralList(newList)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const renderHiddenItem = (data, rowMap) => {

    return (
      <>
        <ListHiddenItem deleteRow={() => {
          deleteRow(rowMap, data.item.id)
        }} closeRow={() => {
          closeRow(rowMap, data.item.id)
        }} />
      </>
    );
  }
  /* { item, index } */
  const renderItem = (data) => (
    <>
      <Animated.View
        key={data.index}
        style={[
          {
            marginBottom: (generalList.length - 1) === data.index ? 56 : 20,
            height: 56
            ,
          },
        ]}
      >

        <Card borderless borderlessColor={data.item.options.customColor} direction='row'>
          <Button

            onPressOut={() => {
              setModalVisible(false)
            }}
            onLongPress={() => {
              setModalSubText(data.item.name)
              setModalVisible(true)
            }}>
            <CardText
              string={data.item.name.length > Consts.ellipsisLength ? `#${data.index + 1} ` + data.item.name.substring(0, Consts.ellipsisLength) + ` ...` : data.item.name}
            />
          </Button>

          <CheckBox
            tintColors={{ true: colors.primary, false: colors.pageBg }}
            hideBox
            style={{ marginRight: 16 }}
            disabled={!data.item.active}
            value={!data.item.active}
            onValueChange={(newValue) => { updateStatus(data, newValue) }}
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

        {(modalVisible && modalSubText !== "") && <Modal visible={modalVisible} subText={modalSubText} />}
        <PageImageBox image={require('../../images/wallpaper.jpeg')} mainText={Consts.homePageText} subText={`# ${totalDay}`} />

        <Box flex={1} p={space.p20}>

          <SummaryItem totalCount={isLoading === true ? "Henüz Bilinmiyor" : generalList.length} />
          <Box marginBottom={space.mb20} flexDirection="row" alignItems="center" justifyContent="space-evenly">
            {optionsList?.length > 0 && optionsList.map((opt) => {
              return (
                <FilterColorItem onClickFilterItem={() => {
                  onFilterList(opt)

                }} backgroundColor={opt.customColor} />
              )
            })}
          </Box>

          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {isLoading === true && [1, 2, 3].map((item) => {
              return (
                <SkeletonCard height={56} radius={8} />
              )
            })}
            {(isLoading === false && generalList.length > 0) &&
              <SwipeList
                data={generalList}
                style={{
                  flex: 1,
                  backgroundColor: colors.pageBg, overflow: 'hidden'
                }}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                disableRightSwipe
                onRowDidOpen={onRowDidOpen}
                useNativeDriver={true}
              />
            }
          </ScrollView>
        </Box>
      </CustomSafeAreaView>
    </>
  );
};
export default Home
