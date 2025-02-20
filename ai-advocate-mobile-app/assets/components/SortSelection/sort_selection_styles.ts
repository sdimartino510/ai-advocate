import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    sortSelectionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 16,
    },
    sortOption: {
        textAlign: "center",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: globalStyles.colors.sortOptionBorder,
        fontSize: 14,
        fontFamily: "Montserrat_400Regular",
        color: globalStyles.colors.sortOptionText,
        backgroundColor: globalStyles.colors.white,
    },
})

export default styles