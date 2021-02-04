import { 
    CREATE_RESCRIPT,
    GET_ALL_RESCRIPTS,
    setAllRescripts,
    createRescript,
    getAllRescripts,
    addRescript,
} from "./actions";
import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { setRescript } from './actions';
import axios from 'axios';

export function* getAllRescriptsSaga() {
    try {
        const { data } = yield call(() => 
          axios.get(
            "http://localhost:8080/api/rescript/", 
            {
              data: null,
              headers: {'Content-Type': 'application/xml'}
            }
          )
        )
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data,"text/xml");
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.resenje.com", "ResenjeRoot")) 
        yield put(setAllRescripts(list))
    } catch (error) {
        console.log(error)
    }
}

export function* createRescriptSaga({ payload }) {
    try {
        const { data } = yield call(() => 
            axios.post(
                "http://localhost:8080/api/rescript/",
                payload,
                {
                    headers: {'Content-Type': 'application/xml'}
                }
            )
        )
        yield put(addRescript(data))
    } catch(error) {
        console.log(error)
    }
}

export default function* silenceSaga() {
  yield takeLatest(GET_ALL_RESCRIPTS, getAllRescriptsSaga);
  yield takeLatest(CREATE_RESCRIPT, createRescriptSaga);

}
  