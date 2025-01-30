import { call, put } from 'redux-saga/effects';
import { callApi } from '@services/api';
import AlertHelper from '@components/Alert/AlertHelper';

export function* post(payload, apiUrl, errorMessage) {
	try {
		const data = new FormData();
		const dados = { ...payload.values };
		data.append('dados', JSON.stringify(dados));

		const response = yield call(callApi, {
			endpoint: apiUrl,
			method: 'POST',
			headers: {
				'content-type': 'multipart/form-data',
			},
			data,
		});

		if (response.status === 200) {
			if (response.data.status === 'ok') {
				if (payload.callbackSuccess) {
					console.log('callback success saga');
					yield call(payload.callbackSuccess);
				}
			} else {
				yield call(AlertHelper.show, 'error', response.data.status, response.data.msg);
				if (payload.callbackError) {
				yield call(payload.callbackError);
				}
			}
		} else {
			yield call(AlertHelper.show, 'error', 'Erro', errorMessage);
			if (payload.callbackError) {
				yield call(payload.callbackError);
			}
		}

		if ( payload.setSubmitting ) {
			yield payload.setSubmitting(false);
		}
	} catch (error) {
		console.warn(`[ERROR : POST ${apiUrl}]`, error);
		yield call(AlertHelper.show, 'error', 'Erro', errorMessage);
		if (payload.callbackError) {
			yield call(payload.callbackError);
		}

		if ( payload.setSubmitting ) {
			yield payload.setSubmitting(false);
		}
	}
}
