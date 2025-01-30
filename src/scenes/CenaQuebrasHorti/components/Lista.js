import React, { useEffect } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Text,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import GlobalStyle from '@styles/global';
import { useDispatch, useSelector } from 'react-redux';

const Lista = () => {
	const dispatch = useDispatch();
	const quebras = useSelector(state => state.appReducer.quebras);
	const isLoading = useSelector(state => state.appReducer.is_quebras_loading);

	useEffect(() => {
		buscarQuebras();
	}, []);

	const buscarQuebras = () => {
		dispatch({
			type: 'LOAD_DISCREPANCIES',
			payload: {
				app_product_id: 2,
			},
		});
	};

	const keyExtractor = (item, index) => index.toString();

	const renderItem = ({ item, i }) => {
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
				data={quebras}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				scrollEnabled
				ListEmptyComponent={<Text style={GlobalStyle.emptyListText}>Nenhum dado encontrado!</Text>}
				style={{ flex: 1 }}
				onRefresh={() => {
					buscarQuebras();
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
