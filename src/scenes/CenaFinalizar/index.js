import React from 'react';
import {
	StyleSheet,
	View,
	StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Text } from 'react-native-elements';
import { StackActions, useNavigation } from '@react-navigation/native';
import FormLogin from '@components/Forms/FormLogin';
import GlobalStyle from '@styles/global';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '@components/Header';
import * as yup from 'yup';

import COLORS from '@constants/colors';

const ValidationSchema = yup.object().shape({
	user: yup.string().required('Usuário é obrigatório'),
	password: yup.string().required('Senha é obrigatória'),
});

export default function CenaFinalizar(props) {
	const dispatch = useDispatch();
    const navigation = useNavigation();

	const next_date = useSelector(state => state.appReducer.next_date);

    const entradas = useSelector(state => state.appReducer.entradas);
    const saidas = useSelector(state => state.appReducer.saidas);

	const formik = useFormik({
		initialValues: { user: '', password: '' },
		validationSchema: ValidationSchema,
		onSubmit: (values, {setSubmitting, resetForm}) => {

			let submitValues = {};
            submitValues = Object.assign(values)
			setSubmitting(true);
		  
			dispatch({
				type: 'FINISH',
				payload: {
                    submitValues: submitValues,
                    setSubmitting: setSubmitting,
                    callback_success: async () => {
	
                        await AsyncStorage.removeItem('incomes');
                        await AsyncStorage.removeItem('exits');

                        dispatch({
                            type: 'LOAD_ENTRADAS',
                            payload: {}
                        })
                        dispatch({
                            type: 'LOAD_SAIDAS',
                            payload: {}
                        })

						dispatch({
							type: 'LOAD_NEXT_DATE',
							payload: {}
						});

                        resetForm();
                        navigation.dispatch(StackActions.pop(1));
                    }
				}
			})
		},
	});

    return (
        <View style={styles.container}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle={'dark-content'}
            />
            <Header 
				titulo={'Finalizando Entradas'} 
				styles={{backgroundColor: COLORS.primary}} 
				titleStyle={{color: 'white'}}
                backButton={true}
                iconColor='white'
			/>
			<View style={[GlobalStyle.secureMargin, {flex: 1}]}>
                <View style={GlobalStyle.spaceSmall} />
            {
                entradas.length == 0 && <Text>As entradas ainda não forma lançadas</Text>
            }
            {
                saidas.length == 0 && <Text>As saídas ainda não forma lançadas</Text>
            }
            {
                next_date == "no_date" && <Text>Você não pode lançar dados para depois de amanhã!</Text>
            }
            {
                entradas.length > 0 && saidas.length > 0 && next_date != 'no_date' && <FormLogin formik={formik} buttonText="Finalizar" />
            }
            </View>
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
		//flex: 2
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
