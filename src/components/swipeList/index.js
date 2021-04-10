import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';

import { colors } from '../../theme';
const swipeListConsts = {
    rightOpenValue: -90,
    previewOpenValue: 20,
    previewOpenDelay: 100
}
const swipeListDefaultStyle = {
    flex: 1,
    backgroundColor: colors.pageBg, overflow: 'hidden'
}

//diğer listelerle aynı mantık olabilir 
const SwipeList = ({ data, renderItem, renderHiddenItem, onRowDidOpen, consts = swipeListConsts, defaultStyle = swipeListDefaultStyle, ...props }) => {
    return (
        <SwipeListView
            {...props}
            data={data}
            style={defaultStyle}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={consts.rightOpenValue}
            disableRightSwipe
            previewRowKey={'0'}
            previewOpenValue={consts.rightOpenValue}
            previewOpenDelay={consts.previewOpenDelay}
            onRowDidOpen={onRowDidOpen}
            useNativeDriver={true}
        />
    )
}
export default SwipeList