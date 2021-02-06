export const GET_ANSWER = 'GET_ANSWER';
export const SET_ANSWER = 'SET_ANSWER';

export const getAnswer = (payload) => ({
    type: GET_ANSWER,
    payload,
})

export const setAnswer = (payload) => ({
    type: SET_ANSWER,
    payload,
})