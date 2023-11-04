import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  ProfileScreen,
  EditScreen,
  Dashboard,
  AddScreen,
  UserScreen,
  UserProfileScreen,
  NFCListScreen,
  NFCDetailScreen,
  EditProfileScreen,
} from './src/screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="EditScreen" component={EditScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
          <Stack.Screen name="UserScreen" component={UserScreen} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          <Stack.Screen name="NFCListScreen" component={NFCListScreen} />
          <Stack.Screen name="NFCDetailScreen" component={NFCDetailScreen} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
