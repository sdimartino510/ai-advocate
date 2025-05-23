import { StyleSheet, Dimensions} from "react-native";
const { width, height} = Dimensions.get("window");
import globalStyles from '@/assets/global_styles';

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 20,
        backgroundColor: globalStyles.colors.white,
        alignItems: "flex-start",
    },
    backgroundImages: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
    },
    vector3Image: {
        top: '0%',
        width: '100%',
        height: 750,
        resizeMode: 'cover',
    },
    rectangle105Image: {
        width: '100%',
        height: 600,
        resizeMode: 'cover',
        position: 'absolute',
        top: '60%',
    },
    backButtonWrapper: {
        width: "30%",
        height: 50,
        justifyContent: "center",
    },
    backButtonText: {
        marginTop: -20,
        fontSize: 26,
        fontWeight: "bold",
        color: globalStyles.colors.black,
    },
    roundedBox: {
        width: width - 60,
        height: height/2.5,
        backgroundColor: globalStyles.colors.white,
        borderColor: globalStyles.colors.blue1,
        borderWidth: 3,
        borderTopRightRadius: 120,
        borderRadius: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: globalStyles.colors.black,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 10,
        paddingHorizontal: 30,
        flex: 1,
    },
    circleContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-end",
        height: 100,
    },
    circle1: {
        marginRight: 80,
        marginTop: -15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalStyles.colors.buttonBlue1,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    circle2: {
        marginRight: 30,
        marginTop: -30,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalStyles.colors.buttonBlue1,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    circle3: {
        marginRight: -10,
        marginTop: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalStyles.colors.buttonBlue1,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    circle4: {
        marginRight: -20,
        marginTop: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: globalStyles.colors.buttonBlue1,
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    boxText: {
        marginTop: 40,
        marginRight: 20,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: globalStyles.colors.black,
    },
    titleAndLiveContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
    },
    title: {
        width: "72%",
        textAlign: "left",
        fontFamily: 'Montserrat_400Regular',
        fontSize: 26,
        color: globalStyles.colors.black,
    },
    liveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: globalStyles.colors.red,
    },
    liveButtonText: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
        color: globalStyles.colors.white,
    },
    id: {
        marginBottom: 20,
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
    },
    statusBadgeContainer: {
        marginBottom: 20,
    },
    bookmarkWrapper: {
        position: "absolute",
        top: 5,
        left: 5,
    },
    simplifyButton: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
        right: 20,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 5,
        borderRadius: 20,
        backgroundColor: globalStyles.colors.buttonBlue1,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    simplifyButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: globalStyles.colors.darkBlue,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        marginTop: height/8,
        marginLeft: -width/10,
        width: '65%',
        backgroundColor: globalStyles.colors.white,
        borderRadius: 10,
        alignItems: 'stretch',
    },
    item: {
        padding: 10,
        textAlign: 'left',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
    },
    divider: {
        height: 1,
        backgroundColor: globalStyles.colors.lightGrey,
    },
    // Simplify bill slider
    simplifiedBar: {
        width: "100%",
        alignSelf: "center",  // Align the bar with the parent container (the screen itself in this case)
        marginTop: 20,
        padding: 10,
        justifyContent: "space-between",  // Align items within the bar
        alignItems: "center",

        borderWidth: 2,
        borderRadius: 10,
        borderColor: globalStyles.colors.blue1,
        backgroundColor: globalStyles.colors.white,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    sliderLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        marginTop: 5,
    },
    label: {
        fontFamily: "Montserrat_400Regular",
        fontSize: 14,
        color: globalStyles.colors.grey,
    },
    activeLabel: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 14,
        color: globalStyles.colors.black,
    },
    // Expert's Thoughts Section
    expertThoughtsTitleWrapper: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",  
        gap: 10,
    },
    expertTitle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 26,
        color: globalStyles.colors.black,
    },
    expertDescription: {
        marginTop: 10,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: globalStyles.colors.black,
    },
    dropDownButton: {
        marginTop: 30,
        width: "95%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        elevation: 2,

        backgroundColor: globalStyles.colors.white,
        borderRadius: 10,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    dropDownButtonText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 17,
        color: globalStyles.colors.black,
    },
    dropdownContentWrapper: {
        width: "95%",
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: globalStyles.colors.white,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    dropdownContentText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: globalStyles.colors.black,
    },
});

export default styles;