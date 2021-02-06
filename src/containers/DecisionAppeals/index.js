import React, { useState } from 'react'
import Decision from '../../components/Decision';
import CreateAppealModal from '../CitizenDashboard/CreateAppealModal';
import { AddButtonIcon, PageList } from '../../shared/PageList';
import { getRole } from '../../utils/request';
import SearchInput from '../../shared/SearchInput';
import Filter from '../../shared/DecisionAppealFilter';
import { useDispatch } from 'react-redux';
import { getDecisionAppeal, search, filter } from '../../components/Decision/actions';

const DecisionAppeals = () => {

    const [show, setShow] = useState(false)
    const close = () => setShow(false)
    const dispatch = useDispatch();
    const handleChange = (value) => {
        if (value) {
            dispatch(search(value))
        } else {
            dispatch(getDecisionAppeal())
        }
    }
    const handleFilterSubmit = (data) => {
        dispatch(filter(data))
    }
    const isCommissioner = getRole() === "ROLE_COMMISSIONER";
    return  (
        <>
          <PageList>
            <h2>Decision Appeals</h2>
            {isCommissioner && (<>
              <Filter onSubmit={handleFilterSubmit}/>
              <SearchInput onChange={handleChange}/>
            </>)}
            {getRole() === 'ROLE_CITIZEN' && (<AddButtonIcon onClick={() =>setShow(true)} />)}
          </PageList>
          <Decision style={{width:'50%', marginLeft: '25%'}}/>
          {show && (<CreateAppealModal show={show} close={close} />)}
        </>
      )
}

export default DecisionAppeals;