import React, {useState} from 'react'
import { View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
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
            <Text
                style={[styles.status, {backgroundColor: color}]}
                onPress={onStatusPress}    
            >
                {status}
            </Text>

            {showStatusDefinition &&
                <View style={styles.statusDefinitionWrapper}>
                    <Text style={styles.statusDefinition}>{statusDefinition}</Text>
                </View>
            }
        </View>
    )
}

function Bill({title, id, status, description, topics, numUpvotes=0, numDownvotes=0, numReactions=0}:BillProps) {
    const [upvotes, setUpvotes] = useState(numUpvotes)
    const [downvotes, setDownvotes] = useState(numDownvotes)
    
    // TODO: Get the existing status of whether or not user upvoted or downvoted.
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)

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

    return (
        <View style={styles.billContainer}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.IDStatusContainer}>
                <Text style={styles.billID}>Bill ID: {id}</Text>
                <StatusBadge status={status} />
            </View>

            <Text style={styles.description}>{description}</Text>

            {/* TODO: Keyword definition pop ups. */}
            <View style={styles.topicContainer}>
                <Text style={styles.topicLabel}>Topics: </Text>
                {topics.map((topic, index) => (
                    <Text
                        key={index}
                        style={{color: index%2==0 ? globalStyles.colors.blue3 : globalStyles.colors.black}}
                    >
                        {topic}{' '}
                    </Text>
                ))}
            </View>

            {/* TODO: Reaction and bookmark icons. All icon functionality. Sync with backend. */}
            <View style={styles.interactionContainer}>
                <View style={styles.interactionPairWrapper}>
                    <AntDesign
                        name="arrowup"
                        size={24}
                        color={isUpvoted ? globalStyles.colors.black : globalStyles.colors.grey}
                        onPress={handleUpvote}
                    />
                    <Text style={styles.interactionValues}>{upvotes}</Text>
                </View>

                <View style={styles.interactionPairWrapper}>
                    <AntDesign
                        name="arrowdown"
                        size={24}
                        color={isDownvoted ? globalStyles.colors.black : globalStyles.colors.grey}
                        onPress={handleDownvote}
                    />
                    <Text style={styles.interactionValues}>{downvotes}</Text>
                </View>

                <View style={styles.interactionPairWrapper}>
                    <Feather name="bar-chart-2" size={24} color={globalStyles.colors.grey} />
                    <Text style={styles.interactionValues}>{numReactions}</Text>
                </View>

                <Feather name="share-2" size={24} color={globalStyles.colors.grey} />
            </View>

        </View>
    )
}

export default Bill