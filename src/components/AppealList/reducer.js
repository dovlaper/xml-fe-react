import produce from 'immer';
import { SET_ANSWER } from './actions';

export const initialState = {
  answer: null,
};

/* eslint-disable default-case */
const globalReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ANSWER:
        console.log("AAA", action.payload)
        draft.answer = action.payload 
        break;
    }
  });

export default globalReducer;
