import GlobalStyles from 'constants/Styles';
import { useAuth } from 'contexts/auth.context';
import { Text, View } from 'react-native';

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Welcome, {currentUser!.displayName}</Text>
      <Text style={GlobalStyles.defaultText}>You can start working on your app!</Text>
    </View>
  );
}
