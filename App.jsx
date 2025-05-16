import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DecisionScrnPath from './jxwoencwnevwrne/DecisionConstantsPath/wekdkwe';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"Pmsdefnerfkjdf" }>    
              <Stack.Screen 
                    name="Pmsdefnerfkjdf" 
                    component={DecisionScrnPath.Pmsdefnerfkjdf} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="QuestionsScreen" 
                    component={DecisionScrnPath.QuestionsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="AddQuestionScreen" 
                    component={DecisionScrnPath.AddQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="ReadQuestionScreen" 
                    component={DecisionScrnPath.ReadQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="FavoriteQuestionsScreen" 
                    component={DecisionScrnPath.FavoriteQuestionsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="CompareScreen" 
                    component={DecisionScrnPath.CompareScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RateQuestionScreen" 
                    component={DecisionScrnPath.RateQuestionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="GraphsScreen" 
                    component={DecisionScrnPath.GraphsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="ProsConsScreen" 
                    component={DecisionScrnPath.ProsConsScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RateOptionScreen" 
                    component={DecisionScrnPath.RateOptionScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RateResultScreen" 
                    component={DecisionScrnPath.RateResultScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="DecisionQuizScreen" 
                    component={DecisionScrnPath.DecisionQuizScreen} 
                    options={{ headerShown: false }} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
