import React, { useEffect } from 'react';
import { Input, Button, Text } from 'react-native-elements';
import COLORS from '@constants/colors';
import { View } from 'react-native';
import GlobalStyle from '@styles/global';

import PickerSearchableMercadoriasHorti from '@components/Forms/Fields/PickerSearchableMercadoriasHorti';

export default function FormReadProductions(props) {

	const formik = props.formik;
	const selectedGood = props.selectedGood;
	const searchInteralCodeIntoGoods = props.searchInteralCodeIntoGoods;
	const setSelectedGood = props.setSelectedGood;

	const handleDecimalInputChange = (name, value) => {
		// Remove todos os caracteres que não sejam números
		let numericValue = value.replace(/[^\d]/g, '');
		
		// Remove zeros à esquerda
		numericValue = numericValue.replace(/^0+/, '');

		// Adiciona zeros à esquerda se necessário para garantir pelo menos quatro dígitos
		while (numericValue.length < 4) {
		numericValue = '0' + numericValue;
		}

		// Limita a 9 caracteres no total (6 antes da vírgula e 3 após a vírgula)
		if (numericValue.length > 9) {
		numericValue = numericValue.slice(-9);
		}

		// Formata a string com a vírgula antes dos três últimos dígitos
		let formattedValue = numericValue.slice(0, -3) + ',' + numericValue.slice(-3);
		
		// Remove zeros à esquerda, exceto se for o último zero antes da vírgula
		formattedValue = formattedValue.replace(/^0+(?=\d)/, '');

		// Atualiza o valor no Formik
		formik.setFieldValue(name, formattedValue);
	};

	const handleBlurGoodCode = () => {

		console.log('... searchInteralCodeIntoGoods');

		const goodCodeValue = formik.values.goodCode;

		if (goodCodeValue) {
			const good_filter = searchInteralCodeIntoGoods(goodCodeValue);

			if ( !good_filter ) {
				console.log('-> Mercadoria não encontrada ' . goodCode);
				formik.setFieldValue('goodCode', '');
				setSelectedGood('');

			} else {
				console.log(good_filter);
				setSelectedGood(good_filter);
			}
		} else {      
		console.log('-> Mercadoria encontrada ' . goodCode);
		}
	};

	useEffect(()=>{
		handleBlurGoodCode();

	},[formik.values.goodCode]);

	return (
		<>
			<Text style={{textAlign: 'left', width: '100%', color: "#999", paddingLeft: 10}}>{'Mercadoria: ' + selectedGood?.tx_descricao}</Text>
			<View style={GlobalStyle.spaceSmall} />
			<PickerSearchableMercadoriasHorti
			value={formik.values.goodCode}
			setValue={
				(callback) => {
					console.log('formik.values.goodCode');
					console.log(formik.values.goodCode);
					formik.setFieldValue('goodCode', callback(formik.values.goodCode));
				}
			}
			/>
			<View style={GlobalStyle.spaceSmall} />
			<Input
				label="Quantidade em Kg"
				onChangeText={(text) => handleDecimalInputChange('kg', text)}
				onBlur={formik.handleBlur('kg')}
				value={formik.values.kg}
				errorMessage={formik.touched.kg && formik.errors.kg}
				keyboardType="decimal-pad"
				autoCapitalize="none"
				placeholder='informe o valor em KG'
				placeholderTextColor={COLORS.quaternary}
			/>
			<View style={GlobalStyle.row}>
				<Button
					containerStyle={{marginRight: 15, width: 35}}
					titleStyle={{}}
					buttonStyle={{borderRadius: 10, paddingVertical: 10, backgroundColor: 'red'}}
					title="-"
					onPress={()=>{
						const kgValue = formik.values.kg;
						if (kgValue.startsWith('-')) {
						formik.setFieldValue('kg', kgValue.slice(1));
						} else {
							formik.setFieldValue('kg', '-' + kgValue);
						}
					}}
					disabled={formik.isSubmitting}
					loading={formik.isSubmitting}
				/>
				<Button
					containerStyle={{flex: 1}}
					titleStyle={{}}
					buttonStyle={{borderRadius: 10, paddingVertical: 10, backgroundColor: 'green', marginBottom: 15}}
					title="Confirmar"
					onPress={formik.handleSubmit}
					disabled={formik.isSubmitting}
					loading={formik.isSubmitting}
				/>
			</View>
		</>
	);
}