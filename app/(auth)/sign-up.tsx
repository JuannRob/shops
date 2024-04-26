import { useAuth } from 'contexts/auth.context';
import { router } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function SignUpScreen() {
  const { signUp } = useAuth();

  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const displayNameRef = useRef<string>('');
  const phoneNumber = useRef<string>('');

  const handleRegister = async () => {
    const { response, success } = await signUp(
      emailRef.current,
      passwordRef.current,
      displayNameRef.current,
      phoneNumber.current
    );
    if (success) {
      router.replace('/');
    } else {
      Alert.alert(response.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          inputMode="text"
          placeholder="Display Name"
          placeholderTextColor="#61b7f9"
          onChangeText={(text) => {
            displayNameRef.current = text;
          }}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          inputMode="email"
          keyboardType="email-address"
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number"
          keyboardType={'phone-pad'}
          placeholderTextColor="#61b7f9"
          onChangeText={(text) => {
            phoneNumber.current = text;
          }}
        />
      </View>

      <TouchableOpacity onPress={handleRegister} style={styles.loginBtn}>
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          router.push('/(auth)/sign-in');
        }}>
        <Text style={styles.forgotAndSignUpText}>Sign-in</Text>
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
