import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import BlueLogo from '../../assets/images/Blue_Logo.png';
import DefaultLogo from '../../assets/images/tab-lnf-icon.png';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Montserrat_600SemiBold',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <Feather name="search" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />

      <Tabs.Screen
        name="lnf"
        options={{
          title: 'LNF',
          tabBarLabel: 'LNF',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? BlueLogo : DefaultLogo}
              style={{ width: 24, height: 24 }}
            />
          ),
          headerTitle: () => (
            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>AI</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 20 }}> advocate</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <Feather name="bookmark" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Feather name="settings" size={24} color={focused ? "blue" : "black"} />
          ),
        }}
      />
    </Tabs>
  );
}