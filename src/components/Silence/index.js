import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Builder, XmlEditor } from 'react-xml-editor';
import silenceAppealDocSpec from '../../constants/silenceAppealDocSpec';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getSilenceAppeal } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSilence } from './selectors';

import styled from 'styled-components';
import AppealList from '../AppealList';
import { getRole } from '../../utils/request';
const key = 'silence';
const SilenceAppealWrapper = styled.div`
width: 100%;
`

const Silence = () => {
    const newXml = useSelector(makeSelectSilence())
    const ref = useRef()
    const dispatch = useDispatch();
    useInjectReducer({ key, reducer })
    useInjectSaga({ key, saga })
    useEffect(() => {
        const role = getRole();
        if (role === "ROLE_CITIZEN"){
            dispatch(getSilenceAppeal('all'))
        } else {
            dispatch(getSilenceAppeal())
        }
    }, [dispatch])

    return (
        <SilenceAppealWrapper>
            <AppealList ref={ref} list={newXml} />    
        </SilenceAppealWrapper>
    )
}

export default Silence;