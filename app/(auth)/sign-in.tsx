import { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

import { useAuth } from '../../contexts/auth.context';
import { AuthError } from 'firebase/auth';
import { formatAuthError } from 'services/auth.service';

import CoolButton from 'components/CoolButton';
import CoolInput from 'components/CoolInput';
import GlobalStyles from 'constants/Styles';
import Colors from '../../constants/Colors';

export default function SignInScreen() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { response, success } = await signIn(email, password);
    if (success) {
      router.replace('/');
    } else {
      Alert.alert(formatAuthError(response as AuthError));
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 40 }}> Sign in </Text>
      <CoolInput
        setValue={setEmail}
        inputProps={{
          placeholder: 'Email',
          inputMode: 'email',
          keyboardType: 'email-address',
          autoComplete: 'email',
          autoCapitalize: 'none',
          returnKeyType: 'next',
        }}
      />
      <CoolInput
        setValue={setPassword}
        inputProps={{
          placeholder: 'Password',
          inputMode: 'text',
          keyboardType: 'default',
          autoComplete: 'current-password',
          autoCapitalize: 'none',
          secureTextEntry: true,
          returnKeyType: 'done',
        }}
      />
      <CoolButton onPressFn={handleLogin}>LOGIN</CoolButton>
      <TouchableOpacity
        onPress={() => {
          router.push('/(auth)/sign-up');
        }}>
        <Text style={[GlobalStyles.defaultText, { color: Colors.light.text }]}>Sign-up</Text>
      </TouchableOpacity>
    </View>
  );
}
