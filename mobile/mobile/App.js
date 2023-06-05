import ImageUploader from './components/ImageUploader';
import Facts from './components/Facts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header.js';
import About from './components/About';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Header" component={About} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
