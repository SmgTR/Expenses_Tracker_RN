import { useAppDispatch } from '@/redux/hooks';
import { getAllExpenses } from '@/redux/services/expense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useLayoutEffect } from 'react';

import { GlobalStyles } from '@/Constants/styles';
import { IconButton } from '@/Components';
import { ManageExpenses, RecentExpenses, AllExpenses } from '@/Screens';
import { Ionicons } from '@expo/vector-icons';
import Profile from '@/Screens/Profile';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export function ExpensesOverview() {
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getAllExpenses());
  }, []);

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpense')}
            testID="addButton"
          />
        )
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => <Ionicons name="hourglass" size={size} color={color} />
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export function ExpensesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen
        name="ExpensesOverview"
        component={ExpensesOverview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageExpense"
        component={ManageExpenses}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}
