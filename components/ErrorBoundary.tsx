import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ErrorBoundaryProps } from 'expo-router';
import GlobalStyles from 'constants/Styles';

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <View style={styles.container}>
      <Text role="heading" aria-level={1} style={GlobalStyles.title}>
        Something went wrong
      </Text>
      <Text style={[GlobalStyles.defaultText, { marginBottom: 12, textAlign: 'center' }]}>
        {props.error.message}
      </Text>
      <Pressable onPress={props.retry}>
        {({ hovered, pressed }) => (
          <View style={[styles.buttonInner, (hovered || pressed) && { backgroundColor: 'black' }]}>
            <Text
              style={[
                GlobalStyles.defaultText,
                {
                  color: hovered || pressed ? 'white' : 'black',
                },
              ]}>
              Retry
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonInner: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: 'black',
    borderWidth: 2,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
