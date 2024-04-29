import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '../../contexts/auth.context';
import { defaultUserAvatar } from 'constants/Media';

export default function Options() {
  const { currentUser, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: currentUser?.photoURL || defaultUserAvatar }}
        style={styles.avatar}
        resizeMode="contain"
      />
      <Text>{currentUser?.displayName}</Text>
      <Text>{currentUser?.email}</Text>
      <Text>{currentUser?.phoneNumber}</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  avatar: {
    height: 100,
    width: 100,
    margin: 5,
  },
  logoutBtn: {
    backgroundColor: '#eff8ff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginTop: 10,
  },
  logoutText: {
    color: '#182c53',
  },
});
