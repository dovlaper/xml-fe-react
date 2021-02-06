import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_ANSWER, setAnswer } from './actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";

export function* getAnswer({payload}) {
  try {
    const {data} = yield call(()=> axios.get(
    `http://localhost:8080/api/declaration/${payload}`,
      {
        data: null,
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
    yield put(setAnswer(data))
  } catch(error) {
    console.log(error)
  }
}

export default function* silenceSaga() {
  yield takeLatest(GET_ANSWER, getAnswer);
}
  