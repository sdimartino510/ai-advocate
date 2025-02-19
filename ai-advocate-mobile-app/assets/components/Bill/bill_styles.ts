import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    billContainer: {
        alignItems: 'flex-start',

        margin: 16,
        marginBottom: 24,
        marginTop: 0,
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
    engagementContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    engagementPairWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    engagementValues: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
        lineHeight: 19,
        color: globalStyles.colors.grey,
    },
    leftEngagements: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    topicDefinitionWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 16,
        padding: 4,
        width: 100,      // TODO: Make width responsive but not dependent on topic text width.

        borderWidth: 1,
        borderRadius: 7,
        borderColor: globalStyles.colors.lightGrey,
        backgroundColor: globalStyles.colors.white,
    },
    topicDefinition: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 8,
        lineHeight: 12,
        color: globalStyles.colors.black,
    },
    shadedBookmark: {
        position: 'absolute',
        zIndex: 1,
        top: 2.5,
        left: 3,
    },
    reactionsButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 2,  // Shifts the smiley face to the right to look more centered
        height: 24,
        width: 24,
    },
    reactionStatsBase: {
        position: "absolute",
        top: 24,
        zIndex: 1,
    },
    emoji: {
        fontSize: 17,
    }
})

export default styles