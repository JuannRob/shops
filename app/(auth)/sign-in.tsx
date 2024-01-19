import { router } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

import { useAuth } from '../../context/auth.context';

export default function SignInScreen() {
  const { signIn } = useAuth();

  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');

  const handleLogin = async () => {
    const { response, success } = await signIn(emailRef.current, passwordRef.current);
    if (success) {
      router.replace('/');
    } else {
      Alert.alert(response.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Login Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          inputMode="email"
          placeholder="Email"
          placeholderTextColor="#61b7f9"
          onChangeText={(text) => {
            emailRef.current = text;
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#61b7f9"
          onChangeText={(text) => {
            passwordRef.current = text;
          }}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push('/(auth)/sign-up');
        }}>
        <Text style={styles.forgotAndSignUpText}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#94d2fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#182c53',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#c0e2fd',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#182c53',
  },
  forgotAndSignUpText: {
    color: '#eff8ff',
    fontSize: 14,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#eff8ff',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#182c53',
  },
});
