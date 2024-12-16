import { Tabs } from 'expo-router';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
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
          tabBarIcon: ({ focused }) => (
            <Image source={require('../../assets/images/tab-lnf-icon.png')} style={{ width: 24, height: 24 }} />
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
