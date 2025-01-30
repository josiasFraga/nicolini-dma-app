import { call, put } from 'redux-saga/effects';
import { callApi } from '@services/api';
import AlertHelper from '@components/Alert/AlertHelper';

export function* get(payload, apiUrl, sagaSuccess, sagaError, callbackSuccess, errorMessage) {

	try {
		const dados = { ...payload };

        console.log('-> params');
        console.log(dados);

		const response = yield call(callApi, {
		endpoint: apiUrl,
		method: 'GET',
		params: dados,
		headers: { 'content-type': 'multipart/form-data' },
		});

		if (response.data.status === 'ok') {
            if ( sagaSuccess ) {
                yield put({ type: sagaSuccess, payload: response.data.data });
            } 

            if ( callbackSuccess ) {
                yield call(callbackSuccess, response.data.data);
            }
		} else {
			yield call(AlertHelper.show, response.data.status, errorMessage);
            if ( sagaError ) {
                yield put({ type: sagaError, payload: {} });
            }
		}
	} catch (error) {
		console.warn('[ERROR : GET ERROR]', error);
		yield call(AlertHelper.show, 'error', 'Erro', error.message);
        if ( sagaError ) {
		    yield put({ type: sagaError, payload: {} });
        }
	}
}
