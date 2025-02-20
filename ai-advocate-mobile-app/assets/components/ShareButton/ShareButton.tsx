import { Share, Alert, TouchableOpacity} from 'react-native'
import { Feather } from '@expo/vector-icons'
import globalStyles from '@/assets/global_styles'

export default function ShareButton () {
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `BILL TITLE. Summary of bill- download AI advocate`,
            });

            if (result.action === Share.sharedAction) {
                if(result.activityType){
                    console.log(`Shared with activity: ${result.activityType}`)
                } else {
                    console.log('Shared successfully!')
                }
            } else if (result.action == Share.dismissedAction){
                console.log('Share dialog dismissed')
            }
        } catch (error){
            Alert.alert('Error', `Failed to share: ${error.message}`)
        }
    }
    
    return(
        <TouchableOpacity onPress={handleShare}>
            <Feather name="share-2" size={24} color={globalStyles.colors.grey} />
        </TouchableOpacity>
    )
}