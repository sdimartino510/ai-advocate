import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    filterButtonContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: globalStyles.colors.filterButtonBorder,
        backgroundColor: globalStyles.colors.blue1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    },
    filterButtonText: {
        fontSize: 17,
        fontFamily: "Montserrat_800Bold",
        textAlign: "center",
    },
})

export default styles