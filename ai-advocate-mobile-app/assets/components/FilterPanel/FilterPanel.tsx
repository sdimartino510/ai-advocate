import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Topic } from '@/assets/types'
import styles from '@/assets/components/FilterPanel/FilterPanel_styles'

export default function FilterPanel({selectedTopics, setSelectedTopics, setShowFilterPanel} : {selectedTopics: Set<Topic>, setSelectedTopics : Function, setShowFilterPanel : Function}){
  const topics : Array<Topic> = ["Violence", "Education", "Housing", "Protection", "Victim", "Gun Control", "Support", "Gender", "Harrassment"]

  return (
    <View>
      <Text style={styles.filterPanelTitle}>Filter By Topics</Text>
      <Text style={styles.filterPanelDescription}>Click to add/remove topics.</Text>
      <View style={styles.filterPanelOptionsContainer}>
        {topics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterPanelOptionButton}
            onPress={() => {
              const updatedTopics = new Set(selectedTopics)
              updatedTopics.add(topic)
              setSelectedTopics(updatedTopics)
            }}
          >
            <Text style={styles.filterPanelOptionText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.closeFilterPanelButton}
        onPress={() => setShowFilterPanel(false)}
      >
        <Image source={require('@/assets/images/close_arrow.png')} style={{ width: 40, height: 40 }} />
      </TouchableOpacity>
    </View>
  )
}