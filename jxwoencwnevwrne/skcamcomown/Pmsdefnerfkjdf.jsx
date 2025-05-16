import React, { useEffect } from 'react';
import { Animated, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pmsdefnerfkjdf = () => {
    const navigation = useNavigation();
    const progress = new Animated.Value(0);

    useEffect(() => {
        Animated.timing(progress, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate('QuestionsScreen');
        });
      }, []);
    
  return (
    <ImageBackground source={require('../alkmmdwmwem/loader.png')} style={{flex: 1}} />
  );
};

export default Pmsdefnerfkjdf;