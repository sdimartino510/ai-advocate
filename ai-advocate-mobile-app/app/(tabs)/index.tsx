import { useEffect, useState } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import AntDesign from "@expo/vector-icons/AntDesign"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import Ionicons from "@expo/vector-icons/Ionicons"
import Bill from "../../assets/components/Bill/Bill"
import SearchBar from "@/assets/components/SearchBar/SearchBar"
import FilterPanel from "@/assets/components/FilterPanel/FilterPanel"
import { Topic } from "@/assets/types"
import globalStyles from "@/assets/global_styles"

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

export default function Index() {
  const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set([]))
  const [showFilterPanel, setShowFilterPanel] = useState<Boolean>(false)

  const slideAnim = new Animated.Value(300); // For filter panel. Initial position of panel is off-screen to the right.

  useEffect(() => {
    if(showFilterPanel) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450, // Duration of the fade-in
        useNativeDriver: true,
      }).start();
    }
    // TODO: Fix this animation. It's not working. Opening the panel works though.
    else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 450, // Duration of the fade-out
        useNativeDriver: true,
      }).start();
    }
  }, [showFilterPanel])

  return (
    <LinearGradient
        colors={[globalStyles.colors.white, globalStyles.colors.blue1]}
        style={{ flex: 1}}
      >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View style = {styles.searchBarContainer}>
          <SearchBar />
          <FilterButton setShowFilterPanel={setShowFilterPanel}/>
        </View>
        <SortSelection />
        <SelectedTopics
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
          setShowFilterPanel={setShowFilterPanel}
        />

        <Animated.View
          style={[
            styles.filterPanelContainer,
            {
              transform: [{ translateX: slideAnim }], // Apply the sliding animation
            },
          ]}
        >
          <FilterPanel
            selectedTopics={selectedTopics}
            setSelectedTopics={setSelectedTopics}
            setShowFilterPanel={setShowFilterPanel}
          />
        </Animated.View>
        
        {/* TODO: Dynamically update this number. */}
        <Text style={styles.searchResultsStat}>Search Results: {0}</Text>
        
        {/** TODO: Scroll View for the portion of screen displaying the bills. */}
        <Bill
          title="HUMAN TRAFFICKING: VICTIM RIGHTS"
          id="CA SB376"
          status="Introduced"
          description="This bill gives trafficking survivors the right to have a support person and an advocate with them during interviews with police or lawyers."
          topics={["trafficking", "advocates", "rights"]}  // TODO: Make algorithm to make topics dynamically determined.
          numReactions={143}
          />
      </View>

      {/** TODO: Loading state. */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    gap: 16,
  },
  // Filter Button Styles
  filterButtonContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: globalStyles.colors.filterButtonBorder,
    backgroundColor: globalStyles.colors.blue1,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  filterButtonText: {
    fontSize: 17,
    fontFamily: "Montserrat_800Bold",
    textAlign: "center",
  },
  // Sort Selection Styles
  sortSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  sortOption: {
    textAlign: "center",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: globalStyles.colors.sortOptionBorder,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: globalStyles.colors.sortOptionText,
    backgroundColor: globalStyles.colors.white,
  },
  // Selected Topics Styles
  selectedTopicsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  selectedTopic: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: globalStyles.colors.sortOptionBorder,
    color: globalStyles.colors.sortOptionText,
    backgroundColor: globalStyles.colors.white,
  },
  selectedTopicText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Montserrat_400Regular",
    color: globalStyles.colors.black,
  },
  searchResultsStat: {
    paddingHorizontal: 16,
    justifyContent: "center",
    alignSelf: "flex-end",
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: globalStyles.colors.sortOptionText,
  },
  filterPanelContainer: {
    position: "absolute",
    top: 60,
    right: 0,
    zIndex: 1,
    width: "64%",
    
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: globalStyles.colors.lightBlue,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
})