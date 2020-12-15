import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function ErrorScreen() {
  return (
    <View style={styles.topView}>
      <Text>Something Went Wrong at our End</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
  },
});
