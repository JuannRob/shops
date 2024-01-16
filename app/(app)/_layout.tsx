import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';
import { ComponentProps, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { useAuth } from '../../context/auth.context';

interface TabBarIconProps {
  name: ComponentProps<typeof FontAwesome>['name'];
  color: string;
}

function TabBarIcon(props: TabBarIconProps) {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
}

export default function TabLayout() {
  const { isLoading, isAuth } = useAuth();
  const [appInitializing, setAppInitializing] = useState(true);

  useEffect(() => {
    const initializeApp = () => {
      // Marca la aplicación como inicializada después de 2 segundos (ajusta según tus necesidades)
      const timer = setTimeout(() => {
        setAppInitializing(false);
      }, 2000);

      // Limpia el temporizador al desmontar el componente
      return () => clearTimeout(timer);
    };

    initializeApp();
  }, []);

  if (isLoading || appInitializing) {
    console.log('cargando..');

    return <ActivityIndicator size="large" color="black" />;
  }

  if (!isLoading && !isAuth) {
    console.log('Estoy en login');

    return <Redirect href="/(auth)/sign-in" />;
  }

  console.log('mando tabs');

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
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="list"
        options={{
          title: 'Lista',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-ul" color={color} />,
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: 'Opciones',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
