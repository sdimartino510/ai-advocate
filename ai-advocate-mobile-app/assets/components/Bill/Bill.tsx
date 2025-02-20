import React, {useState} from "react"
import { View, Text, TouchableOpacity } from "react-native"
import {useRouter } from "expo-router"
import { BillInfo } from "@/assets/types"
import StatusBadge from "@/assets/components/StatusBadge/StatusBadge"
import globalStyles from "@/assets/global_styles"
import styles from "@/assets/components/Bill/bill_styles"
import EngagementToolbar from "../EngagementToolbar/EngagementToolbar"

type BillProps = BillInfo & {
    billTopics: string[],
}

function Bill({billTitle, billId, billStatus, billDescription, billTopics, numUpvotes=0, numDownvotes=0, numReactions, saved=false, reactionID=0}:BillProps) {
    const [upvotes, setUpvotes] = useState<number>(numUpvotes)
    const [downvotes, setDownvotes] = useState<number>(numDownvotes)
    const [isUpvoted, setIsUpvoted] = useState<boolean>(false)
    const [isDownvoted, setIsDownvoted] = useState<boolean>(false)
    const [isSaved, setIsSaved] = useState<boolean>(saved)

    const [topicSelected, setTopicSelected] = useState<String | null>(null)
    const [topicDefinition, setTopicDefinition] = useState<String | null>(null)

    const router = useRouter();

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

    return (
        <View style={styles.billContainer}>
            {/** TODO: Sync Details page with Bill component. */}
            <TouchableOpacity onPress={() => router.push(`/details?id=${billId}`)}>
            <Text style={styles.title}>{billTitle}</Text>

            <View style={styles.IDStatusContainer}>
                <Text style={styles.billID}>Bill ID: {billId}</Text>
                <StatusBadge status={billStatus} />
            </View>

            <Text style={styles.description}>{billDescription}</Text>

            <View style={styles.topicContainer}>
                <Text style={styles.topicLabel}>Topics: </Text>
                {billTopics.map((topic, index) => (
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
                                <Text style={styles.topicDefinitionText}>{topicDefinition}</Text>
                            </View>
                        }
                    </View>
                ))}
            </View>

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
            />

            </TouchableOpacity>
        </View>
    )
}

export default Bill