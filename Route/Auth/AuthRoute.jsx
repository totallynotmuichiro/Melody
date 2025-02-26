import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';

const Stack = createNativeStackNavigator();

export const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignInScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);