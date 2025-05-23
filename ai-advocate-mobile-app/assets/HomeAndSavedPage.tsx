import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Animated, ScrollView } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Bill from "@/assets/components/Bill/Bill"
import SearchBar from "@/assets/components/SearchBar/SearchBar"
import FilterButton from "@/assets/components/FilterButton/FilterButton"
import FilterPanel from "@/assets/components/FilterPanel/FilterPanel"
import SortSelection from "@/assets/components/SortSelection/SortSelection"
import SelectedTopics from "@/assets/components/SelectedTopics/SelectedTopics"
import { Topic } from "@/assets/types"
import globalStyles from "@/assets/global_styles"
import sample_data from "@/assets/sample_data"

// TODO: Only display saved bills when the pageName is "Saved". UseEffect to fetch bills (and filter by saved status) from database.
export default function HomeAndSavedPage({pageName} : {pageName : String}) {
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
            <View style = {styles.searchBarFilterButtonContainer}>
                <SearchBar pageName={pageName}/>
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
            <Text style={styles.searchResultsStat}>{pageName === "Home" ? "Search Results:" : "Saved Bills:"} {0}</Text>
            
            {/** TODO: Make algorithm to make topics for each bill dynamically determined. */}
            <ScrollView style={{width: "100%"}}>
                {sample_data.map((bill, index) => (
                    <Bill
                        key={index}
                        billTitle={bill.title}
                        billId={bill.id}
                        billStatus={bill.status}
                        billDescription={bill.description}
                        billTopics={bill.topics}
                        numReactions={bill.numReactions}
                    />
                ))}
            </ScrollView>
        </View>

        {/** TODO: Loading state. */}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  searchBarFilterButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    width: "100%",
    gap: 16,
  },
  searchResultsStat: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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