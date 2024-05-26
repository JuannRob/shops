import { FontAwesome } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../../contexts/auth.context';
import GlobalStyles from 'constants/Styles';

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
        tabBarShowLabel: false,
        headerStyle: GlobalStyles.shadow,
      }}
      sceneContainerStyle={{ backgroundColor: 'white' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="shops"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome name="shopping-bag" color={color} size={24} />,
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
