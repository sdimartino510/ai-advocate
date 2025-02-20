import  {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
    selectedTopicsContainer: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 8,
        padding: 16,
    },
    selectedTopic: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: globalStyles.colors.sortOptionBorder,
        color: globalStyles.colors.sortOptionText,
        backgroundColor: globalStyles.colors.white,
    },
    selectedTopicText: {
        textAlign: "center",
        fontSize: 12,
        fontFamily: "Montserrat_400Regular",
        color: globalStyles.colors.black,
    },
})

export default styles