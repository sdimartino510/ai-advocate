import { Text, View, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Share, Linking} from "react-native";
import { useState, useEffect } from 'react';
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather'
import { BillInfo } from "@/assets/types";
import ShareButton from "@/assets/components/ShareButton/ShareButton";
import SaveButton from "@/assets/components/SaveButton/SaveButton";
import Slider from "@react-native-community/slider";
import StatusBadge from "@/assets/components/StatusBadge/StatusBadge";
import EngagementToolbar from "../EngagementToolbar/EngagementToolbar";
import globalStyles from '@/assets/global_styles';
import styles from "./details_styles";

type DetailsProps = BillInfo & {
    linkLIVE: string,
    billSummarySimple: string,
    billSummaryMedium: string,
    billSummaryComplex: string,
    pros: string,
    cons: string,
}

export default function Details({billTitle, billId, billStatus, billDescription, billSummarySimple, billSummaryMedium, billSummaryComplex, pros, cons, linkLIVE, numUpvotes=0, numDownvotes=0, numReactions=0, saved=false}:DetailsProps) {
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

    useEffect(() => {
        if (linkLIVE) {
            setShowLive(true);
        } else {
            setShowLive(false);
        }
    }, [linkLIVE]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.backgroundImages}>
                <Image source={require('../../images/Vector 3.png')} style={styles.vector3Image} />
                <Image source={require('../../images/Rectangle 105.png')} style={styles.rectangle105Image} />
            </View>

            <TouchableOpacity onPress={() => router.back()} style={styles.backButtonWrapper}>
                <Text style={styles.backButtonText}> &larr;</Text>
            </TouchableOpacity>
            
            {/*bill title & live button*/}
            <View style={styles.titleAndLiveContainer}>
                <Text style= {styles.title}>{billTitle}</Text>
                    {showLive && (
                        <TouchableOpacity onPress={() => {Linking.openURL(linkLIVE).catch(err => console.error('An error occurred', err));}} style={styles.liveButton}>
                            <Text style={styles.liveButtonText}>&bull; LIVE</Text>
                        </TouchableOpacity>
                    )}
            </View>
            
            {/*bill ID*/}
            <Text style= {styles.id}>Bill ID: {billId}</Text>

            {/*status badge*/}
            <View style={styles.statusBadgeContainer}>
                <StatusBadge status={billStatus}/>
            </View>

            {/*description box*/}
            <View style={styles.roundedBox}>
                {/*bookmark*/}
                <View style={styles.bookmarkWrapper}>
                    <SaveButton isSaved={isSaved} setIsSaved={setIsSaved}/>
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
                            <Feather name="info" size={24} color={globalStyles.colors.black} />
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
                    
                    <View style={getCircleStyle({ circleName: "circle4" })}>
                        <ShareButton />
                    </View>

                </View>

                {/*summary in description box*/}
                <Text style={styles.boxText}>
                    {viewMode === "default" ? 
                        (simplificationLevel === 0 ? billDescription:
                        simplificationLevel === 1 ? billSummarySimple:
                        simplificationLevel === 2 ? billSummaryMedium :
                        simplificationLevel === 3 ? billSummaryComplex : "")
                    :
                    viewMode === "sponsor" ? "Sponsor details go here." :
                    viewMode === "history" ? "Bill history details go here." :
                    viewMode === "status" ? "Current bill status details go here." : ""}
                </Text>

                {/*simplify button*/}
                <TouchableOpacity onPress={() => {setIsSimplified(!isSimplified); setSimplificationLevel(0);}} style={styles.simplifyButton}>
                    <Text style={styles.simplifyButtonText}>{isSimplified? "See Original" : "Simplify"}</Text>
                    <Entypo name="chevron-right" size={20} color={globalStyles.colors.darkBlue} />
                </TouchableOpacity>
            </View>

            {/*simplify slide bar*/}
            {isSimplified && (
                <View style={styles.simplifiedBar}>
                    <Slider
                        style={{width: 275, height: 40}}
                        minimumValue={1}
                        maximumValue={3}
                        step={1}
                        value={simplificationLevel}
                        onSlidingComplete={(value) => setSimplificationLevel(value)}
                        minimumTrackTintColor= {globalStyles.colors.blue1}
                        maximumTrackTintColor= {globalStyles.colors.blue1}
                        thumbTintColor={globalStyles.colors.blue1}
                    />
                    <View style={styles.sliderLabels}>
                        <Text style={simplificationLevel === 1 ? styles.activeLabel : styles.label}>Simple</Text>
                        <Text style={simplificationLevel === 2 ? styles.activeLabel : styles.label}>Medium</Text>
                        <Text style={simplificationLevel === 3 ? styles.activeLabel : styles.label}>Complex</Text>
                    </View>
                </View>
            )}
                    
            {/*expert thoughts on bottom*/}
            <View style={styles.expertThoughtsTitleWrapper}>
                <Text style= {styles.expertTitle}>Expert's Thoughts </Text>
                <AntDesign name="Safety" size={24} color="black" />
            </View>

            {/*TODO: Align linked text with unlinked text. */}
            <View style={{width: "95%"}}>
                <Text style={styles.expertDescription}>This bill has been reviewed by our panel of experts. Below are their thoughts, based on lived experience.</Text>
                <TouchableOpacity onPress={() => router.push({pathname: "../../../lnf", params: {activeButton: 'AI Advocate'}})}>
                    <Text style={[styles.expertDescription, {color:globalStyles.colors.darkBlue}]}>See who they are.</Text>
                </TouchableOpacity>
            </View>

            {/*pro box*/}
            <TouchableOpacity
                onPress={() => toggleDropdown("dropdown1")}
                style={[
                    styles.dropDownButton,
                    openDropdown === "dropdown1" && {backgroundColor: globalStyles.colors.blue1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}
            >
                <Text style={styles.dropDownButtonText}>Pros</Text>
                {openDropdown === "dropdown1" ? 
                    <Entypo name="chevron-thin-down" size={17} color={globalStyles.colors.black} />
                    :
                    <Entypo name="chevron-thin-right" size={17} color={globalStyles.colors.black} />
                }
            </TouchableOpacity>
                
            {openDropdown === "dropdown1" && (
                <View style={styles.dropdownContentWrapper}>
                    <Text style={styles.dropdownContentText}>{pros}</Text>
                </View>
            )}

            {/*con box*/}
            <TouchableOpacity
                onPress={() => toggleDropdown("dropdown2")}
                style={[
                    styles.dropDownButton,
                    openDropdown === "dropdown2" && {backgroundColor: globalStyles.colors.blue1, borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}
            >
                <Text style={styles.dropDownButtonText}>Cons</Text>
                {openDropdown === "dropdown2" ? 
                    <Entypo name="chevron-thin-down" size={17} color={globalStyles.colors.black} />
                    :
                    <Entypo name="chevron-thin-right" size={17} color={globalStyles.colors.black} />
                }
            </TouchableOpacity>

            {openDropdown === "dropdown2" && (
            <View style={styles.dropdownContentWrapper}>
                <Text style={styles.dropdownContentText}>{cons}</Text>
            </View>
            )}
            
            {/*engagement toolbar*/}
            <View style={{marginTop: 30}}>
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

                    showShareButton={false}
                    showSavedButton={false}
                />
            </View>
        </ScrollView>
    );
}