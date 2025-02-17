import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CenaHome from '@scenes/CenaHome';
import CenaLogin from '@scenes/CenaLogin';
import CenaSplash from '@scenes/CenaSplash';
import CenaFinalizar from '@scenes/CenaFinalizar';
import CenaSaidas from '@scenes/CenaSaidas';
import CenaDmaAcougue from '@scenes/CenaDmaAcougue';
import CenaDmaHorti from '@scenes/CenaDmaHorti';
import CenaDmaPadaria from '@scenes/CenaDmaPadaria';
import CenaProducoesHorti from '@scenes/CenaProducoesHorti';
import CenaProducoesPadaria from '@scenes/CenaProducoesPadaria';
import CenaQuebrasHorti from '@scenes/CenaQuebrasHorti';
import CenaQuebrasPadaria from '@scenes/CenaQuebrasPadaria';

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
			<Stack.Screen name="DmaAcougue" component={CenaDmaAcougue} />
			<Stack.Screen name="DmaPadaria" component={CenaDmaPadaria} />
			<Stack.Screen name="DmaHorti" component={CenaDmaHorti} />
			<Stack.Screen name="Saidas" component={CenaSaidas} />
			<Stack.Screen name="ProducoesHorti" component={CenaProducoesHorti} />
			<Stack.Screen name="ProducoesPadaria" component={CenaProducoesPadaria} />
			<Stack.Screen name="QuebrasHorti" component={CenaQuebrasHorti} />
			<Stack.Screen name="QuebrasPadaria" component={CenaQuebrasPadaria} />
			<Stack.Screen name="Finalizar" component={CenaFinalizar} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}

export default Routes;
