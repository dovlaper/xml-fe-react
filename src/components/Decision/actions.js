import {
    GET_DECISION_APPEALS,
    SET_DECISION_APPEALS,
    CREATE_DECISION_APPEAL,
    ADD_DECISION_APPEAL,
    ABORT_APPEAL,
    SEARCH,
    SET_SEARCH,
    FILTER,
    SET_FILTER,
    FORWARD_APPEAL
} from "./constants";

export const getDecisionAppeal = (payload) => ({
    type: GET_DECISION_APPEALS,
    payload
})

export const setDecisionAppeal = (payload) => ({
    type: SET_DECISION_APPEALS,
    payload
})

export const createDecisionAppeal = payload => ({
    type: CREATE_DECISION_APPEAL,
    payload
})


export const addDecisionAppeal = payload => ({
    type: ADD_DECISION_APPEAL,
    payload
})

export const abortAppeal = payload => ({
    type: ABORT_APPEAL,
    payload
})

export const search = payload => ({
    type: SEARCH,
    payload
})

export const setSearch = payload => ({
    type: SET_SEARCH,
    payload
})

export const filter = payload => ({
    type: FILTER,
    payload
})

export const setFilter = payload => ({
    type: SET_FILTER,
    payload
})

export const forwardAppeal = payload => ({
    type: FORWARD_APPEAL,
    payload
})