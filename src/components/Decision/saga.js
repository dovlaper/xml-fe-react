import { ABORT_APPEAL, CREATE_DECISION_APPEAL, GET_DECISION_APPEALS, SEARCH, FILTER, FORWARD_APPEAL } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { setDecisionAppeal, addDecisionAppeal, getDecisionAppeal as getAll } from './actions';
import { getItem } from "../../utils/localStorage";
import { setError } from "../../containers/App/actions";
export function* getDecisionAppeal({payload}) {
  try {
      const all = payload || '';
      const { data }= yield call(() => 
        axios.get(
          `http://localhost:8080/api/decisionappeal/${all}`, 
          {
            data: null,
            headers: {
              'Content-Type': 'application/xml',
              'Authorization': `Bearer ${getItem('token')}`
            }
          }
        )
      )
      const parser = new DOMParser();

      const xmlDoc = parser.parseFromString(data,"text/xml");
      
      const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
      yield put(setDecisionAppeal(list))
  } catch (error) {
      console.log(error)
  }
}

export function* createDecisionSaga({ payload }) {
  try {
      const { data } = yield call(() => 
          axios.post(
              "http://localhost:8080/api/decisionappeal/",
              payload,
              {
                headers: {
                  'Content-Type': 'application/xml',
                  'Authorization': `Bearer ${getItem('token')}`
                }        
              }
          )
      )
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data,"text/xml");
      yield put(addDecisionAppeal(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")[0]  ))
  } catch(error) {
      console.log(error)
  }
}
  
export function* abortAppeal({payload}){
  try{
    yield call(()=> axios.delete(
      `http://localhost:8080/api/decisionappeal/${payload}`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
  } catch(error) {
    if(error.response.status === 400) {
      yield put(setError("Can't abort this appeal, you already received rescript!"))
    }
  }
}

export function* search({payload}) {
    try {
      const {data} = yield call(()=> axios.get(
      `http://localhost:8080/api/decisionappeal/search/${payload}`,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(data,"text/xml");
    
    const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
    yield put(setDecisionAppeal(list))
  } catch(error) {
    console.log(error)
  }
}

export function* filter({payload}) {
  try {
    const {data} = yield call(()=> axios.post(
    `http://localhost:8080/api/decisionappeal/meta/search/`,
    payload,
      {
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
    const parser = new DOMParser();

    const xmlDoc = parser.parseFromString(data,"text/xml");
    const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.zalbanaodluku.com", "ZalbaRoot")) 
    yield put(setDecisionAppeal(list))
  } catch(error) {
    console.log(error)
  }
}

export function* forwardAppeal({payload}) {
  try {
    yield call(()=> axios.get(
    `http://localhost:8080/api/decisionappeal/notify/${payload}`,
      {
        data: null,
        headers: {
          'Content-Type': 'application/xml',
          'Authorization': `Bearer ${getItem('token')}`
        }
      }
    ))
    
    yield put(getAll())
  } catch(error) {
    console.log(error)
  }
}

export default function* DecisionSaga() {
  yield takeLatest(GET_DECISION_APPEALS, getDecisionAppeal);
  yield takeLatest(CREATE_DECISION_APPEAL, createDecisionSaga);
  yield takeLatest(ABORT_APPEAL, abortAppeal);
  yield takeLatest(SEARCH, search);
  yield takeLatest(FILTER, filter);
  yield takeLatest(FORWARD_APPEAL, forwardAppeal);
}
