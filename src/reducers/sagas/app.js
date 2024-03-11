import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {callApi} from '@services/api';
import AlertHelper from '@components/Alert/AlertHelper';
import CONFIG from '@constants/configs';
import NetInfo from "@react-native-community/netinfo";

function* login({payload}) {

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode logar quando seu dispositivo quando estiver com internet.',
		  );
		  payload.setSubmitting(false);
		  return true;
	}


	console.log('[SAGA] - LOGANDO');
	console.debug(payload.submitValues);
	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/users/login.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [LOGANDO]', response);

		if ( response.data.status == 'ok' ) {
			yield put({
				type: 'LOGIN_SUCCESS',
				payload: true,
			});

			console.log('[SAGA] - TOKEN ' + response.data.token);

			yield AsyncStorage.setItem('bearerToken', response.data.token);
			yield AsyncStorage.setItem('storeCode', response.data.loja);
			
			yield payload.callback_success();

		} else {
			AlertHelper.show('error', 'Erro', response.data.message);
			yield put({
				type: 'LOGIN_FAILED',
				payload: true,
			});

		}
		payload.setSubmitting(false);

	} catch ({message, response}) {
		payload.setSubmitting(false);

		if ( response.status == 500 ) {
			AlertHelper.show('error', 'Erro', 'Login e/ou senha inválidos');

		} else {
			console.error('[SAGA] - [LOGANDO]', { message, response });
			AlertHelper.show('error', 'Erro', message);

		}
		yield put({
			type: 'LOGIN_FAILED',
			payload: true,
		});
	}
}

function* loadGoods({payload}) {

	console.log('carregando produtos');

	const networkStatus = yield NetInfo.fetch();
	
	//SEM INTERNET, NÃO ATUALIZA A LISTA DE MERCADORIAS
	if ( !networkStatus.isConnected ) {
		return true;
	}

	//TEM INTERNET, BUSCANDO OS DADOS ONLINE
	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/mercadorias/index.json',
			method: 'GET',			
			params: {}
		});

		if (response.status == 200) {
			console.debug(response.data);
			console.debug(response.status);
			console.debug(response.data.status);
			console.debug(response.data.data);
			if (response.data.status == 'ok') {
				yield put({
				  type: 'LOAD_GOODS_SUCCESS',
				  payload: {},
				});
				console.log('Lista de mercadorias atualizada com sucesso!');
				yield AsyncStorage.setItem('goods', JSON.stringify(response.data.data));
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_GOODS_FAILED',
					payload: {},
				});
				console.error('Erro ao buscar as mercadoriass');
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro ao buscar as mercadorias', JSON.stringify(response.data));
			yield put({
				type: 'LOAD_GOODS_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.warn('[ERROR : LOAD GOODS]', {message, response});
		yield put({
			type: 'LOAD_GOODS_FAILED',
			payload: {},
		});
		yield AlertHelper.show('error', 'Erro ao buscar as mercadorias', JSON.stringify(response));
	}
	


}

function* loadCutOutCodes({payload}) {

	console.log('carregando produtos');

	const networkStatus = yield NetInfo.fetch();
	
	//SEM INTERNET, NÃO ATUALIZA A LISTA DE CÓDIGOS DE RECORTES
	if ( !networkStatus.isConnected ) {
		return true;
	}

	const store_code = yield AsyncStorage.getItem('storeCode');

	//TEM INTERNET, BUSCANDO OS DADOS ONLINE
	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/store-cutout-codes/index.json',
			method: 'GET',
			params: {
				store_code: store_code
			}
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
				  type: 'LOAD_CUTOUT_CODES_SUCCESS',
				  payload: {},
				});
				console.log('Lista de códigos de recortes atualizada com sucesso!');
				yield AsyncStorage.setItem('cutOutCodes', JSON.stringify(response.data.data));
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_CUTOUT_CODES_FAILED',
					payload: {},
				});
				console.error('Erro ao buscar os códigos de recortes');
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro ao buscar os códigos de recortes', JSON.stringify(response.data));
			yield put({
				type: 'LOAD_CUTOUT_CODES_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.warn('[ERROR : LOAD CUTOUT CODES]', {message, response});
		yield put({
			type: 'LOAD_CUTOUT_CODES_FAILED',
			payload: {},
		});
		yield AlertHelper.show('error', 'Erro ao buscar os códigos de recortes', JSON.stringify(response));
	}

}

function* loadExpectedYield({payload}) {

	console.log('carregando rendimento esperado');

	const networkStatus = yield NetInfo.fetch();
	
	//SEM INTERNET, NÃO ATUALIZA A LISTA DE RENDIMENTOS ESPERADO
	if ( !networkStatus.isConnected ) {
		return true;
	}

	const store_code = yield AsyncStorage.getItem('storeCode');

	//TEM INTERNET, BUSCANDO OS DADOS ONLINE
	try {
		const response = yield call(callApi, {
			endpoint: CONFIG.url + '/expected-yield/index.json',
			method: 'GET',
			params: {
				store_code: store_code
			}
		});

		if (response.status == 200) {
			if (response.data.status == 'ok') {
				yield put({
				  type: 'LOAD_EXPECTED_YIELD_SUCCESS',
				  payload: {},
				});
				console.log('Dados de rendimento esperado atualizados com sucesso!');
				yield AsyncStorage.setItem('expectedYield', JSON.stringify(response.data.data));
	
			} else {
				yield AlertHelper.show('error', 'Erro', response.data.msg);
				yield put({
					type: 'LOAD_EXPECTED_YIELD_FAILED',
					payload: {},
				});
				console.error('Erro ao buscar os dados de rendimento esperado');
	
			}
		} else {
			yield AlertHelper.show('error', 'Erro ao buscar os daos de rendimento esperado', JSON.stringify(response.data));
			yield put({
				type: 'LOAD_EXPECTED_YIELD_FAILED',
				payload: {},
			});

		}

	} catch ({message, response}) {
		console.warn('[ERROR : LOAD EXPEXTED YIELD]', {message, response});
		yield put({
			type: 'LOAD_EXPECTED_YIELD_FAILED',
			payload: {},
		});
		yield AlertHelper.show('error', 'Erro ao buscar os dados de rendimento esperado', JSON.stringify(response));
	}

}

function* logout({payload}) {
	
	yield AsyncStorage.removeItem('bearerToken');
	yield AsyncStorage.removeItem('storeCode');
	yield AsyncStorage.removeItem('incomes');
	yield AsyncStorage.removeItem('exits');
	yield AsyncStorage.removeItem('cutOutCodes');

	yield loadEntradas({payload: {}});

	yield loadSaidas({payload: {}});

	if ( payload.callbackSuccess ) {
		yield payload.callbackSuccess();
	}
}

function* confirmSaidas({payload}) {

	// Deixar aqui senão não soma no resumo por algum motivo
	yield put({
		type: 'SET_SAIDAS',
		payload: [],
	});

	yield put({
		type: 'SET_SAIDAS',
		payload: payload.submitValues,
	});

	yield AsyncStorage.setItem('exits', JSON.stringify(payload.submitValues));

	yield payload.setSubmitting(false);

	if ( payload.callback_success ) {
		yield payload.callback_success();
	}

}

function* loadEntradas({payload}) {

	try {
		const incomes_storage = yield AsyncStorage.getItem('incomes');
		if (incomes_storage !== null) {

			yield put({
				type: 'SET_ENTRADAS',
				payload: JSON.parse(incomes_storage),
			});
			
		} else {

			yield put({
				type: 'SET_ENTRADAS',
				payload: [],
			});
			
		}

		if ( payload.callback_success ) {
			yield payload.callback_success();
		}
	} catch (error) {
		// Trate o erro, se necessário
		console.error('Failed to load incomes from AsyncStorage', error);

		yield put({
			type: 'SET_ENTRADAS',
			payload: [],
		});
	}

}

function* loadSaidas({payload}) {

	try {
		const exits_storage = yield AsyncStorage.getItem('exits');
		if (exits_storage !== null) {

			yield put({
				type: 'SET_SAIDAS',
				payload: JSON.parse(exits_storage),
			});
			
		} else {

			yield put({
				type: 'SET_SAIDAS',
				payload: [],
			});
			
		}

		if ( payload.callback_success ) {
			yield payload.callback_success();
		}
	} catch (error) {
		// Trate o erro, se necessário
		console.error('Failed to load exits from AsyncStorage', error);

		yield put({
			type: 'SET_SAIDAS',
			payload: [],
		});
	}

}

function* confirmEntrada({payload}) {

	yield put({
		type: 'SET_ENTRADAS',
		payload: [],
	});

	yield put({
		type: 'SET_ENTRADAS',
		payload: payload.submitValues,
	});

	yield AsyncStorage.setItem('incomes', JSON.stringify(payload.submitValues));

	yield payload.setSubmitting(false);

	if ( payload.callback_success ) {
		yield payload.callback_success();
	}

}

function* finish({payload}){

	const networkStatus = yield NetInfo.fetch();
	
	if ( !networkStatus.isConnected ) {
		yield AlertHelper.show(
			'warn',
			'Sem conexão',
			'Você só pode finalizar quando estiver com internet.',
		  );
		  payload.setSubmitting(false);
		  return true;
	}


	console.log('[SAGA] - FINALIZANDO');

	
	let data = new FormData();
	let dados = payload.submitValues;

	data.append('dados', JSON.stringify(dados));

	try {
		const response = yield call(callApi, { 
			endpoint: CONFIG.url+'/dma/finish.json',
			method: 'POST',
			data: data,
			headers: {
				'content-type': 'multipart/form-data',
			},
		});

		console.log('[SAGA] - [FINALIZANDO]', response);

		if ( response.data.status == 'ok' ) {
			yield payload.callback_success();
		} else {
			AlertHelper.show('error', 'Erro', response.data.message);
		}
		payload.setSubmitting(false);

	} catch ({message, response}) {
		payload.setSubmitting(false);

		console.error('[SAGA] - [FINALIZANDO]', { message, response });
		AlertHelper.show('error', 'Erro', message);

	}

}

export default function* () {
	yield takeLatest('LOGIN_TRIGGER', login);

	yield takeLatest('LOAD_GOODS', loadGoods);
	yield takeLatest('LOAD_CUTOUT_CODES', loadCutOutCodes);
	yield takeLatest('LOAD_EXPECTED_YIELD', loadExpectedYield);
	
	yield takeLatest('CONFIRM_SAIDAS', confirmSaidas);
	yield takeLatest('CONFIRM_ENTRADA', confirmEntrada);
	yield takeLatest('LOAD_ENTRADAS', loadEntradas);
	yield takeLatest('LOAD_SAIDAS', loadSaidas);
	yield takeLatest('FINISH', finish);
	
	yield takeLatest('LOGOUT', logout);
}