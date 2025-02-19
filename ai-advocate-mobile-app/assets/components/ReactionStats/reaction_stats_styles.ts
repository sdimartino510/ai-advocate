import { StyleSheet } from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    reactionStatsContainer:{
        position: "absolute",
        zIndex: 1,
        bottom: 24,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        
        width: 156, // 2*(stats width) + 2*(container padding) + container's gap = 2 * 64 + 2 * 10 + 8  = 156
        height: 132, // 3*(stats height) + 2*(container padding) + 2*(container's gap) = 3 * 32 + 2 * 10 + 2 * 8 = 132
        padding: 10,
        borderRadius: 7,
        backgroundColor: globalStyles.colors.lightBlue,
    },
    reactionStatsPairWrapper: {
        justifyContent: "center",
        width: 64,
        height: 32,
        paddingHorizontal: 4,

        borderRadius: 9,
        backgroundColor: globalStyles.colors.blue2,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',  // #00000040
    },
    reactionStatsText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
        color: globalStyles.colors.grey,
    },
})

export default styles