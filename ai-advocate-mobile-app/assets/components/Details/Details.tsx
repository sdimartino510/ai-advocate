import { Text, View, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, Share} from "react-native";
import { useState } from 'react';
import { useRouter, useSegments } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./details_styles"
const { width, height} = Dimensions.get("window");
import Slider from "@react-native-community/slider";

export default function Details({billTitle, billId, billStatus, billSummary, billSummaryMid, billSummaryCom, pro, con}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCircle, setActiveCircle] = useState('circle1');
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [viewMode, setViewMode] = useState('default');
    const [showButton, setShowButton] = useState(true);
    const [isSimplified, setIsSimplified] = useState(false);
    const [simplificationLevel, setSimplificationLevel] = useState(0);

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
        if(circleName !== 'circle1') {
            setShowButton(false);
        } else {
            setShowButton(true);
        }
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
                 <Text style= {styles.title}> {billTitle}</Text>
                 <TouchableOpacity onPress={() => router.back()} style={styles.liveButton}>
                        <Text style={styles.liveButtonText}>Live</Text>
                 </TouchableOpacity>
            </View>

            {/*bill ID*/}
            <View style={styles.billIdAndStatus}>
                <Text style= {styles.id}> Bill ID: {billId}</Text>
                <View style={styles.statusBox}>
                    <Text style={styles.status}> {billStatus} </Text>
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
                    <TouchableOpacity onPress={() =>  {handleCirclePress('circle1'); setViewMode("default");}}>
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
                                        <TouchableOpacity onPress={()=> {setViewMode("sponsor"); setModalVisible(false);}}>
                                            <Text style= {styles.item}> Sponsors</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                        <TouchableOpacity onPress={()=> {setViewMode("history"); setModalVisible(false);}}>
                                            <Text style= {styles.item}> History</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                        <TouchableOpacity onPress={()=> {setViewMode("status"); setModalVisible(false);}}>
                                        <Text style= {styles.item}> Status</Text>
                                        </TouchableOpacity>
                                        <View style={styles.divider}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                    <TouchableOpacity onPress={() => handleCirclePress('circle3')}>
                        {/*pdf circle*/}
                      <View style={getCircleStyle("circle3")}>
                        <Icon name="file-pdf-o" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        {/*share circle*/}
                      <View style={getCircleStyle("circle4")}>
                        <Icon name="share-alt" size={20} color="black" />
                      </View>
                    </TouchableOpacity>
                </View>
                {/*summary in description box*/}
                <Text style={styles.boxText}>
                    {viewMode === "default" ?
                        (simplificationLevel === 0 ? billSummary:
                        simplificationLevel === 1 ? billSummaryMid :
                        simplificationLevel === 2 ? billSummaryCom : "")
                     :
                     viewMode === "sponsor" ? "Sponsor details go here." :
                     viewMode === "history" ? "Bill history details go here." :
                     viewMode === "status" ? "Current bill status details go here." : ""}
                </Text>
                {/*simplify button*/}
                {showButton && (
                    <TouchableOpacity onPress={() => setIsSimplified(!isSimplified)} style={styles.simplifyButton}>
                        <Text style={styles.simplifyButtonText}>{isSimplified? "Simplify" : "Simplify"}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {/*simplify slide bar*/}
                            {isSimplified && (
                                <View style={styles.simplifiedBar}>
                                    <Slider
                                        style={{width: 250, height: 40}}
                                        minimumValue={0}
                                        maximumValue={2}
                                        step={1}
                                        value={simplificationLevel}
                                        onSlidingComplete={(value) => setSimplificationLevel(value)}
                                        minimumTrackTintColor="#BAE2FF"
                                        maximumTrackTintColor= "#BAE2FF"
                                        thumbTintColor="#BAE2FF"
                                    />
                                    <View style={styles.sliderLabels}>
                                        <Text style={simplificationLevel === 0 ? styles.activeLabel : styles.label}>Simple</Text>
                                        <Text style={simplificationLevel === 1 ? styles.activeLabel : styles.label}>Medium</Text>
                                        <Text style={simplificationLevel === 2 ? styles.activeLabel : styles.label}>Complex</Text>
                                    </View>
                                </View>
                            )}
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
                    <Text style={styles.infoText}> {pro} </Text>
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
                   <Text style={styles.infoText}> {con} </Text>
               </View>
            )}

    </ScrollView>
  );
}

