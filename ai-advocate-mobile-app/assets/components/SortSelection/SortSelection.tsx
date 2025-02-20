import {useState} from "react"
import {View, Text, TouchableOpacity} from "react-native"
import globalStyles from "@/assets/global_styles"
import styles from "@/assets/components/SortSelection/sort_selection_styles"

// TODO: Implement functionality to display bills in order of time or only display verified (panel-reviewed) bills.
function SortSelection(){
    const options = ["All", "Recent", "Trending", "Panel"]
    const [selectedOption, setSelectedOption] = useState<String>("All")
  
    const handleOptionSelection = (option : String) => {
      setSelectedOption(option)
    }
  
    return (
      <View style={styles.sortSelectionContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionSelection(option)}
          >
            <Text
              style={[
                styles.sortOption, 
                selectedOption === option ? { backgroundColor: globalStyles.colors.blue1, color: globalStyles.colors.black } : null
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
}

export default SortSelection