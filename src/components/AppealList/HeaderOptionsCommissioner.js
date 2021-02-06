import { Button } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';

const HeaderOptionsCommissioner = ({forwardRescriptCb, createRescriptCb, isNotified, checkForAnswer}) => {
    const route = useLocation().pathname;
    const showOptions = route === '/silenceappeal' || route === '/decisionappeal'
    return (
        <>
        {showOptions ? (
            <>
                {!isNotified && <Button onClick={forwardRescriptCb} variant="success">Forward to Official</Button>}
                {isNotified && <Button onClick={checkForAnswer} variant="primary" style={{margin: '10px'}}>Check for answer</Button>}
                {isNotified && <Button onClick={createRescriptCb} variant="info" style={{margin: '10px'}}>Create Rescript</Button>}   
            </>
        ) : null}
        </>
    );
}

export default HeaderOptionsCommissioner;