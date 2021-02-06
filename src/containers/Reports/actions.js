import { GET_REPORTS, SET_REPORTS, SEARCH, SET_SEARCH } from "./constants";

export const getReports = () => ({
    type: GET_REPORTS,
})

export const setReports = (payload) => ({
    type: SET_REPORTS,
    payload,
})

export const search = payload => ({
    type: SEARCH,
    payload
})

export const setSearch = payload => ({
    type: SET_SEARCH,
    payload
})