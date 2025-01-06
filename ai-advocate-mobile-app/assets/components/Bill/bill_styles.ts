import {StyleSheet} from 'react-native'
import globalStyles from '../../styles/global_styles'

const styles = StyleSheet.create({
    billContainer: {
        alignItems: 'flex-start',

        margin: 16,
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: globalStyles.colors.lightGrey,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',  // #00000040

        backgroundColor: globalStyles.colors.white,
    },
    title: {
        paddingBottom: 12,

        fontFamily: 'Montserrat_400Regular',
        fontSize: 20,
        lineHeight: 24.38,
        color: globalStyles.colors.black,
    },
    IDStatusContainer: {
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    billID: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        lineHeight: 19.5,
        color: globalStyles.colors.black,
    },
    status: {
        paddingVertical: 3,
        paddingHorizontal: 16,
        borderRadius: 9,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',  // #00000040

        fontFamily: 'Montserrat_700Bold',
        fontSize: 12,
        lineHeight: 15,
        color: globalStyles.colors.black,
    },
    description: {
        paddingBottom: 12,

        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        lineHeight: 17.07,
        color: globalStyles.colors.black,
    },
    topicContainer:{
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topicLabel: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        lineHeight: 17.07,
        color: globalStyles.colors.black,
    },
    topics: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        lineHeight: 17.07,
    },
    interactionContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    interactionPairWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    interactionValues: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
        lineHeight: 19,
        color: globalStyles.colors.grey,
    },
})

export default styles