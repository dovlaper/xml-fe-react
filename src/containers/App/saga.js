import { takeLatest, call, put } from 'redux-saga/effects';
import { removeItem } from '../../utils/localStorage';
import request from '../../utils/request';
import { fetchAuthenticatedUserSuccess, logoutSuccess } from './actions';
import { FETCH_AUTHENTICATED_USER_REQUEST, LOGOUT_REQUEST } from './constants';
import history from '../../utils/history';

export function* fetchUser() {
  try {
    const user = yield call(request, {
      url: '/auth/me',
      method: 'get'
    });
    yield put(fetchAuthenticatedUserSuccess(user));
  } catch (error) {
    //
  }
}



export function* logout() {
  try {
    yield call(removeItem, 'token');
  } catch (error) {
    //
  }
}

export default function* appSaga() {
  yield takeLatest(FETCH_AUTHENTICATED_USER_REQUEST, fetchUser);
  yield takeLatest(LOGOUT_REQUEST, logout);
}
