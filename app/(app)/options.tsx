import { router } from 'expo-router';
import { useAuth } from 'hooks/useAuth';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Options() {
  const { user, signOutContext } = useAuth();

  const handleLogout = async () => {
    await signOutContext();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text>{user?.uid}</Text>
      <Text>{user?.displayName}</Text>
      <Text>{user?.email}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGOUT</Text>
      </TouchableOpacity>
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
  productCard: {},
  errorMsgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#eff8ff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#182c53',
  },
});
