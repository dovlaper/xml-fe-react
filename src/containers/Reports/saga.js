import { GET_REPORTS, SEARCH } from "./constants";
import { takeLatest, call, put } from 'redux-saga/effects';
import { setReports } from './actions';
import axios from 'axios';
import { getItem } from "../../utils/localStorage";

export function* getReports() {
    try {
        const { data }= yield call(() => 
          axios.get(
            `http://localhost:8080/api/report`, 
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
        const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.izvestaj.com", "IzvestajRoot")) 
        yield put(setReports(list))
    } catch (error) {
        console.log(error)
    }
  }

// export function* createSilenceSaga({ payload }) {
//   try {
//       const { data } = yield call(() => 
//           axios.post(
//               "http://localhost:8080/api/silenceappeal/",
//               payload,
//               {
//                   headers: {'Content-Type': 'application/xml'}
//               }
//           )
//       )
//       const parser = new DOMParser();

//         const xmlDoc = parser.parseFromString(data,"text/xml");
//       yield put(addSilenceAppeal(xmlDoc.getElementsByTagNameNS("http://www.zalbacutanje.com", "ZalbaCutanjeRoot")[0]))
//   } catch(error) {
//       console.log(error)
//   }
// }

// export function* download({ payload }) {
//   try {
//       yield call(() => 
//           axios.get(
//               `http://localhost:8080/api/silenceappeal/${payload.id}/generate?type=${payload.type}`,
//               {
//                   headers: {'Content-Type': 'application/xml'}
//               }
//           )
//       )
    
//   } catch(error) {
//       console.log(error)
//   }
// }

// export function* abortAppeal({payload}){
//   try{
//     yield call(()=> axios.delete(
//       `http://localhost:8080/api/silenceappeal/${payload}`,
//       {
//         headers: {
//           'Content-Type': 'application/xml',
//           'Authorization': `Bearer ${getItem('token')}`
//         }
//       }
//     ))
//   } catch(error) {
//     if(error.response.status === 400) {
//       yield put(setError("Can't abort this appeal, you already received rescript!"))
//     }
//   }
// }

export function* search({payload}) {
  try {
    const {data} = yield call(()=> axios.get(
    `http://localhost:8080/api/report/meta/search/${payload}`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Authorization': `Bearer ${getItem('token')}`
      }
    }
  ))
  const parser = new DOMParser();

  const xmlDoc = parser.parseFromString(data,"text/xml");
  
  const list = Array.from(xmlDoc.getElementsByTagNameNS("http://www.izvestaj.com", "IzvestajRoot")) 
  yield put(setReports(list))
} catch(error) {
  console.log(error)
}
}
export default function* silenceSaga() {
  yield takeLatest(GET_REPORTS, getReports);
  yield takeLatest(SEARCH, search);

}
  