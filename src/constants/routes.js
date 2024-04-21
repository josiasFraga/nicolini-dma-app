import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CenaHome from '@scenes/CenaHome';
import CenaLogin from '@scenes/CenaLogin';
import CenaSplash from '@scenes/CenaSplash';
import CenaFinalizar from '@scenes/CenaFinalizar';
import CenaSaidas from '@scenes/CenaSaidas';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Splash" component={CenaSplash} />
        <Stack.Screen name="Login" component={CenaLogin} />
        <Stack.Screen name="Home" component={CenaHome} />
        <Stack.Screen name="Saidas" component={CenaSaidas} />
        <Stack.Screen name="Finalizar" component={CenaFinalizar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
