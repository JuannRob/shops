import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from 'constants/Colors';
import GlobalStyles from 'constants/Styles';

interface Props {
  children: string;
  onPressFn: () => any;
}

const CoolButton = ({ children, onPressFn }: Props) => {
  return (
    <Pressable onPress={onPressFn}>
      {({ hovered, pressed }) => (
        <View
          style={[
            styles.buttonInner,
            (hovered || pressed) && { backgroundColor: Colors.light.tint },
          ]}>
          <Text
            style={[
              GlobalStyles.defaultText,
              {
                color: hovered || pressed ? 'white' : 'black',
              },
            ]}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CoolButton;

const styles = StyleSheet.create({
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '80%',
    height: 50,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
