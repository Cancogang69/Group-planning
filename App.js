import React,  { useState, useEffect, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import LoginScreen from './src/components/login_screen.js';
import SignUpScreen from './src/components/login_screen2.js';
import HelloWorldScreen from './src/components/helloworldscreen';
import WelcomeScreen from './src/components/welcomescreen.js';
import ProfileScreen from './src/components/ProfileScreen.js';
import SettingsScreen from './src/components/SettingScreen.js';
import PersonalProject from './src/components/PersonalProject.js';
import NewProjectScreen from './src/components/NewProjectScreen.js'
import TaskScreen from './src/components/TodoScrenn.js'
import SharedProjectsScreen from './src/components/SharedProject.js'
import SharedTaskScreen from './src/components/SharedTaskScreeen.js'

import AuthContext from './src/server/AuthService.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PersonalProject"
      screenOptions={{
        animation: 'slide_from_right',
        
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="HelloWorld"
        component={HelloWorldScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
        
        })}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
        
        })}
      />

      <Stack.Screen
        name="PersonalProject"
        component={PersonalProject}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
       
        })}
      />

      <Stack.Screen
        name="NewProject"
        component={NewProjectScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
      
        })}
      />

      <Stack.Screen
        name="todolist"
        component={TaskScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
       
        })}
      />

      <Stack.Screen
        name="sharedTasks"
        component={SharedTaskScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
      
        })}
      />

      <Stack.Screen
        name="sharedproject"
        component={SharedProjectsScreen}
        options={({ route }) => ({
          tabBarStyle: { display: getTabBarVisibility(route) },
     
        })}
      />
    </Stack.Navigator>
  );
}


const getTabBarVisibility = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen ;

  if (['Login', 'SignUp', "WelcomeScreen", "NewProject"].includes(routeName)) {
    return 'none';
  }
  return 'flex';
};
// Main component
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const authContextValue = {
    loggedIn,
    login: () => setLoggedIn(true),
    logout: () => setLoggedIn(false),
  };
  


  return (
    <AuthContext.Provider value={authContextValue}>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Personal') {
              iconName = focused ? 'briefcase' : 'briefcase-outline'; // Example icon for Personal
            } else if (route.name === 'Shared') {
              iconName = focused ? 'people' : 'people-outline'; // Example icon for Shared
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
       
        <Tab.Screen name="Personal" component={StackNavigator} />
        <Tab.Screen 
          name="Shared" 
          component={SharedProjectsScreen} 
          listeners={({ navigation }) => ({
            tabPress: event => {
              // Prevent default action
              event.preventDefault();
              console.log(loggedIn); 
              if (!loggedIn) {
      
                navigation.navigate('Login');
              } else {
                // If logged in, navigate to the SharedProjectsScreen
                navigation.navigate('Shared');
              }
            },
          })}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        {/* Add other Tab.Screen components as needed */}
      </Tab.Navigator>
    </NavigationContainer>
    </AuthContext.Provider>
  );
};


export default App;
