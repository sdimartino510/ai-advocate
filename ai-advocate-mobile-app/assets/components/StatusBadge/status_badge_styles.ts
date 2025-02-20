import {StyleSheet} from "react-native"
import globalStyles from "@/assets/global_styles"

const styles = StyleSheet.create({
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
    statusDefinitionWrapper: {
        position: 'absolute',
        zIndex: 1,
        top: 32,
        padding: 4,
        width: '175%',      // TODO: Fix the size to half the screen width, not dependent on status text width.

        borderWidth: 1,
        borderRadius: 7,
        borderColor: globalStyles.colors.lightGrey,
        backgroundColor: globalStyles.colors.white,
    },
    statusDefinition: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 10,
        lineHeight: 12,
        color: globalStyles.colors.black,
    },
})

export default styles