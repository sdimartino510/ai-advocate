import {useState} from "react"
import {TextInput, View} from "react-native"
import styles from "@/assets/components/SearchBar/search_bar_styles"

// TODO: Connect search bar to search page. Implement functionality for querying results.
function SearchBar(){
  const [searchQuery, setSearchQuery] = useState<String>("")
  
  const handleChange = (text : String) => {
    setSearchQuery(text)
  }

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search Bills"
        onChangeText = {handleChange}
      >
        {searchQuery}
      </TextInput>
    </View>
  )
}

export default SearchBar