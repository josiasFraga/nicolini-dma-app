import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
    useWindowDimensions,
	TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Text, Icon } from 'react-native-elements';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabEntradas from './components/TabEntradas';
import TabSaidas from './components/TabSaidas';
import Header from '@components/Header';
import { TabView, SceneMap } from 'react-native-tab-view';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import COLORS from '@constants/colors';

const CenaHome = (props) => {
	const dispatch = useDispatch();
    const navigation = useNavigation();

	const next_date = useSelector(state => state.appReducer.next_date);

	const [deviceId, setDeviceId] = useState('');
	const [storeCode, setStoreCode] = useState('');
	const [index, setIndex] = React.useState(0);	
	const layout = useWindowDimensions();

	const [routes] = useState([
		{ key: 'first', title: 'Saídas' },
		{ key: 'second', title: 'Entradas' },
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
		first: TabSaidas,
		second: TabEntradas,
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

	let proximaDataFormatada = "";

	if ( next_date !== "" && next_date !== "no_date" ){
		const proximaData = new Date(next_date);
		proximaDataFormatada = format(proximaData, "dd/MMM", { locale: ptBR });
	}

	if ( next_date === "no_date" ) {
		proximaDataFormatada = "no_date";
	}

	return (
		<View style={styles.container}>
			<StatusBar
				translucent={true}
				backgroundColor={'transparent'}
				barStyle={'dark-content'}
			/>
			<Header 
				titulo={storeCode + " " + proximaDataFormatada} 
				styles={{backgroundColor: COLORS.primary}} 
				titleStyle={{color: 'white'}}
				leftElement={()=>{
					return (
						<Icon
							name="logout"
							type="simple-line"
							color={"#FFF"}
							size={30}
							onPress={() => {

								dispatch({
									type: 'LOGOUT',
									payload: {
										callbackSuccess: () => {
											navigation.dispatch(
												CommonActions.navigate({
													name: 'Login',
												})
											); 
										}
									}
								})
							
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

export default CenaHome;
