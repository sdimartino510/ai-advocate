import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    reactionsContainer: {
        position: "absolute",
        left: 30,  // Size of one emoji or interaction Expo icon + 6px gap from smiley face
        zIndex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 4,

        paddingHorizontal: 4,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: globalStyles.colors.blue2,
    },
    emoji: {
        fontSize: 17,
    },
})

export default styles