import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
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
    emoji: {
        fontSize: 17,
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
    shadedBookmark: {
        position: 'absolute',
        zIndex: 1,
        top: 2.5,
        left: 3,
    },
})

export default styles