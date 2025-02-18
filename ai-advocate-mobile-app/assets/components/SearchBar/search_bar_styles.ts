import {StyleSheet} from 'react-native'
import globalStyles from '@/assets/global_styles'

const styles = StyleSheet.create({
    searchBar:{
        width: "75%",
    },
    searchBarInput: {
        padding: 8,
        paddingLeft: 32,
        fontSize: 17,
        lineHeight: 22,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",

        fontFamily: "Montserrat_400Regular",
        backgroundColor: globalStyles.colors.searchBarGrey,
        color: globalStyles.colors.searchBarText,
    },
})

export default styles