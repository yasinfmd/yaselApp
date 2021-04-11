import { colors, sizes, space, radius, font, border } from '../theme'
const Consts = {
    homePageText: 'Gece Ayın ve Yıldızların Parladıgı Gün',
    todoListText: 'Yapılacaklar Listesi',
    newTodoTitle: 'Yapılacak İş',
    newTodoPlaceholder: 'Yapılacak İşler Buraya Girilmelidir😊',
    newTodoPriortyTitle: 'Öncelik',
    defaultShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 3.84,
        elevation: 10
    },
    ellipsisLength: 42,
    defaultPickerStyle: {
        inputIOS: {
            backgroundColor: colors.white,
            height: sizes.height56,
            fontSize: font.size14,
            paddingVertical: space.pv17,
            paddingHorizontal: space.pl16,
            borderWidth: border.xsmallWidth,
            borderColor: colors.borderColor,
            borderRadius: radius.bsmall,
            color: colors.inputText,
            paddingRight: 30, // to ensure the text is never behind the icon
        },
        inputAndroid: {
            borderWidth: border.xsmallWidth,
            backgroundColor: colors.white,
            height: sizes.height56,
            fontSize: font.size14,
            paddingVertical: space.pv17,
            paddingHorizontal: space.pl16,
            borderColor: colors.borderColor,
            borderRadius: radius.bsmall,
            color: colors.inputText,
            paddingRight: 30, // to ensure the text is never behind the icon
        },
    }
}


export default Consts;