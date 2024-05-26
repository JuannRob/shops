import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { useAuth } from '../../contexts/auth.context';

import { defaultUserAvatar } from 'constants/Media';
import GlobalStyles from 'constants/Styles';

import CoolButton from 'components/CoolButton';

export default function Options() {
  const { currentUser, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <View style={GlobalStyles.container}>
      <Image
        source={{ uri: currentUser!.photoURL || defaultUserAvatar }}
        style={{ height: 100, width: 100, margin: 5 }}
        resizeMode="contain"
      />
      <Text style={GlobalStyles.title}>{currentUser!.displayName}</Text>
      <Text>{currentUser!.email}</Text>
      <Text>{currentUser?.phoneNumber}</Text>
      <CoolButton onPressFn={handleLogout}>LOGOUT</CoolButton>
    </View>
  );
}
