
import { Tabs } from 'expo-router'
import { Ionicons, } from '@expo/vector-icons';
import React from 'react';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "green",
      tabBarStyle:{ 
        backgroundColor: "#1e293b",
        borderTopWidth: 1,
        borderTopColor: "yellow",
        height: 90,
        paddingTop: 10,
        paddingBottom: 30,
       },
       tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "600",
        color: "white",
      },
      headerShown: false,

    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

export default TabsLayout