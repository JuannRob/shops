import { useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from 'contexts/auth.context';
import { formatAuthError } from 'services/auth.service';
import { AuthError } from 'firebase/auth';

import GlobalStyles from 'constants/Styles';

import CoolButton from 'components/CoolButton';
import CoolInput from 'components/CoolInput';

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const { response, success } = await signUp(email, password, name);
    if (success) {
      router.replace('/');
    } else {
      Alert.alert(formatAuthError(response as AuthError));
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 40 }}>Register now</Text>
      <CoolInput
        setValue={setName}
        inputProps={{
          placeholder: 'Display name',
          inputMode: 'text',
          autoComplete: 'name',
          autoCapitalize: 'words',
          returnKeyType: 'next',
        }}
      />
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
          autoComplete: 'new-password',
          autoCapitalize: 'none',
          secureTextEntry: true,
          returnKeyType: 'next',
        }}
      />
      <CoolButton onPressFn={handleRegister}>REGISTER</CoolButton>
      <TouchableOpacity
        onPress={() => {
          router.push('/(auth)/sign-in');
        }}>
        <Text style={GlobalStyles.defaultText}>Sign-in</Text>
      </TouchableOpacity>
    </View>
  );
}
