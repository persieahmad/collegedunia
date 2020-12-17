import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

export default function ErrorScreen() {
  return (
    <View style={styles.topView}>
      <Text style={styles.text}>Something Went Wrong at our End</Text>
      <View>
        <Text style={styles.text}>Retry</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 200,
  },
  text: {
    fontSize: 50,
    textAlign: 'center',
    margin: 40,
  },
  box: {},
});
