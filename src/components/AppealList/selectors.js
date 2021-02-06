import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectAnswer = () =>
    createSelector(
        selectGlobal,
        substate => substate.answer
  );

export { makeSelectAnswer };
