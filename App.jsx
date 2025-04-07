import React, { useEffect } from 'react';
import { Animated, ImageBackground } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuestionsScreen from './src/screens/QuestionsScreen';
import AddQuestionScreen from './src/screens/AddQuestionScreen';
import ReadQuestionScreen from './src/screens/ReadQuestionScreen';
import FavoriteQuestionsScreen from './src/screens/FavoriteQuestionsScreen';
import CompareScreen from './src/screens/CompareScreen';
import RateQuestionScreen from './src/screens/RateQuestionScreen';
import GraphsScreen from './src/screens/GraphsScreen';

enableScreens();

const Stack = createStackNavigator();

const PreviewScreen = ({ navigation }) => {
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
    <ImageBackground source={require('./src/assets/loader.png')} style={{flex: 1}} />
  );
};

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"PreviewScreen" }>    
              <Stack.Screen 
                    name="PreviewScreen" 
                    component={PreviewScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="QuestionsScreen" 
                    component={QuestionsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="AddQuestionScreen" 
                    component={AddQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="ReadQuestionScreen" 
                    component={ReadQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="FavoriteQuestionsScreen" 
                    component={FavoriteQuestionsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="CompareScreen" 
                    component={CompareScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RateQuestionScreen" 
                    component={RateQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="GraphsScreen" 
                    component={GraphsScreen} 
                    options={{ headerShown: false }} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
