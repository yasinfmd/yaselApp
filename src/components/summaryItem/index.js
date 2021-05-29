import React from 'react'

//components
import { Box, Button, Text, Title } from '../../components'

//consts
import Consts from '../../consts'

const SummaryItem = ({ totalCount }) => {
    return (
        <>
            <Box justifyContent='center' mb={20}>
                <Title title={Consts.todoListText} />
            </Box>
            <Box justifyContent='center' alignItems='flex-end' mb={20}>
                <Button >
                    <Text letterSpacing={1} fontSize={[12]}>
                        Toplam Görev Sayısı : {totalCount}
                    </Text>
                </Button>
            </Box>
        </>

    )
}
export default React.memo(SummaryItem)