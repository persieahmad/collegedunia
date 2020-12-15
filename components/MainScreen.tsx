import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function MainScreen() {
  return (
    <View style={styles.topView}>
      <Text>Main Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
  },
});
