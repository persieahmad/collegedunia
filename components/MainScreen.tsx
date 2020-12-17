import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {getCurrentWeather, getForecast} from '../api/api';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import ErrorScreen from './ErrorScreen';

const MainScreen = () => {
  const [temp, setTemp] = React.useState<number | null>(null);
  const [city, setCity] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [forecastData, setForecastData] = React.useState<string[]>([]);
  const [showErrorScreen, setShowErrorScreen] = React.useState<boolean>(false);

  function getData(data: any) {
    let days: any = [];
    let deg: any = [];
    let result: any = {};
    for (var x = 8; x < data.length; x += 8) {
      days.push(data[x].dt_txt);
      deg.push(data[x].main.temp);
    }
    days.forEach((key: any, i: number) => (result[key] = deg[i]));
    return result;
  }

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      (info) => {
        const {latitude, longitude} = info.coords;
        getCurrentWeather(latitude, longitude)
          .then((res: any) => {
            setTemp(res.main.temp);
            setCity(res.name);
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          })
          .catch((err) => {
            setShowErrorScreen(true);
            console.log(err);
          });
        getForecast(latitude, longitude)
          .then((res: any) => {
            setForecastData(getData(res.list));
          })
          .catch((err) => {
            setShowErrorScreen(true);
            console.log(err);
          });
      },
      (err) =>
        Alert.alert(
          'Alert',
          'Please restart the app and allow location permission',
        ),
    );
  }, []);

  return (
    <>
      {isLoading && !showErrorScreen && (
        <View style={styles.topView}>
          <LottieView
            source={require('../226-splashy-loader.json')}
            autoPlay
            loop
          />
        </View>
      )}
      {!isLoading && !showErrorScreen && (
        <View style={styles.topView}>
          <View style={styles.current}>
            <Text style={styles.temp}>{temp}</Text>
            <Text style={styles.city}>{city}</Text>
          </View>
          <View style={styles.inRow}>
            <View style={styles.key}>
              {Object.keys(forecastData).map((x, index) => {
                return (
                  <View key={index}>
                    <Text style={styles.text}>{moment(x).format('dddd')}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.value}>
              {Object.values(forecastData).map((y, i) => {
                return (
                  <View key={i}>
                    <Text style={styles.text}>{y}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      )}
      {showErrorScreen && <ErrorScreen />}
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    alignItems: 'center',
  },
  current: {
    marginTop: 100,
    alignItems: 'center',
  },
  temp: {
    marginTop: 10,
    fontSize: 60,
  },
  city: {
    marginTop: 20,
    fontSize: 20,
  },
  inRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  key: {display: 'flex', marginTop: 270},
  value: {display: 'flex', marginTop: 270, marginLeft: 60},
  text: {fontSize: 44, margin: 2},
});

export default MainScreen;
