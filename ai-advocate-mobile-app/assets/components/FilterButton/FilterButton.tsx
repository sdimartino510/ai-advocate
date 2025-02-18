import {TouchableOpacity, View, Text} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import styles from "@/assets/components/FilterButton/filter_button_styles"

// TODO: Implement functionality to display bills based on selected topics (topic filters).
function FilterButton({setShowFilterPanel} : {setShowFilterPanel : Function}){
  return (
    <TouchableOpacity
      onPress={() => setShowFilterPanel(true)}
      style={{width: "20%"}}
    >
      <View style={styles.filterButtonContainer}>
        <Text style={styles.filterButtonText}>Filter </Text>
        <AntDesign name="filter" size={20} color="black" />
      </View>
    </TouchableOpacity>
  )
}

export default FilterButton