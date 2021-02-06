import {
    GET_SILENCE_APPEALS,
    SET_SILENCE_APPEALS,
    CREATE_SILENCE_APPEAL,
    ADD_SILENCE_APPEAL,
    DOWNLOAD,
    ABORT_APPEAL,
    SEARCH,
    SET_SEARCH,
    FORWARD_APPEAL,
    FILTER,
    SET_FILTER,
} from "./constants";

export const getSilenceAppeal = (payload) => ({
    type: GET_SILENCE_APPEALS,
    payload
})

export const setSilenceAppeal = (payload) => ({
    type: SET_SILENCE_APPEALS,
    payload
})

export const createSilenceAppeal = payload => ({
    type: CREATE_SILENCE_APPEAL,
    payload
})

export const addSilenceAppeal = payload => ({
    type: ADD_SILENCE_APPEAL,
    payload
})

export const download = payload => ({
    type: DOWNLOAD,
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

export const forwardAppeal = payload => ({
    type: FORWARD_APPEAL,
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