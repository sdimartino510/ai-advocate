import {useState} from "react"
import {Text, View, TouchableOpacity} from "react-native"
import {Status} from "@/assets/types"
import globalStyles from "@/assets/global_styles"
import styles from "@/assets/components/StatusBadge/status_badge_styles"

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

export default StatusBadge