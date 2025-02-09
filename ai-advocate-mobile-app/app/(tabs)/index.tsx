import { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import Bill from "../../assets/components/Bill/Bill"
import globalStyles from "@/assets/styles/global_styles"
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// TODO: Connect search bar to search page. Implement functionality for querying results.
function SearchBar(){
  const [searchQuery, setSearchQuery] = useState<String>("")
  
  const handleChange = (text : String) => {
    setSearchQuery(text)
  }

  return (
      <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Bills"
            onChangeText = {handleChange}
          >
            {searchQuery}
          </TextInput>
      </View>
  )
}

// TODO: Implement filter by topics functionality.
function FilterButton(){
  return (
    <TouchableOpacity
      onPress={() => console.log("Filter button pressed")}  // TODO: Placeholder.
      style={{width: "20%"}}
    >
      <View style={styles.filterButtonContainer}>
        <Text style={styles.filterButtonText}>Filter </Text>
        <AntDesign name="filter" size={20} color="black" />
      </View>
    </TouchableOpacity>
  )
}

// TODO: Implement sort by time or panel reviewed functionality.
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

function SelectedTopics(){
  // TODO: Connect selected topics to filter button functionality: add, update, remove topics.
  const topics = ["Violence", "Education", "Housing", "Protection", "Victim", "Gun Control", "Support", "Gender", "Harrassment"]
  const [selectedTopics, setSelectedTopics] = useState<Array<String>>(["Violence", "Education"])

  return (
    <View style={styles.selectedTopicsContainer}>
      {selectedTopics.map((topic, index) => (
        <View
          key={index}
          style={styles.selectedTopic}
        >
          <Text style={styles.selectedTopicText}>{topic}    </Text>
          <TouchableOpacity
            onPress={() => console.log("Remove topic")}  // TODO: Placeholder.
          >
            <FontAwesome name="remove" size={12} color={globalStyles.colors.grey} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  )
}

export default function Index() {
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
        <View style = {styles.searchFilterContainer}>
          <SearchBar />
          <FilterButton />
        </View>
        <SortSelection />
        <SelectedTopics />
        
        {/* TODO: Dynamically update this number. */}
        <Text style={styles.searchResultsStat}>Search Results: {0}</Text>
        
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
  searchFilterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    gap: 16,
  },
  searchBarContainer:{
    width: "75%",
  },
  searchBar: {
    padding: 8,
    paddingLeft: 32,
    fontSize: 17,
    lineHeight: 22,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",

    fontFamily: "Montserrat_400Regular",
    backgroundColor: globalStyles.colors.searchBarGrey,
    color: globalStyles.colors.searchBarText,
  },
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
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    color: globalStyles.colors.sortOptionText,
    borderColor: globalStyles.colors.sortOptionBorder,
    backgroundColor: globalStyles.colors.white,
  },
  selectedTopicsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
})