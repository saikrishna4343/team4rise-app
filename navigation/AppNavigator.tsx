import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";

import { useAppStore } from "../store/useAppStore";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import HomeScreen from "../screens/HomeScreen";
import PendingTasksScreen from "../screens/PendingTasksScreen";
import ChallengeScreen from "../screens/ChallengeScreen";
import TeamsScreen from "../screens/TeamsScreen";
import TeamDetailScreen from "../screens/TeamDetailScreen";
import CompletedTasksScreen from "../screens/CompletedTasksScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

type IconName = 'home' | 'trophy' | 'users' | 'user';

const getIconName = (routeName: string): IconName => {
  const icons: Record<string, IconName> = {
    Home: 'home',
    Challenges: 'trophy',
    Team: 'users',
    Profile: 'user',
  };
  return icons[routeName] || 'home';
};

// Custom Tab Icon
const TabIcon = ({ name, focused }: { name: IconName; focused: boolean }) => {
  return (
    <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
      <FontAwesome5
        name={name}
        size={22}
        color={focused ? '#2E86DE' : '#9E9E9E'}
        solid={focused}
      />
      {focused && <View style={styles.activeDot} />}
    </View>
  );
};

// Auth Stack Navigator
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
}

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PendingTasks" component={PendingTasksScreen} />
      <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
    </Stack.Navigator>
  );
}

// Team Stack Navigator
function TeamStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TeamList" component={TeamsScreen} />
      <Stack.Screen name="TeamDetail" component={TeamDetailScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
          paddingHorizontal: 16,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.12,
          shadowRadius: 16,
          position: 'absolute',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIcon: ({ focused }) => (
          <TabIcon name={getIconName(route.name)} focused={focused} />
        ),
        tabBarActiveTintColor: '#2E86DE',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarHideOnKeyboard: Platform.OS === 'android',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengeScreen}
        options={{ tabBarLabel: 'Challenges' }}
      />
      <Tab.Screen
        name="Team"
        component={TeamStack} // <-- use TeamStack here
        options={{ tabBarLabel: 'Team' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// App Navigator
export default function AppNavigator() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 40,
    borderRadius: 12,
  },
  iconContainerActive: {
    backgroundColor: '#E3F2FD',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#2E86DE',
    marginTop: 4,
    position: 'absolute',
    bottom: -2,
  },
});
