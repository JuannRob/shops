import { useAuth } from 'contexts/auth.context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Welcome, {currentUser?.displayName}</Text>
      <Text>You can start editing your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
});
