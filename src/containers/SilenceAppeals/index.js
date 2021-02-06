import React, { useState } from 'react'
import CreateAppealModal from '../CitizenDashboard/CreateAppealModal';
import Silence from '../../components/Silence';
import { PageList, AddButtonIcon} from '../../shared/PageList';
import SearchInput from  '../../shared/SearchInput';
import Filter from '../../shared/SilenceAppealFilter';
import { getRole } from '../../utils/request';
import { useDispatch } from 'react-redux';
import { getSilenceAppeal, search, filter } from '../../components/Silence/actions';

const SilenceAppeals = () => {
    const [show, setShow] = useState(false)
    const close = () => setShow(false)

    const dispatch = useDispatch();
    const handleChange = (value) => {
        if (value) {
            dispatch(search(value))
        } else {
            dispatch(getSilenceAppeal())
        }
    }

    const isCommissioner = getRole() === "ROLE_COMMISSIONER"
    const handleFilter = (data) => {
      dispatch(filter(data))
  }
    return  (
      <>
        <PageList>
          <h2>Silence Appeals</h2>
          {isCommissioner && (
            <>
              <SearchInput onChange={handleChange}/>
              <Filter onSubmit={handleFilter}/>
            </>
          )}
          {getRole() === 'ROLE_CITIZEN' && (<AddButtonIcon onClick={() =>setShow(true)} />)}
        </PageList>

        <Silence style={{width:'50%', marginLeft: '25%'}}/>
        {show && (<CreateAppealModal show={show} close={close} />)}
      </>
    )
}

export default SilenceAppeals;