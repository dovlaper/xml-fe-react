import { Button, Link, Menu, MenuItem } from '@material-ui/core';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AreYouSure from '../../shared/AreYouSure';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import silenceSaga from '../Silence/saga';
import silenceReducer from '../Silence/reducer';
import decisionSaga from '../Decision/saga';
import decisionReducer from '../Decision/reducer';
import {abortAppeal as silenceAbort} from '../Silence/actions';
import {abortAppeal as decisionAbort} from '../Decision/actions'; 

const silenceKey='silence';
const decisionKey='decision';

const HeaderOptionsCitizen = ({id, hideAbort}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [areYouSure, setAreYouSure] = useState(false);

    useInjectReducer({key: silenceKey, reducer: silenceReducer});
    useInjectSaga({key: silenceKey, saga: silenceSaga});
    useInjectReducer({key: decisionKey, reducer: decisionReducer});
    useInjectSaga({key: decisionKey, saga: decisionSaga});

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const route = useLocation().pathname;

    const dispatch = useDispatch()
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAbortAppeal = () => {
        setAreYouSure(true)
    }
    const action = route === '/silenceappeal' ? silenceAbort : decisionAbort;
    const showAbort = route !== '/rescript' && !hideAbort
    const handleAbort = () => {
        dispatch(action(id));
    }

    return (
        <>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Options
            </Button>
            {showAbort && (<Button color="secondary" onClick={handleAbortAppeal}>Abort Appeal</Button>)}
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/${id}/generate?type=pdf`}>Download PDF</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/${id}/generate?type=html`}>Download HTML</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/meta/json/${id}`}>Export Metadata JSON</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href={`http://localhost:8080/api${route}/meta/rdf/${id}`}>Export Metadata RDF</Link>
                    </MenuItem>
            </Menu>     
            {areYouSure && (<AreYouSure show={areYouSure} close={()=>setAreYouSure(false)} onSubmit={handleAbort} />)}
        </>
    );
}

export default HeaderOptionsCitizen;