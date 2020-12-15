import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getCityName} from './api/getCityName';

const App = () => {
  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      const {latitude, longitude} = info.coords;
      getCityName(latitude, longitude).then((res) => console.log(res));
    });
  }, []);
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
