import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'expo-image';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/styles/global_styles';

export default function TabLayout() {
  return (
    <Tabs
      /** Text below navigation icons. */
      screenOptions={{
        tabBarActiveTintColor: globalStyles.colors.navActive,
        tabBarInactiveTintColor: globalStyles.colors.navTextInactive,
        tabBarLabelStyle: globalStyles.fonts.navigation,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'SEARCH',
          tabBarIcon: ({ focused }) => (
            <Feather name="search" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
        }}
      />
      <Tabs.Screen
        name="lnf"
        options={{
          title: 'LNF',
          tabBarIcon: ({ focused }) => (
            focused ? 
              <Image source={require('../../assets/images/tab_lnf_icon_active.png')} style={{ width: 24, height: 24 }} />
              :
              <Image source={require('../../assets/images/tab_lnf_icon_inactive.png')} style={{ width: 24, height: 24 }} />            
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'SAVED',
          tabBarIcon: ({ focused }) => (
            <Feather name="bookmark" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'SETTINGS',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings-outline" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
        }}
      />
    </Tabs>
  );
}
