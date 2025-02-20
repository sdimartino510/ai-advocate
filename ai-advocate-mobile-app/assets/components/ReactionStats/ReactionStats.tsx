import { View, Text } from "react-native"
import styles from "@/assets/components/ReactionStats/reaction_stats_styles"

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

export default ReactionStats