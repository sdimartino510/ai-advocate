import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import globalStyles from '../../styles/global_styles'
import styles from './bill_styles'

type Status = 'Passed' | 'Engrossed' | 'Introduced' | 'Enrolled'

type BillProps = {
    title: string,
    id: string,
    status: Status,
    description: string,
    topics: string[],           // TODO: Required for Home page, optional for Saved page? 
    numUpvotes?: number,
    numDownvotes?: number,
    numReactions?: number,
    saved?: boolean,
}

// TODO: Status definition pop ups.
function StatusBadge({status}: {status: Status}) {
    let color = globalStyles.colors.lightGreen
    let statusDefinition = ''
    
    if (status === 'Passed') {
        color = globalStyles.colors.lightGreen
        statusDefinition = 'In legal terms, “passed” is a bill approved by a majority in one chamber, moving to the next for consideration.'
    } else if (status === 'Engrossed') {
        color = globalStyles.colors.purple
        statusDefinition = 'In legal terms, "engrossed" refers to the preparation of a final, official copy of a legal document.'
    } else if (status === 'Introduced') {
        color = globalStyles.colors.pink
        statusDefinition = 'In legal terms, the "introduction" of a bill is the formal process of presenting a proposed law to a legislative body for consideration.'
    } else if (status === 'Enrolled') {
        color = globalStyles.colors.orange
        statusDefinition = 'undefined' // TODO: Define "enrolled" status.
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

function Bill({title, id, status, description, topics, numUpvotes=0, numDownvotes=0, numReactions=0, saved=false}:BillProps) {
    const [upvotes, setUpvotes] = useState(numUpvotes)
    const [downvotes, setDownvotes] = useState(numDownvotes)
    
    // TODO: Get the existing status of whether or not user upvoted or downvoted.
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)

    const [isSaved, setIsSaved] = useState(saved)

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

            {/* TODO: Reaction icons. + For all icons: functionality and sync with backend. */}
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

                    <View style={styles.engagementPairWrapper}>
                        <Feather name="bar-chart-2" size={24} color={globalStyles.colors.grey} />
                        <Text style={styles.engagementValues}>{numReactions}</Text>
                    </View>

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