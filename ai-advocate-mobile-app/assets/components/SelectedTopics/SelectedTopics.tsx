import {View, Text, TouchableOpacity} from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Ionicons from "@expo/vector-icons/Ionicons"
import {Topic} from "@/assets/types"
import globalStyles from "@/assets/global_styles"
import styles from "@/assets/components/SelectedTopics/selected_topics_styles"

function SelectedTopics({selectedTopics, setSelectedTopics, setShowFilterPanel} : {selectedTopics: Set<Topic>, setSelectedTopics : Function, setShowFilterPanel : Function}){
  return (
    <View style={styles.selectedTopicsContainer}>
      {[...selectedTopics].map((topic, index) => (
        <View
          key={index}
          style={styles.selectedTopic}
        >
          <Text style={styles.selectedTopicText}>{topic}    </Text>
          <TouchableOpacity
            onPress={() => {
              const updatedTopics = new Set(selectedTopics);
              updatedTopics.delete(topic);
              setSelectedTopics(updatedTopics)
            }}
          >
            <FontAwesome name="remove" size={12} color={globalStyles.colors.grey} />
          </TouchableOpacity>
        </View>
      ))}

      {/** Open/close filter panel to add/remove filtered topics. */}
      {selectedTopics.size >= 1 && 
        <TouchableOpacity
          onPress={() => setShowFilterPanel(true)}
        >
          <Ionicons name="ellipsis-horizontal-circle" size={24} color={globalStyles.colors.grey} />
        </TouchableOpacity>
      }
    </View>
  )
}

export default SelectedTopics