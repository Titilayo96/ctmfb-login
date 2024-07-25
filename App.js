import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import SignInError from './SignInError';
import HomeScreen from './HomeScreen';
import LoginError from './LoginError';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen2 from './HomeScreen2';


const Stack = createStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignInError" component={SignInError} />
        <Stack.Screen name="LoginError" component={LoginError} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Home2" component={HomeScreen2} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
