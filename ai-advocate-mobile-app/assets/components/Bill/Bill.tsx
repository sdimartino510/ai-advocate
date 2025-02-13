import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '../../global_styles'
import styles from './bill_styles'

type Status = 'Passed' | 'Engrossed' | 'Introduced' | 'Enrolled' | 'Vetoed'

type BillProps = {
    title: string,
    id: string,
    status: Status,
    description: string,
    topics: string[],
    numUpvotes?: number,
    numDownvotes?: number,
    numReactions?: number,
    saved?: boolean,
    reactionID?: number, // TODO: Initialize with user's reaction.
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

function ReactionBar(
    {reactions, setReactions, selectedReaction, setSelectedReaction, setShowReactionsBar, totalReactions, setTotalReactions} : 
    {
        reactions : Array<{id: number, emoji: string, numReactions: number}>
        setReactions : React.Dispatch<React.SetStateAction<Array<{id: number, emoji: string, numReactions: number}>>>
        selectedReaction : number
        setSelectedReaction : React.Dispatch<React.SetStateAction<number>> 
        setShowReactionsBar : React.Dispatch<React.SetStateAction<boolean>> 
        totalReactions : number
        setTotalReactions: React.Dispatch<React.SetStateAction<number>>  // Use SetStateAction<number> to type this correctly
    }
) {

    const handleReactionPress = (index: number) => {
        // Remove current selected reaction.
        if (selectedReaction !== -1){
            const updatedReactions = reactions
            updatedReactions[selectedReaction].numReactions -= 1 // decrement unselected reaction's count
            setReactions(updatedReactions)
            setTotalReactions(totalReactions => totalReactions - 1)
        }
        // Reset to default reaction if pressed on already selected reaction.
        if (selectedReaction === index){
            setSelectedReaction(-1)
        }
        // Select new reaction if pressed on different reaction.
        else {
            setSelectedReaction(index)
            const updatedReactions = reactions
            updatedReactions[index].numReactions += 1
            setReactions(updatedReactions)
            setTotalReactions(totalReactions => totalReactions + 1)
        }

        // Close reaction bar after updating a reaction
        setShowReactionsBar(false)
    }

    return (
        <View style={styles.reactionsContainer}>
        {reactions.map((reaction, index) => (
            <View key={index}>
                <TouchableOpacity
                    onPress = {() => {handleReactionPress(index)}}
                >
                    <Text>{reaction.emoji}</Text>
                </TouchableOpacity>
            </View>
        ))}
        </View>
    )
}

function ReactionStats({totalReactions, reactions} : {totalReactions: number, reactions: Array<{id: number, emoji: string, numReactions: number}>}) {
    return(
        <View style={styles.reactionStatsContainer}>
            <View style={styles.reactionStatsPairWrapper}>
                <Text style={styles.reactionStatsText}>All {totalReactions}</Text>
            </View>
            {reactions.map((reaction, index) => 
                <View
                    style={styles.reactionStatsPairWrapper}
                    key={index}
                >
                    <Text style={styles.reactionStatsText}>{reaction.emoji} {reaction.numReactions}</Text>
                </View>
            )}
        </View>
    )
}

function Bill({title, id, status, description, topics, numUpvotes=0, numDownvotes=0, numReactions=0, saved=false}:BillProps) {
    const [upvotes, setUpvotes] = useState<number>(numUpvotes)
    const [downvotes, setDownvotes] = useState<number>(numDownvotes)
    
    // TODO: Get the existing status of whether or not user upvoted or downvoted.
    const [isUpvoted, setIsUpvoted] = useState<boolean>(false)
    const [isDownvoted, setIsDownvoted] = useState<boolean>(false)

    const [isSaved, setIsSaved] = useState<boolean>(saved)

    const handleUpvote = () => {
        // undo upvote
        if (isUpvoted) {
            setUpvotes(upvotes - 1)
            setIsUpvoted(false)
        }
        // undo downvote, then upvote
        else{
            if (isDownvoted) {
                setDownvotes(downvotes - 1)
                setIsDownvoted(false)
            }
            setUpvotes(upvotes + 1)
            setIsUpvoted(true)
        }
    }

    const handleDownvote = () => {
        // undo downvote
        if (isDownvoted) {
            setDownvotes(downvotes - 1)
            setIsDownvoted(false)
        }
        // undo upvote, then downvote
        else{
            if (isUpvoted) {
                setUpvotes(upvotes - 1)
                setIsUpvoted(false)
            }
            setDownvotes(downvotes + 1)
            setIsDownvoted(true)
        }
    }

    const [topicSelected, setTopicSelected] = useState<String | null>(null)
    const [topicDefinition, setTopicDefinition] = useState<String | null>(null)
    const onTopicPress = (topic: string) => {
        // hide definition if any topic is already selected
        if (topicSelected){
            setTopicSelected(null)
            setTopicDefinition(null)
            return
        }
        
        // TODO: Expand topics definition list. Refer to client.

        // show definition for selected topic (case insensitive)
        // use local variable because topicDefinition may be stale for later if-else statement
        let definition : String | null = ''
        switch(topic.toLowerCase()) {
            case 'trafficking':
                definition = 'Transporting of or transacting in illegal goods or people'
                break
            case 'rights':
                definition = 'Legal, social, or ethical principles of freedom or entitlement.'
                break
            default:
                definition = null
        }

        if (definition){
            setTopicSelected(topic)
            setTopicDefinition(definition)
        }
        else{
            setTopicSelected(null)
            setTopicDefinition(null)
        }
    }

    const [showReactionsBar, setShowReactionsBar] = useState<boolean>(false)
    const [selectedReaction, setSelectedReaction] = useState<number>(-1) // Default reaction id == 0. TODO: Initialize with user's reaction.

    // TODO: Sync with backend. This is sample reaction data (taken and modified from Settings page).
    const [reactions, setReactions] = useState<Array<{id: number, emoji: string, numReactions: number}>>([
        { id: 0, emoji: '😊', numReactions: 96 },
        { id: 1, emoji: '🥰', numReactions: 27 },
        { id: 2, emoji: '😯', numReactions: 13 },
        { id: 3, emoji: '😢', numReactions: 5 },
        { id: 4, emoji: '😡', numReactions: 2 },
    ])
    const [totalReactions, setTotalReactions] = useState<number>(numReactions) // TODO: Sync with backend.

    const [showReactionStats, setShowReactionStats] = useState<boolean>(false)

    return (
        <View style={styles.billContainer}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.IDStatusContainer}>
                <Text style={styles.billID}>Bill ID: {id}</Text>
                <StatusBadge status={status} />
            </View>

            <Text style={styles.description}>{description}</Text>

            <View style={styles.topicContainer}>
                <Text style={styles.topicLabel}>Topics: </Text>
                {topics.map((topic, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => onTopicPress(topic)}>
                            <Text
                                style={{color: globalStyles.colors.blue3}}
                            >
                                {topic}{' '}
                            </Text>
                        </TouchableOpacity>
                        {topicDefinition && topicSelected === topic &&
                            <View style={styles.topicDefinitionWrapper}>
                                <Text style={styles.topicDefinition}>{topicDefinition}</Text>
                            </View>
                        }
                    </View>
                ))}
            </View>

            <View style={styles.engagementContainer}>
                <View style={styles.leftEngagements}>
                    <View style={styles.engagementPairWrapper}>
                        <AntDesign
                            name="arrowup"
                            size={24}
                            color={isUpvoted ? globalStyles.colors.black : globalStyles.colors.grey}
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
                    </View>

                    <View style={styles.reactionsButton}>
                        <TouchableOpacity
                            onPress={() => setShowReactionsBar(!showReactionsBar)}
                        >
                            <Text>{selectedReaction === -1 ? '🙂' : reactions[selectedReaction].emoji}</Text>
                        </TouchableOpacity>
                        {showReactionsBar &&
                            <ReactionBar
                                reactions={reactions}
                                setReactions={setReactions}
                                selectedReaction={selectedReaction}
                                setSelectedReaction={setSelectedReaction}
                                setShowReactionsBar={setShowReactionsBar}
                                totalReactions={totalReactions}
                                setTotalReactions={setTotalReactions}
                            />
                        }
                    </View>

                    <TouchableOpacity
                        style={styles.engagementPairWrapper}
                        onPress={() => setShowReactionStats(!showReactionStats)}
                    >
                        <Feather name="bar-chart-2" size={24} color={globalStyles.colors.grey} />
                        <Text style={styles.engagementValues}>{totalReactions}</Text>
                        {showReactionStats && 
                            <View style={styles.reactionStatsBase}>
                                <ReactionStats totalReactions={totalReactions} reactions={reactions} />
                            </View>
                        }
                    </TouchableOpacity>

                    <Feather name="share-2" size={24} color={globalStyles.colors.grey} />
                </View>
                
                <View>
                    <MaterialIcons
                        name="bookmark-outline"
                        size={24}
                        color={globalStyles.colors.grey}
                        onPress={() => setIsSaved(!isSaved)}
                    />
                    {isSaved &&
                        <MaterialIcons
                            name="bookmark"
                            size={18}
                            style={styles.shadedBookmark}
                            color={globalStyles.colors.yellow}
                            onPress={() => setIsSaved(!isSaved)}
                        />
                    }
                </View>
            </View>

        </View>
    )
}

export default Bill