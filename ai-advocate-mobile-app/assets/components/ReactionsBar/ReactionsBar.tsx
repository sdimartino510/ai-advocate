import {View, Text, TouchableOpacity} from "react-native"
import styles from "@/assets/components/ReactionsBar/reactions_bar_styles"

function ReactionsBar(
    {reactions, setReactions, selectedReaction, setSelectedReaction, setShowReactionsBar, totalReactions, setTotalReactions} :
    {
        reactions : Array<{id: number, emoji: string, numReactions: number}>
        setReactions : React.Dispatch<React.SetStateAction<Array<{id: number, emoji: string, numReactions: number}>>>
        selectedReaction : number
        setSelectedReaction : React.Dispatch<React.SetStateAction<number>>
        setShowReactionsBar : React.Dispatch<React.SetStateAction<boolean>>
        totalReactions : number
        setTotalReactions: React.Dispatch<React.SetStateAction<number>>
    }
) {
    const handleReactionPress = (index: number) => {
        if (selectedReaction !== -1){
            const updatedReactions = reactions
            updatedReactions[selectedReaction].numReactions -= 1
            setReactions(updatedReactions)
            setTotalReactions(totalReactions => totalReactions -1)
        }

        if(selectedReaction === index){
            setSelectedReaction(-1)
        }

        else {
            setSelectedReaction(index)
            const updatedReactions = reactions
            updatedReactions[index].numReactions += 1
            setReactions(updatedReactions)
            setTotalReactions(totalReactions => totalReactions + 1)
        }
        setShowReactionsBar(false)
    }
    return (
        <View style={styles.reactionsContainer}>
        {reactions.map((reaction, index) => (
            <View key={index}>
                <TouchableOpacity onPress={() => {handleReactionPress(index)}}>
                    <Text style={styles.emoji}>{reaction.emoji}</Text>
                </TouchableOpacity>
            </View>
        ))}
        </View>
    )
}

export default ReactionsBar