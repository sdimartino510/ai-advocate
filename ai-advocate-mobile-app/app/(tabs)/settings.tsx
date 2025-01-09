import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Octicons from '@expo/vector-icons/Octicons';

const Stack = createNativeStackNavigator();

// Sample activity data
const activities = [
  { id: 1, emoji: '👍', billNumber: '1234', date: '01/09/2025' },
  { id: 2, emoji: '❤️', billNumber: '1235', date: '01/08/2025' },
  { id: 3, emoji: '😊', billNumber: '1236', date: '01/07/2025' },
  { id: 4, emoji: '👏', billNumber: '1237', date: '01/06/2025' },
  { id: 5, emoji: '🎉', billNumber: '1238', date: '01/05/2025' },
].sort((a, b) => new Date(b.date) - new Date(a.date));

// Activity Log Screen
function ActivityLogScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Settings</Text>
      </View>
    <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('TermsAndConditions')}>
      <Text style={styles.helpText}>Activity Log</Text>
      <Octicons name="pencil" size={24} color="black" />
    </TouchableOpacity>

      <View style={styles.contentContainer}>
        {activities.map((activity) => (
          <View key={activity.id} style={styles.activityItem}>
            <Text style={styles.activityText}>
              You reacted {activity.emoji} to bill {activity.billNumber}
            </Text>
            <Text style={styles.activityDate}>{activity.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Main Settings Screen Component
function SettingsMainScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(3);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages = [
    { label: 'English', value: 'en', flag: '🇺🇸' },
    { label: 'Español', value: 'es', flag: '🇪🇸' },
    { label: 'Français', value: 'fr', flag: '🇫🇷' },
    { label: '中文', value: 'zh', flag: '🇨🇳' },
    { label: '日本語', value: 'ja', flag: '🇯🇵' },
    { label: 'Deutsch', value: 'de', flag: '🇩🇪' },
  ];

  const renderLanguageItem = (item) => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.flagText}>{item.flag}</Text>
        <Text style={styles.languageText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Settings</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.fontLabel}>Dark Mode</Text>
        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#f4f3f4", true: "#344E63" }}
          thumbColor={isEnabled ? "#ffffff" : "#344E63"}
        />
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.fontLabel}>Text Size</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={3}
            step={1}
            value={fontSize}
            onValueChange={setFontSize}
            minimumTrackTintColor="#007AFF"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="#d3d3d3"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.helpButton} onPress={() => console.log('Help Center Pressed')}>
        <Text style={styles.helpText}>Help Center</Text>
        <Icon name="help-outline" size={33} color="#344E63" style={styles.helpIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={styles.helpText}>Privacy Policy</Text>
        <Ionicons name="shield-checkmark-outline" size={33} color="#344E63" style={styles.helpIcon} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('TermsAndConditions')}>
        <Text style={styles.helpText}>Terms & Conditions</Text>
        <Ionicons name="document-text-outline" size={33} color="#344E63" style={styles.helpIcon} />
      </TouchableOpacity>

      <View style={styles.languageContainer}>
        <Text style={styles.helpText}>Language</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={languages}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Language"
          value={selectedLanguage}
          onChange={item => setSelectedLanguage(item.value)}
          renderItem={renderLanguageItem}
        />
      </View>

    <TouchableOpacity style={styles.activityLogButton} onPress={() => console.log('Help Center Pressed')} disabled={true}>
      <Text style={styles.helpText}>Activity Log</Text>
    </TouchableOpacity>

      <View style={styles.activitySection}>
        <View style={styles.activityList}>
          {activities.slice(0, 4).map((activity) => (
            <View key={activity.id} style={styles.activityItem}>
              <Text style={styles.activityText}>
                You reacted {activity.emoji} to bill {activity.billNumber}
              </Text>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate('ActivityLog')}
        >
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Privacy Policy Screen
function PrivacyPolicyScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Privacy Policy</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.policyText}>
        We value your privacy and are committed to protecting your personal data. This privacy policy will inform you how we handle your personal data when you visit our website, your privacy rights, and how the law protects you.{"\n"}
        </Text>

        <Text style={[styles.policyText, {fontFamily: 'Montserrat_700Bold' }]} >
        Information We Collect
        </Text>

        <Text style={styles.policyText}>
          We may collect, use, store, and transfer different kinds of personal data about you including:
        </Text>

        <Text style={styles.policyText}>
          • Identity Data: first name, last name, username, or similar identifier.{"\n"}
          • Contact Data: email address and telephone numbers.{"\n"}
          • Technical Data: internet protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.
        </Text>
      </View>
    </ScrollView>
  );
}

// Terms and Conditions Screen
function TermsAndConditionsScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Terms and Conditions</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.policyText}>
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use this website if you do not agree to all of the terms and conditions stated on this page.{"\n"}
        </Text>

        <Text style={[styles.policyText, {fontFamily: 'Montserrat_700Bold' }]} >
        License
        </Text>

        <Text style={styles.policyText}>
          •	Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas. We do not filter, edit, publish, or review Comments prior to their presence on the website.{"\n"}
          •	Comments do not reflect the views and opinions of our company, its agents, or affiliates. Comments reflect the views and opinions of the person who posts their views and opinions.{"\n"}
          •	To the extent permitted by applicable laws, we shall not be liable for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
        </Text>
      </View>
    </ScrollView>
  );
}

// Main Settings Component with Navigation
export default function Settings() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain" component={SettingsMainScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="ActivityLog" component={ActivityLogScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  backButton: {
    padding: 5,
  },
  navTitle: {
    fontSize: 17,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginRight: 30,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  policyText: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    lineHeight: 24,
    color: '#333333',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  fontLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  slider: {
    width: 156,
    height: 40,
    marginLeft: 125,
  },
  helpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0F2FF',
    paddingHorizontal: 10,
    borderRadius: 7,
    marginTop: 20,
    height: 40,
  },
  helpText: {
    fontSize: 16,
    fontWeight: '600',
  },
  helpIcon: {
    marginLeft: 10,
    width: 33,
    height: 33,
  },
  activityLogButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E0F2FF',
    paddingHorizontal: 10,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginTop: 20,
    height: 40,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    borderRadius: 7,
    marginTop: 20,
    height: 40,
  },
  dropdown: {
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  flagText: {
    fontSize: 20,
    marginRight: 10,
  },
  languageText: {
    fontSize: 14,
    color: '#000000',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#666666',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000000',
  },
  activitySection: {
    backgroundColor: '#ffffff',
    padding: 10,
  },
  activityList: {
    marginBottom: 10,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 0,
    borderBottomColor: '#D1E9FF',
  },
    activityItemBordered: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
      borderBottomWidth: 0,
      borderBottomColor: '#D1E9FF',
    },
  activityText: {
    fontSize: 14,
    color: '#333333',
  },
  activityDate: {
    fontSize: 14,
    color: '#666666',
  },
seeMoreButton: {
  alignSelf: 'flex-end',
  paddingVertical: 5,
  paddingHorizontal: 10,
  backgroundColor: '#E0F2FF',
  borderRadius: 7,
  marginTop: 20,
  height: 40,
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: 50,
},

seeMoreText: {
  color: '#000000',
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
}

});