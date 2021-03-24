import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';

import Dashboard from '../Pages/Dashboard';
import Profile from '../Pages/Profile';
import CreateAppointment from '../Pages/CreateAppointment';
import AppointmentCreated from '../Pages/AppointmentCreated';


const App = createStackNavigator();

export const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38'}
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="CreateAppointment" component={CreateAppointment} />
    <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;