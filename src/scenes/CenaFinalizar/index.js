import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '@components/Header';
import FormLogin from '@components/Forms/FormLogin';
import GlobalStyle from '@styles/global';
import COLORS from '@constants/colors';
import * as yup from 'yup';

const ValidationSchema = yup.object().shape({
  user: yup.string().required('Usuário é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default function CenaFinalizar() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { entradas, saidas, quebras, producoes, next_date, next_date_horti } = useSelector(state => state.appReducer);

  const app_product_id = route.params?.app_product_id || 1;

  const formik = useFormik({
	initialValues: { user: '', password: '' },
	validationSchema: ValidationSchema,
	onSubmit: async (values, { setSubmitting, resetForm }) => {
	  const submitValues = { ...values, app_product_id };

	  setSubmitting(true);

	  dispatch({
		type: 'FINISH',
		payload: {
		  submitValues,
		  setSubmitting,
		  callback_success: async () => {
			if (app_product_id === 1) {
			  await AsyncStorage.multiRemove(['incomes', 'exits']);
			  dispatch({ type: 'LOAD_ENTRADAS', payload: {} });
			  dispatch({ type: 'LOAD_SAIDAS', payload: {} });
			} else {
			  dispatch({ type: 'LOAD_PRODUCTIONS', payload: {
				app_product_id
			  } });
			  dispatch({ type: 'LOAD_DISCREPANCIES', payload: {
				app_product_id
			  } });
			}

			dispatch({
			  type: 'LOAD_NEXT_DATE',
			  payload: { app_product_id },
			});

			resetForm();
			navigation.dispatch(StackActions.pop(1));
		  },
		},
	  });
	},
  });

  const renderWarnings = () => {
	const warnings = [];

	if (app_product_id === 1) {
	  if (!entradas.length) warnings.push('As entradas ainda não foram lançadas');
	  if (!saidas.length) warnings.push('As saídas ainda não foram lançadas');
	  if (next_date === 'no_date') warnings.push('Você não pode lançar dados para depois de amanhã!');
	} else if (app_product_id === 2) {
	  if (!quebras.length) warnings.push('As quebras ainda não foram lançadas');
	  if (!producoes.length) warnings.push('As produções ainda não foram lançadas');
	  if (next_date_horti === 'no_date') warnings.push('Você não pode lançar dados para depois de amanhã!');
	}

	return warnings.map((warning, index) => <Text key={index}>{warning}</Text>);
  };

  const canFinalize =
	(app_product_id === 1 && entradas.length > 0 && saidas.length > 0 && next_date !== 'no_date') ||
	(app_product_id === 2 && producoes.length > 0 && quebras.length > 0 && next_date_horti !== 'no_date');

  return (
	<View style={styles.container}>
	  <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
	  <Header
		titulo="Finalizando Entradas"
		styles={{ backgroundColor: COLORS.primary }}
		titleStyle={{ color: 'white' }}
		backButton
		iconColor="white"
	  />
	  <View style={[GlobalStyle.secureMargin, { flex: 1 }]}>
		<View style={GlobalStyle.spaceSmall} />
		{renderWarnings()}
		{canFinalize && <FormLogin formik={formik} buttonText="Finalizar" />}
	  </View>
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
  },
});
