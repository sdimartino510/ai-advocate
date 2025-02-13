import { StyleSheet } from "react-native"
import globalStyles from '../../global_styles'

// Filter Panel Styles
const styles = StyleSheet.create({
  filterPanelTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: globalStyles.colors.black,
  },
  filterPanelDescription: {
    marginBottom: 32,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: globalStyles.colors.black,
  },
  filterPanelOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 12,
  },
  filterPanelOptionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: globalStyles.colors.lightGrey,
    backgroundColor: globalStyles.colors.white,
    boxShadow: "0px 4px 4px {rgba(0, 0, 0, 0.25)}",
  },
  filterPanelOptionText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: globalStyles.colors.black,
  },
  closeFilterPanelButton: {
    position: "absolute",
    top: "50%",
    left: -30,
    height: 74,
    width: 24,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 7,
    backgroundColor: globalStyles.colors.lightBlue,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
})

export default styles