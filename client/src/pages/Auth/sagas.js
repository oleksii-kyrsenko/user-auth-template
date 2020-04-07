import axios from 'axios';
import { put, all, takeEvery } from 'redux-saga/effects';
import { authUser, fetchAuthUser, createUser } from './routines';
import { setAuthToken } from '../../helpers/setAuthToken';

function* authUserSaga({ payload }) {
	try {
		const response = yield axios.post('/api/auth', payload);
		const { token } = response.data;
		setAuthToken(token);
		yield put(authUser.success({ token }));
		yield put(fetchAuthUser());
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		yield put(fetchAuthUser.failure());
	} finally {
	}
}

function* fetchAuthUserSaga() {
	try {
		const response = yield axios.get('/api/auth');
		yield put(fetchAuthUser.success({ user: response.data }));
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		yield put(fetchAuthUser.failure());
	} finally {
	}
}

function* createUserSaga({ payload }) {
	try {
		const response = yield axios.post('/api/users', payload);
		const { token } = response.data;
		setAuthToken(token);
		yield put(createUser.success({ token }));
		yield put(fetchAuthUser());
	} catch (error) {
		const errors = error.response.data.errors;
		console.log(errors);
		yield put(createUser.failure());
	} finally {
	}
}

function* authUserWatcherSaga() {
	yield takeEvery(authUser.TRIGGER, authUserSaga);
}

function* fetchAuthUsertWatcherSaga() {
	yield takeEvery(fetchAuthUser.TRIGGER, fetchAuthUserSaga);
}

function* createUserWatcherSaga() {
	yield takeEvery(createUser.TRIGGER, createUserSaga);
}

export function* authSagas() {
	yield all([authUserWatcherSaga(), fetchAuthUsertWatcherSaga(), createUserWatcherSaga()]);
}
