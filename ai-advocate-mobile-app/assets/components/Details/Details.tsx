import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, Share, Linking} from "react-native";
import { useState, useEffect } from 'react';
import { useRouter, useSegments } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./details_styles"
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '../../styles/global_styles'
const { width, height} = Dimensions.get("window");
import Slider from "@react-native-community/slider";

type Status = 'Passed' | 'Engrossed' | 'Introduced' | 'Enrolled' | 'Vetoed'

type BillInfo = {
    billTitle: string,
    billId: string,
    billStatus: Status,
    billSummary: string,
    billSummaryMid: string,
    billSummaryCom: string,
    pro: string,
    con: string,
    link: string,
    numUpvotes?: number,
    numDownvotes?: number,
    numReactions?: number,
    saved?: boolean,
}

function StatusBadge({status}: {status: Status}) {
    let color = globalStyles.colors.lightGreen
    let statusDefinition = ''

    if (status === 'Introduced') {
        color = globalStyles.colors.pink
        statusDefinition = 'A lawmaker (a senator or assembly member) has officially presented the bill to the legislature for consideration. This is the first step in the process of making it a law.'
    } else if (status === 'Engrossed') {
        color = globalStyles.colors.purple
        statusDefinition = 'The bill has been updated to include any changes made during the review process. It is then prepared in its final form before moving to the next stage of approval.'
    } else if (status === 'Enrolled') {
        color = globalStyles.colors.orange
        statusDefinition = 'The bill has been passed and will now be proofread for accuracy and then delivered to the Governor to be approved or vetoed.'
    } else if (status === 'Passed') {
        color = globalStyles.colors.lightGreen
        statusDefinition = 'A majority of lawmakers in both the State Assembly and the State Senate have voted to approve the bill. The bill then becomes “enrolled” and is then sent to the Governor to be approved or vetoed.'
    } else if(status === 'Vetoed'){
        color = globalStyles.colors.lightRed
        statusDefinition = 'The governor has rejected the bill and decided not to make it a law. However, lawmakers can try to override the veto with a two-thirds vote in both the State Assembly and the State Senate.'
    }

    const [showStatusDefinition, setShowStatusDefinition] = useState(false)
    const onStatusPress = () => {
        setShowStatusDefinition(!showStatusDefinition)
    }

    return (
        <View>
            <TouchableOpacity onPress={onStatusPress}>
                <Text
                    style={[styles.status, {backgroundColor: color}]}
                >
                    {status}
                </Text>
            </TouchableOpacity>

            {showStatusDefinition &&
                <View style={styles.statusDefinitionWrapper}>
                    <Text style={styles.statusDefinition}>{statusDefinition}</Text>
                </View>
            }
        </View>
    )
}

export default function Details({billTitle, billId, billStatus, billSummary, billSummaryMid, billSummaryCom, pro, con, link, numUpvotes=0, numDownvotes=0, numReactions=0, saved=false}:BillInfo) {
    const [upvotes, setUpvotes] = useState(numUpvotes)
    const [downvotes, setDownvotes] = useState(numDownvotes)

    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCircle, setActiveCircle] = useState('circle1');
    const [isBookmarked, setIsBookmarked] = useState(saved);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [viewMode, setViewMode] = useState('default');
    const [showButton, setShowButton] = useState(true);
    const [isSimplified, setIsSimplified] = useState(false);
    const [simplificationLevel, setSimplificationLevel] = useState(0);
    const [showLive, setShowLive] = useState(false);

    const toggleDropdown = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
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
            backgroundColor: activeCircle === circleName ? globalStyles.colors.buttonBlue2: globalStyles.colors.buttonBlue1,
            marginBottom: 5,
            justifyContent: "center",
            alignItems: "center",
        }
    };

    const handleUpvote = () => {
        {/*undo upvote*/}
        if (isUpvoted){
            setUpvotes(upvotes -1)
            setIsUpvoted(false)
        }
        else{
            if (isDownvoted){
                setDownvotes(downvotes -1)
                setIsDownvoted(false)
            }
            setUpvotes(upvotes + 1)
            setIsUpvoted(true)
        }
    }

    const handleDownvote = () => {
        if (isDownvoted){
            setDownvotes(downvotes -1)
            setIsDownvoted(false)
        }
        else{
            if (isUpvoted){
                setUpvotes(upvotes - 1)
                setIsUpvoted(false)
            }
            setDownvotes(downvotes +1)
            setIsDownvoted(true)
        }
    }


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

    useEffect(() => {
        if (link) {
            setShowLive(true);
        } else {
            setShowLive(false);
        }
    }, [link]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.backgroundImages}>
                <Image source={require('../../images/Vector 3.png')} style={styles.vector3Image} />
                <Image source={require('../../images/Rectangle 105.png')} style={styles.rectangle105Image} />
        </View>
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
                    {showLive && (
                        <TouchableOpacity onPress={() => {Linking.openURL(link).catch(err => console.error('An error occurred', err));}} style={styles.liveButton}>
                            <Text style={styles.liveButtonText}>Live</Text>
                        </TouchableOpacity>
                    )}
            </View>

            {/*bill ID*/}
            <View style={styles.billIdAndStatus}>
                <Text style= {styles.id}> Bill ID: {billId}</Text>
                <View style={{width: '32%'}}>
                 <StatusBadge status={billStatus}/>
                </View>
            </View>

            {/*description box*/}
            <View style={styles.roundedBox}>
                {/*bookmark*/}
                <View style={styles.bookmarkOutline}>
                    <MaterialIcons
                        name="bookmark-outline"
                        size={24}
                        color={"#7D7676"}
                        onPress={() => setIsBookmarked(!isBookmarked)}
                    />
                    {isBookmarked &&
                        <MaterialIcons
                            name="bookmark"
                            size={18}
                            style={styles.shadedBookmark}
                            color={"#FFAF37"}
                            onPress={() => setIsBookmarked(!isBookmarked)}
                        />
                    }
                </View>

                <View style={styles.circleContainer}>
                    <TouchableOpacity onPress={() =>  {handleCirclePress('circle1'); setViewMode("default");}}>
                        {/*description circle (on the right)*/}
                      <View style={getCircleStyle("circle1")}>
                        <Icon name="align-left" size={20} color={globalStyles.colors.black}/>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleCirclePress('circle2'); setModalVisible(true);}}>
                        {/*sponsor, history, and status bubble*/}
                      <View style={getCircleStyle("circle2")}>
                        <Icon name="info" size={20} color={globalStyles.colors.black} />
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
                        <Icon name="file-pdf-o" size={20} color={globalStyles.colors.black} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShare}>
                        {/*share circle*/}
                      <View style={getCircleStyle("circle4")}>
                        <Icon name="share-alt" size={20} color={globalStyles.colors.black} />
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
                                        minimumTrackTintColor= {globalStyles.colors.blue1}
                                        maximumTrackTintColor= {globalStyles.colors.blue1}
                                        thumbTintColor={globalStyles.colors.blue1}
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
            <View style={{width: "80%"}}>
                <Text>This bill has been reviewed by our panel of experts. Below are their thoughts, based on lived experience.
                <TouchableOpacity style={{marginTop: 42}} onPress={() => router.push({pathname: "../../../lnf", params: {activeButton: 'AI Advocate'}})}>
                    <Text style={{color:globalStyles.colors.darkBlue}}> See who they are </Text>
                </TouchableOpacity>
                </Text>
            </View>
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
        <View style={styles.leftEngagements}>
            <View style={styles.engagementPairWrapper}>
                <AntDesign
                    name="arrowup"
                    size={24}
                    color={isUpvoted? globalStyles.colors.black : globalStyles.colors.grey}
                    onPress={handleUpvote}
                />
                <Text style={styles.engagementValues}>{upvotes}</Text>
            </View>

            <View style={styles.engagementPairWrapper}>
                <AntDesign
                    name="arrowdown"
                    size={24}
                    color={isDownvoted ? globalStyles.colors.black : globalStyles.colors.grey}
                    onPress={handleDownvote}
                />
                <Text style={styles.engagementValues}>{downvotes}</Text>

                <View style={styles.engagementPairWrapper}>
                    <Feather name="bar-chart-2" size={24} color={globalStyles.colors.grey}/>
                    <Text style={styles.engagementValues}>{numReactions}</Text>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

