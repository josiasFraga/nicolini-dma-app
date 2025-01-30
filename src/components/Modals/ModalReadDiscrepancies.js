import React, { useState, useEffect } from 'react';
import { Text, View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormReadDiscrepancies from '@components/Forms/FormReadDiscrepancies';

import COLORS from '@constants/colors';

export default function ModalReadDiscrepancies(props) {
	const dispatch = useDispatch();

	const [selectedGood, setSelectedGood] = useState('');

	const goods = props.goods;
	const modalVisible = props.modalVisible;
	const setModalVisible = props.setModalVisible;
	const goodCode = props.goodCode;

	const validationSchema = yup.object().shape({
		kg: yup.string().required('Quantidade em KG obrigatório'),
		goodCode: yup.string().required('Código da mercadoria obrigatório'),
	});

	const formik = useFormik({
		initialValues: { 
			kg: '', 
			goodCode: goodCode
		},
		validationSchema: validationSchema,
		onSubmit: (values, {setSubmitting}) => {
			values.good = selectedGood;

			dispatch({
				type: 'CONFIRM_QUEBRA',
				payload: {
					values: values,
					setSubmitting: setSubmitting,
					callbackSuccess: () => {
						setModalVisible(false);
						dispatch({
							type: 'LOAD_DISCREPANCIES',
							payload: {
								app_product_id: 2,
							},
						});
					}
				}
			});
		},
	});

	const searchInteralCodeIntoGoods = (inderanalCode) => {

		const good_filter = goods.filter((_good)=>{
			return parseFloat(_good.cd_codigoint) === parseFloat(inderanalCode);
		});

		if ( good_filter.length == 0 ) {
			return false;
		} else {
			return good_filter[0];
		}

	}

	useEffect(() => {
		formik.setFieldValue('goodCode', goodCode);

		if ( goodCode !== "" ) {

			const good_filter = searchInteralCodeIntoGoods(goodCode);

			if ( !good_filter ) {
				console.log('-> Mercadoria não encontrada ' . goodCode);
				formik.setFieldValue('goodCode', '');
				setSelectedGood('');

			} else {
				setSelectedGood(good_filter);
			}


		} else {
			formik.setFieldValue('goodCode', '');
			setSelectedGood('');

		}
	}, [goodCode, goods]);

	useEffect(() => {
		if ( modalVisible === false ) {
			formik.resetForm();
			setSelectedGood('');
		}

	}, [modalVisible]);

  
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setModalVisible(!modalVisible);
				formik.resetForm();
			}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<FormReadDiscrepancies 
						formik={formik}
						selectedGood={selectedGood}
						searchInteralCodeIntoGoods={searchInteralCodeIntoGoods}
						setSelectedGood={setSelectedGood}
					/>
					<Button
						titleStyle={{color: COLORS.primary}}
						type='clear'
						buttonStyle={{borderRadius: 25, paddingVertical: 10, marginTop: 25}}
						title="Cancelar"
						onPress={() => setModalVisible(!modalVisible)}
					/>
				</View>
			</View>
		</Modal>
	);
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = {
	container: {
		flex: 1
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: '100%',
		backgroundColor: opacity
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
		width: 0,
		height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		width: '90%'
	},
};
