import React from 'react';
import {createStackNavigator} from 'react-navigation';
import firebase from 'react-native-firebase';
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBKJhN9VYckNjA5_c9QyLzj33G_9nITN0s",
    authDomain: "innerhour-6c15f.firebaseapp.com",
    databaseURL: "https://innerhour-6c15f.firebaseio.com",
    projectId: "innerhour-6c15f",
    storageBucket: "innerhour-6c15f.appspot.com",
    messagingSenderId: "173181404554"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const Root = createStackNavigator (
    {
        Home: HomeScreen,
        addTask: AddTaskScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default Root;

