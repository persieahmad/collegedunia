import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <>
      <View style={styles.topView}>
        <Text>ok</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
