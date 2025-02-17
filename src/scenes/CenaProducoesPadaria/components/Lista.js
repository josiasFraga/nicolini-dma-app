import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Switch,
	Text,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import COLORS from '@constants/colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const Lista = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const producoes = useSelector(state => state.appReducer.producoes_padaria);
	const isLoading = useSelector(state => state.appReducer.is_producoes_loading);

	useEffect(() => {
		buscarProducoes();
	}, []);

	const buscarProducoes = () => {
		dispatch({
			type: 'LOAD_PRODUCTIONS',
			payload: {
				app_product_id: 3,
			},
		});
	};

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item, i }) => {
		console.log(item);
		return(
			<ListItem 
			key={i} 
			bottomDivider 
			onPress={() => {
			
			}} 
			>
			<ListItem.Content>
				<ListItem.Title>{item.goodCode} - {item.good.tx_descricao}</ListItem.Title>
				<ListItem.Subtitle>{item.kg}Kg</ListItem.Subtitle>
			</ListItem.Content>
			</ListItem>
			)
	};

	return (
		<View style={styles.container}>
			<FlatList
				keyExtractor={keyExtractor}
				data={producoes}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				scrollEnabled
				ListEmptyComponent={<Text style={GlobalStyle.emptyListText}>Nenhum dado encontrado!</Text>}
				style={{ flex: 1 }}
				onRefresh={() => {
					buscarProducoes();
				}}
				refreshing={isLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default Lista;
