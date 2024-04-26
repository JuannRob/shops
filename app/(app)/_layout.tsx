import { FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';

import { useAuth } from '../../contexts/auth.context';

export default function TabLayout() {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  if (!isLoading && currentUser === null) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: { paddingVertical: 2 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'List',
          tabBarIcon: ({ color }) => <FontAwesome name="list-ul" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <FontAwesome name="user" color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
