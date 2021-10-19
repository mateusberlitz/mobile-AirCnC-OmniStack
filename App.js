import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox} from 'react-native';

import Routes from './src/routes';

LogBox.ignoreLogs([
  'Unrecognized WebSocket'
]);

export default function App() {
  return <Routes/>
}
