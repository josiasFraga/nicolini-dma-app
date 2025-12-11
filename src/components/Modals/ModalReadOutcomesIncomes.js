import React, { useEffect } from 'react';
import { View, Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import FormReadOutcomesIncomes from '@components/Forms/FormReadOutcomesIncomes';

import COLORS from '@constants/colors';

export default function ModalReadOutcomesIncomes(props) {
	const dispatch = useDispatch();

	const modalVisible = props.modalVisible;
	const setModalVisible = props.setModalVisible;

    const validationSchema = yup
    .array()
    .of(
        yup.object().shape({
        kg: yup.string().required('Quantidade em KG obrigatório'),
        goodCode: yup.string().required('Código da mercadoria obrigatório'),
        tipo: yup
            .string()
            .required('Tipo obrigatório')
            .oneOf(['Entrada', 'Saida'], 'Tipo deve ser Entrada ou Saida'),
        })
    )
    .length(2, 'Deve haver exatamente dois itens');

	const formik = useFormik({
		initialValues: [
            { kg: '', goodCode: '', tipo: 'Saida' },
            { kg: '', goodCode: '', tipo: 'Entrada' },
        ],
		validationSchema: validationSchema,
		onSubmit: (values, {setSubmitting}) => {
            dispatch({
                type: 'CONFIRM_SAIDA_ENTRADA',
                payload: {
                    values: {
                        dados: values,
                    },
                    setSubmitting: setSubmitting,
					callbackSuccess: () => {
						setModalVisible(false);
						dispatch({
							type: 'LOAD_ENTRADAS',
							payload: {
								app_product_id: 3,
							},
						});
						dispatch({
							type: 'LOAD_SAIDAS',
							payload: {
								app_product_id: 3,
							},
						});
					}
                },
            });
		},
	});


	useEffect(() => {
		if ( modalVisible === false ) {
			formik.resetForm();
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
					<FormReadOutcomesIncomes
						formik={formik}
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
