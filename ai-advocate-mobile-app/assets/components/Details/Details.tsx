import { Text, View, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Share, Linking} from "react-native";
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from "@react-native-community/slider";
import { Status } from "@/assets/types";
import StatusBadge from "@/assets/components/StatusBadge/StatusBadge";
import globalStyles from '@/assets/global_styles';
import styles from "./details_styles";
import EngagementToolbar from "../EngagementToolbar/EngagementToolbar";

// TODO: Combine with bill component type and move to types.ts
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

export default function Details({billTitle, billId, billStatus, billSummary, billSummaryMid, billSummaryCom, pro, con, link, numUpvotes=0, numDownvotes=0, numReactions=0, saved=false}:BillInfo) {
    {/** For engagement toolbar: */}
    const [upvotes, setUpvotes] = useState(numUpvotes)
    const [downvotes, setDownvotes] = useState(numDownvotes)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)
    const [isSaved, setIsSaved] = useState<boolean>(saved);
    const[selectedReaction, setSelectedReaction] = useState<number>(-1)
    const [reactions, setReactions] = useState<Array<{id: number, emoji: string, numReactions: number}>>([
        { id: 0, emoji: '😊', numReactions: 96 },
        { id: 1, emoji: '🥰', numReactions: 27 },
        { id: 2, emoji: '😯', numReactions: 13 },
        { id: 3, emoji: '😢', numReactions: 5 },
        { id: 4, emoji: '😡', numReactions: 2 },
    ])
    const[totalReactions, setTotalReactions] = useState<number>(numReactions)


    const [modalVisible, setModalVisible] = useState(false);
    const [activeCircle, setActiveCircle] = useState('circle1');

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

    const handleCirclePress = ({circleName}:{circleName: React.SetStateAction<String>}) => {
        setActiveCircle(circleName);
        if(circleName !== 'circle1') {
            setShowButton(false);
        } else {
            setShowButton(true);
        }
    };

    const getCircleStyle = ({circleName}:{circleName: string}) => {
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
                            onPress={() => setIsSaved(!isSaved)}
                        />
                        {isSaved &&
                            <MaterialIcons
                                name="bookmark"
                                size={18}
                                style={styles.shadedBookmark}
                                color={"#FFAF37"}
                                onPress={() => setIsSaved(!isSaved)}
                            />
                        }
                    </View>

                    <View style={styles.circleContainer}>
                        <TouchableOpacity onPress={() =>  {handleCirclePress('circle1'); setViewMode("default");}}>
                            {/*description circle (on the right)*/}
                        <View style={getCircleStyle({ circleName: "circle1" })}>
                            <Icon name="align-left" size={20} color={globalStyles.colors.black}/>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {handleCirclePress('circle2'); setModalVisible(true);}}>
                            {/*sponsor, history, and status bubble*/}
                        <View style={getCircleStyle({ circleName: "circle2" })}>
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
                        <View style={getCircleStyle({ circleName: "circle3" })}>
                            <Icon name="file-pdf-o" size={20} color={globalStyles.colors.black} />
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleShare}>
                            {/*share circle*/}
                        <View style={getCircleStyle({ circleName: "circle4" })}>
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
            
            {/*engagement toolbar*/}
            {/** TODO: Check styles for engagement toolbar view wrapper. */}
            <View style={[{paddingHorizontal: 40, paddingVertical: 20, flexDirection: 'row', justifyContent: "flex-start"}]}>
                <EngagementToolbar 
                    upvotes={upvotes}
                    setUpvotes={setUpvotes}
                    downvotes={downvotes}
                    setDownvotes={setDownvotes}
                    isUpvoted={isUpvoted}
                    setIsUpvoted={setIsUpvoted}
                    isDownvoted={isDownvoted}
                    setIsDownvoted={setIsDownvoted}
                    isSaved={isSaved}
                    setIsSaved={setIsSaved}

                    reactions={reactions}
                    setReactions={setReactions}
                    selectedReaction={selectedReaction}
                    setSelectedReaction={setSelectedReaction}
                    totalReactions={totalReactions}
                    setTotalReactions={setTotalReactions}

                    showReactionStatsButton={false}
                    showShareButton={false}
                    showSavedButton={false}
                />
            </View>
        </ScrollView>
    );
}

