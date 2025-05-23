import {useState} from "react"
import {View, Text, TouchableOpacity} from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign'
import Feather from '@expo/vector-icons/Feather'
import globalStyles from "@/assets/global_styles"
import styles from "@/assets/components/EngagementToolbar/engagement_toolbar_styles"
import ShareButton from "@/assets/components/ShareButton/ShareButton"
import SaveButton from "@/assets/components/SaveButton/SaveButton"
import ReactionsBar from "@/assets/components/ReactionsBar/ReactionsBar"
import ReactionStats from "@/assets/components/ReactionStats/ReactionStats"

function EngagementToolbar(
    {
        upvotes, 
        setUpvotes, 
        downvotes, 
        setDownvotes, 
        isUpvoted, 
        setIsUpvoted, 
        isDownvoted, 
        setIsDownvoted,
        isSaved,
        setIsSaved,

        reactions, 
        setReactions, 
        selectedReaction, 
        setSelectedReaction, 
        totalReactions, 
        setTotalReactions,

        showReactionStatsButton=true,
        showShareButton=true,
        showSavedButton=true,
    }
    :
    {
        upvotes: number, 
        setUpvotes: React.Dispatch<React.SetStateAction<number>>,
        downvotes: number,
        setDownvotes: React.Dispatch<React.SetStateAction<number>>, 
        isUpvoted: boolean, 
        setIsUpvoted: React.Dispatch<React.SetStateAction<boolean>>,
        isDownvoted: boolean, 
        setIsDownvoted: React.Dispatch<React.SetStateAction<boolean>>,
        isSaved: boolean,
        setIsSaved: React.Dispatch<React.SetStateAction<boolean>>,
        
        reactions: {id: number, emoji: string, numReactions: number}[], 
        setReactions: React.Dispatch<React.SetStateAction<Array<{id: number, emoji: string, numReactions: number}>>>,
        selectedReaction: number,
        setSelectedReaction: React.Dispatch<React.SetStateAction<number>>,
        totalReactions: number,
        setTotalReactions: React.Dispatch<React.SetStateAction<number>>,

        showReactionStatsButton?: boolean,
        showShareButton?: boolean,
        showSavedButton?: boolean,
    }
) {
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

    const [showReactionsBar, setShowReactionsBar] = useState<boolean>(false)
    const [showReactionStats, setShowReactionStats] = useState<boolean>(false)
    
    return(
        <View style={styles.engagementContainer}>
            
            {/** Left engagement: voting, reactions, sharing */}
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
                        <Text style={styles.emoji}>{selectedReaction === -1 ? '🙂' : reactions[selectedReaction].emoji}</Text>
                    </TouchableOpacity>
                    {showReactionsBar &&
                        <ReactionsBar
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

                {showReactionStatsButton && 
                    <TouchableOpacity
                        style={styles.engagementPairWrapper}
                        onPress={() => setShowReactionStats(!showReactionStats)}
                    >
                        <Feather name="bar-chart-2" size={24} color={globalStyles.colors.grey} />
                        <Text style={styles.engagementValues}>{totalReactions}</Text>
                        {showReactionStats && 
                            <ReactionStats totalReactions={totalReactions} reactions={reactions} />
                        }
                    </TouchableOpacity>
                }

                {showShareButton && <ShareButton />}
            </View>
            

            {/** Right engagement: saving bills */}
            {showSavedButton && <SaveButton isSaved={isSaved} setIsSaved={setIsSaved}/> }
        </View>
    )
}

export default EngagementToolbar