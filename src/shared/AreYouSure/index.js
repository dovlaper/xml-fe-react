import { Button } from '@material-ui/core';
import { PregnantWoman } from '@material-ui/icons';
import React from 'react';
import BaseModal from '../ContextAwareToggle/BaseModal';

const AreYouSure = ({show, close, onSubmit}) => {

    const handleSubmit = () =>{
        onSubmit();
        close();
    }

    return (
            <BaseModal
                show={show}
                close={close}
                title={"Wait..."}
                buttonTitle={"Yes"}
                onSubmit={handleSubmit}
                closeButtonTitle={"Abort"}
                aditionalStyle={{marginTop: '300px'}}
            >
                <h1>Are you sure you want to abort?
                    {/* <PregnantWoman style={{fontSize:60}}></PregnantWoman> */}
                </h1>
            </BaseModal>
    )
}

export default AreYouSure;