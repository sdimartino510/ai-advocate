import React from 'react';
import { Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import globalStyles from '../../assets/global_styles';

export default function TabLayout() {
  return (
    <Tabs
      /** Navigation tabs on the bottom. */
      screenOptions={{
        tabBarActiveTintColor: globalStyles.colors.navActive,
        tabBarInactiveTintColor: globalStyles.colors.navTextInactive,
        tabBarLabelStyle: globalStyles.fonts.navigation,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Montserrat_600SemiBold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <Feather name="home" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
          headerTitle: () => (
            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>AI</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 20 }}> advocate</Text>
              </View>
            </View>
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
          headerTitle: () => (
            <Text style={{ fontFamily: 'Montserrat_600SemiBold', fontSize: 20 }}>Search Bills</Text>
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
          headerTitle: () => (
            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
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
          title: 'SAVED',
          tabBarIcon: ({ focused }) => (
            <Feather name="bookmark" size={24} color={focused ? globalStyles.colors.navActive : globalStyles.colors.black} />
          ),
          headerTitle: () => (
            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>AI</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 20 }}> advocate</Text>
              </View>
            </View>
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
          headerTitle: () => (
            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>AI</Text>
                <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 20 }}> advocate</Text>
              </View>
            </View>
          ),
        }}
      />

      <Tabs.Screen name="details"
        options={{
            href: null,
            headerTitle: () => (
              <View style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                  <Text style={{ fontFamily: 'Montserrat_700Bold', fontSize: 20 }}>AI</Text>
                  <Text style={{ fontFamily: 'Montserrat_400Regular', fontSize: 20 }}> advocate</Text>
                </View>
              </View>
            ),
        }}
      />
    </Tabs>
  );
}