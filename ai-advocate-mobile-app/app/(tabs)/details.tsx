import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, Share} from "react-native";
import { useState} from 'react';
import { useRouter, useSegments } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height} = Dimensions.get("window");

export default function Details() {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCircle, setActiveCircle] = useState('circle1');
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };

    const handleBookmarkPress = () => {
        setIsBookmarked(!isBookmarked);
    };
    const router = useRouter();
    const segments = useSegments();

    const handleCirclePress = (circleName) => {
        setActiveCircle(circleName);
    };

    const getCircleStyle = (circleName) => {
        return {
            marginRight: circleName === 'circle1'? 80: circleName === 'circle2'? 30: circleName === 'circle3'? -10: -20,
            marginTop: circleName === 'circle1'? -15: circleName === 'circle2'? -30: circleName === 'circle3'? 0: 10,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: activeCircle === circleName ? "#8DBFE4": "#C0DAEC",
            marginBottom: 5,
            justifyContent: "center",
            alignItems: "center",
        }
    };


    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `BILL TITLE. Summary of bill- download AI advocate`,
            });

            if (result.action === Share.sharedAction) {
                if(result.activityType){
                    console.log(`Shared with activity: ${result.activityType}`);
                } else {
                    console.log('Shared successfully!');
                }
            } else if (result.action == Share.dismissedAction){
                console.log('Share dialog dismissed');
            }
        } catch (error){
            Alert.alert('Error', `Failed to share: ${error.message}`);
        }
    };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            {/*back button*/}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backButtonText}> &larr;</Text>
                </TouchableOpacity>
            </View>
            {/*bill title & live button*/}
            <View style={styles.titleContainer}>
                 <Text style= {styles.title}> BILL TITLE</Text>
                 <TouchableOpacity onPress={() => router.back()} style={styles.liveButton}>
                        <Text style={styles.liveButtonText}>Live</Text>
                 </TouchableOpacity>
            </View>
            {/*bill ID*/}
            <View style={styles.billIdAndStatus}>
                <Text style= {styles.id}> Bill ID: 418641279 </Text>
                <View style={styles.statusBox}>
                    <Text style={styles.status}> Enrolled </Text>
                </View>
            </View>
            {/*description box*/}
            <View style={styles.roundedBox}>
                {/*bookmark*/}
                <TouchableOpacity onPress={handleBookmarkPress} style={styles.bookmarkContainer}>
                <View style={styles.bookmarkOutline}>
                    <Icon name = "bookmark" size={30} color={isBookmarked ?  '#C0DAEC': '#FFAF37'} style={styles.bookmarkIcon}/>
                </View>
                </TouchableOpacity>
                <View style={styles.circleContainer}>
                    <TouchableOpacity onPress={() =>  handleCirclePress('circle1')}>
                        {/*description circle (on the right)*/}
                      <View style={getCircleStyle("circle1")}>
                        <Icon name="align-left" size={20} color="black"/>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleCirclePress('circle2'); setModalVisible(true);}}>
                        {/*sponsor, history, and status bubble*/}
                      <View style={getCircleStyle("circle2")}>
                        <Icon name="info" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                        <TouchableWithoutFeedback onPress={() => {setModalVisible(false);}}>
                            <View style={styles.modalOverlay}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity onPress={()=> router.back()}>
                                            <Text style= {styles.item}> Sponsors</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                        <TouchableOpacity onPress={()=> router.back()}>
                                            <Text style= {styles.item}> History</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                        <TouchableOpacity onPress={()=> router.back()}>
                                        <Text style= {styles.item}> Status</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <TouchableOpacity onPress={() => handleCirclePress('circle4')}>
                        {/*pdf circle*/}
                      <View style={getCircleStyle("circle3")}>
                        <Icon name="file-pdf-o" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        //share circle
                      <View style={getCircleStyle("circle4")}>
                        <Icon name="share-alt" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                </View>
                {/*summary in description box*/}
                <Text style={styles.boxText}>A short summary of the bill and what it touches upon. A plain language summary of what the bill aims to do. </Text>
                {/*simplify button*/}
                <TouchableOpacity onPress={() => router.back()} style={styles.simplifyButton}>
                      <Text style={styles.simplifyButtonText}>Simplify &gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
        {/*expert thoughts on bottom*/}
        <Text style= {styles.expertTitleText}>Expert's Thoughts </Text>
        {/*pro box*/}
        <TouchableOpacity onPress={() => toggleDropdown("dropdown1")} style={styles.dropDown}>
            <Text style={styles.dropDownHeaderText}>
                {openDropdown === "dropdown1" ? "Pros" : "Pros"}
            </Text>
        </TouchableOpacity>
        {openDropdown === "dropdown1" && (
            <View style={styles.dropdownContent}>
                <Text style={styles.infoText}> Pro text </Text>
            </View>
        )}
        {/*con box*/}
        <TouchableOpacity onPress={() => toggleDropdown("dropdown2")} style={styles.dropDown}>
           <Text style={styles.dropDownHeaderText}>
              {openDropdown === "dropdown2" ? "Cons" : "Cons"}
           </Text>
        </TouchableOpacity>
        {openDropdown === "dropdown2" && (
           <View style={styles.dropdownContent}>
               <Text style={styles.infoText}> Con text </Text>
           </View>
        )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    container: {
        paddingTop: 0,
        paddingHorizontal: 20,
        width: "100%",
        marginBottom: 20,
    },
    header: {
        width: "30%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
        elevation: 2,
        marginBottom: 20,
    },
    backButton: {
        padding: 0,
    },
    backButtonText: {
        fontSize: 50,
        color: "black",
        fontWeight: "bold",
        marginTop: -20,
    },
    roundedBox: {
        width: width - 60,
        height: height/3,
        backgroundColor: "white",
        borderColor: '#BAE2FF',
        borderWidth: 3,
        borderTopRightRadius: 120,
        borderRadius: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 20,
        paddingHorizontal: 30,
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
        backgroundColor: "#C0DAEC",
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
            backgroundColor: "#C0DAEC",
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
            backgroundColor: "#C0DAEC",
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
        backgroundColor: "#C0DAEC",
        marginBottom: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    boxText: {
        top: 70,
        color: "black",
        fontWeight: "bold",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        width: "100%",
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    liveButton: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: "red",
        borderRadius: 5,
    },
    liveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    billIdAndStatus: {
        paddingHorizontal: 10,
        marginTop: -10,
        paddingBottom: 20,
    },
    id: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 20,
    },
    statusBox: {
        paddingHorizontal: 10,
        width: 80,
        height: 25,
        borderRadius: 15,
        backgroundColor: "#FEEAD3",
        marginBottom: 5,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    status: {
        paddingTop: 3,
        color: "black",
        fontWeight: "bold",
    },
    bookmarkIcon: {
        position: "absolute",
        top: 10,
        left: -width/3 - 15,

    },
    simplifyButton: {
        marginTop: height/5,
        marginLeft: width/2.5,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 15,
        backgroundColor: "#C0DAEC",
        borderRadius: 20,
    },
    simplifyButtonText: {
       color: "#0064AE",
       fontWeight: "bold",
    },
    expertTitleText: {
        marginLeft: -20,
        marginTop: 30,
        fontSize: 40,
        color: "black",
        fontWeight: "bold",
    },
    dropDown: {
        marginTop: 30,
        width: "80%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f8f8f8",
        elevation: 2,
        marginBottom: 0,
    },
    dropdownContent: {
        width: "81%",
        borderTopWidth: 0,
        borderWidth: 3,
        borderColor: "#ddd",
        backgroundColor: "#ffffff",
        padding: 10,
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
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'stretch',
    },
    item: {
        fontSize: 18,
        padding: 10,
        textAlign: 'left',
    },
    divider: {
        height: 1,
        backgroundColor: '#dcdcdc',
        marginHorizontal: 20,
    }
})
