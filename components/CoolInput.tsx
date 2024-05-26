import { StyleSheet, TextInputProps, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import Colors from 'constants/Colors';
import { TextInput } from 'react-native-gesture-handler';

export interface ICoolInputProps {
  inputProps: TextInputProps;
  setValue: Dispatch<SetStateAction<string>>;
}

const CoolInput = ({ inputProps, setValue }: ICoolInputProps) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        style={{ height: 50, color: Colors.light.text }}
        inputMode={inputProps.inputMode}
        autoComplete={inputProps.autoComplete}
        placeholder={inputProps.placeholder}
        placeholderTextColor={Colors.light.text}
        onChangeText={(text) => setValue(text)}
        autoCapitalize={inputProps.autoCapitalize}
        keyboardType={inputProps.keyboardType}
        secureTextEntry={inputProps.secureTextEntry}
        returnKeyType={inputProps.returnKeyType}
      />
    </View>
  );
};

export default CoolInput;

const styles = StyleSheet.create({
  inputView: {
    width: '80%',
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.tint,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
});
