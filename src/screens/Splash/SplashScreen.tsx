import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import Styles from './Styles';
import useAuth from '../../hooks/useAuth';

function SplashScreen({navigation}: any) {
  const user = useAuth();

  useEffect(() => {
    const init = async () => {
      await new Promise(resolve =>
        setTimeout(() => {
          resolve(true);
          console.log(`${user} splash screen`);
          if (!user) {
            return navigation.replace('Register');
          } else {
            return navigation.replace('Home');
          }
        }, 1000),
      );
    };
    init();
  }, []);

  return (
    <View style={Styles.indicator}>
      <ActivityIndicator color={'black'} size={'large'} />
    </View>
  );
}

export default SplashScreen;
