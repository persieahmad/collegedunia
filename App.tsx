import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getCurrentWeather, getForecast} from './api/api';
import LottieView from 'lottie-react-native';
import moment from 'moment';

const App = () => {
  const [temp, setTemp] = React.useState<number | null>(null);
  const [city, setCity] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [forecastData, setForecastData] = React.useState<string[]>([]);

  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      const {latitude, longitude} = info.coords;
      getCurrentWeather(latitude, longitude)
        .then((res: any) => {
          setTemp(res.main.temp);
          setCity(res.name);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((err) => console.log(err));
      getForecast(latitude, longitude).then((res: any) => {
        setForecastData(res.list);
        console.log(res.list);
      });
    });
  }, []);
  return (
    <>
      {isLoading && (
        <View style={styles.topView}>
          <LottieView
            source={require('./226-splashy-loader.json')}
            autoPlay
            loop
          />
        </View>
      )}
      {!isLoading && (
        <View style={styles.topView}>
          <View style={styles.current}>
            <Text style={styles.temp}>{temp}</Text>
            <Text style={styles.city}>{city}</Text>
          </View>
          {forecastData.map((data: any, index: number) => {
            return (
              <View key={index}>
                <Text>{moment(data.dt_txt).format('dddd')}</Text>
                <Text>{data.main.temp}</Text>
              </View>
            );
          })}
        </View>
      )}
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
});

export default App;
