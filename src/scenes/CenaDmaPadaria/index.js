import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
    useWindowDimensions,
	TouchableHighlight,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Text, Icon } from 'react-native-elements';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabQuebras from './components/TabQuebras';
import TabProducao from './components/TabProducao';
import TabEntradaSaida from './components/TabEntradaSaida';
import Header from '@components/Header';
import { TabView, SceneMap } from 'react-native-tab-view';

import COLORS from '@constants/colors';

const CenaDmaPadaria = (props) => {
	const dispatch = useDispatch();
    const navigation = useNavigation();

	const [deviceId, setDeviceId] = useState('');
	const [storeCode, setStoreCode] = useState('');
	const [index, setIndex] = React.useState(0);	
	const layout = useWindowDimensions();

	const [routes] = useState([
		{ key: 'first', title: 'Quebras' },
		{ key: 'second', title: 'Saída/Entrada' },
		{ key: 'third', title: 'Produção' },
	]);

	const renderTabBar = props => (
		<View style={{ flexDirection: 'row' }}>
		  {props.navigationState.routes.map((route, i) => {
			const isActive = props.navigationState.index === i;
			const color = isActive ? '#f7f7f7' : COLORS.secondary;
			const backgroundColor = COLORS.primary;
			const underlayColor = '#B3749F'; // Cor de fundo ao clicar no botão
	  
			// Estilos para a linha abaixo do item ativo
			const borderBottomColor = isActive ? '#FFFFFF' : backgroundColor;
			const borderBottomWidth = isActive ? 2 : 0;
	  
			return (
			  <TouchableHighlight
				key={i}
				underlayColor={underlayColor}
				style={{ 
				  flex: 1,
				  backgroundColor,
				  justifyContent: 'center',
				  alignItems: 'center',
				  paddingVertical: 7,
				  borderBottomColor,
				  borderBottomWidth
				}}
				onPress={() => setIndex(i)}>
				<Text style={{ color, fontWeight: 'bold', fontSize: 16 }}>{route.title}</Text>
			  </TouchableHighlight>
			);
		  })}
		</View>
	);

	const renderScene = SceneMap({
		first: TabQuebras,
		second: TabEntradaSaida,
		third: TabProducao,
	});

	const loadStore = async () => {
		console.log('... Buscando código da loja');
		try {
            const sotoreCodeData = await AsyncStorage.getItem('storeCode');
            if (sotoreCodeData !== null) {
                // Se houver dados salvos, analise-os e atualize o estado 'goods'
                setStoreCode(sotoreCodeData);
            } else {
				console.log('.. Código da loja em branco.')
			}
        } catch (error) {
            // Trate o erro, se necessário
            console.error('Failed to load storeCode from AsyncStorage', error);
        }
	}

	useEffect(() => {
		const fetchDeviceId = async () => {
			const deviceId = await getUniqueId();
			setDeviceId(deviceId);
		};

		fetchDeviceId();
		loadStore();
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar
				translucent={true}
				backgroundColor={'transparent'}
				barStyle={'light-content'}
			/>
			<Header 
				titulo={"DMA Padaria " + storeCode} 
				styles={{backgroundColor: COLORS.primary}} 
				titleStyle={{color: 'white'}}
				leftElement={()=>{
					return (
						<Icon
							name="arrow-back" // Alterado para "arrow-back"
							type="material"
							color={"#FFF"}
							size={30}
							onPress={() => {
								navigation.pop(); // Substitui o dispatch pelo pop
							}}
							containerStyle={{backgroundColor: 'transparent'}}
						/>
					)
				}}
			/>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				scrollEnabled
				tabStyle={{}}
				renderTabBar={renderTabBar}
				swipeEnabled={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageContainer: { 
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30
	},
	text: {
		fontFamily: 'Mitr-Regular',
		lineHeight: 18,
	},
	textMedium: {
		fontFamily: 'Mitr-Medium',
		marginBottom: 3,
	},
	centerFully: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	subtitle: {
		textAlign: 'center',
		fontSize: 15,
		marginBottom: 7,
	},
	innerSpace: {
		padding: 15,
	},
	discountBox: {
		borderWidth: 0.5,
		borderColor: '#CCC',
		padding: 15,
		borderRadius: 15,
		margin: 15,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonVisitante: {
		marginTop: 15,
	},
	buttonCadastrarText: {
		textAlign: 'center',
		color: '#FFF',
	},
	bgImage: {
		width: 120,
		height: 120,
		position: 'absolute',
		zIndex: 999,
		bottom:-50,
		right: -20,
		alignSelf: 'flex-end',
	}
});

export default CenaDmaPadaria;
