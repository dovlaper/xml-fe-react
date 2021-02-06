import React, {useState, useRef, useMemo, forwardRef} from 'react';
import silenceAppealDocSpec, { xmlString as silenceXML} from '../../constants/silenceAppealDocSpec';
import decisionAppealDocSpec, {xmlString as decisionXML} from '../../constants/decisionAppealDocSpec';
import BaseModal from '../../shared/ContextAwareToggle/BaseModal';
import { FormControlLabel, Radio, RadioGroup, TextField, withStyles } from '@material-ui/core';
import { Builder, XmlEditor } from 'react-xml-editor';
import { green } from '@material-ui/core/colors';
import { getUserFromToken } from '../../utils/request';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import silenceSaga from '../../components/Silence/saga';
import decisionSaga from '../../components/Decision/saga';
import silenceReducer from '../../components/Silence/reducer';
import decisionReducer from '../../components/Decision/reducer';
import { createDecisionAppeal } from '../../components/Decision/actions';
import { createSilenceAppeal } from '../../components/Silence/actions';
import { useDispatch } from 'react-redux';

const silence_key = 'silence';
const decision_key = 'decision';

const GreenRadio = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  
const CreateAppealModal = ({show, close }) => {
    const [appealType, setAppealType] = useState('silence');
    const [submitter, setSubmitter] = useState('individual');
    const [requestId, setRequestId] = useState('');
    const isSilence = appealType === 'silence';
    const ref = useRef();
    
    const dispatch = useDispatch();
    useInjectReducer({ key: silence_key, reducer: silenceReducer })
    useInjectReducer({ key: decision_key, reducer: decisionReducer })
    useInjectSaga({ key: silence_key, saga: silenceSaga })
    useInjectSaga({ key: decision_key, saga: decisionSaga })


    const handleCreateAppeal = () => {
        if (ref.current) {
            const builder = new Builder({});
            const xml = ref.current.getXml();
            if (xml) {
                const action = !isSilence ? createDecisionAppeal : createSilenceAppeal
                dispatch(action(builder.buildObject(xml)))
            }
            close();
        }
    }

    const citizenId = useMemo(() => getUserFromToken()?.email)

    const XmlComponent = forwardRef((props, ref)=>{
        const docSpec = isSilence ? silenceAppealDocSpec : decisionAppealDocSpec
        return isSilence ? (
            <XmlEditor
                mode={'laic'}
                docSpec={ docSpec }
                xml={ silenceXML(requestId, citizenId) }
                ref={ref}
            />) : (
            <XmlEditor
                mode={'laic'}
                docSpec={ docSpec }
                xml={ decisionXML(submitter, requestId, citizenId) }
                ref={ref}
            />
            )
    })

    const handleTypeChange = e => setAppealType(e.target.value)
    const handleSubmitterChange = e => setSubmitter(e.target.value)
    return (
        <BaseModal
            show={show}
            close={close}
            title={"Create appeal"}
            buttonTitle={"Create"}
            onSubmit={handleCreateAppeal}
        >

            <div style={{display: 'inline-flex'}}>
            <TextField
                style={{margin: '20px'}}
                id="outlined-basic"
                label="Request ID"
                variant="outlined"
                value={requestId}
                onChange={e => setRequestId(e.target.value)}
            />
            <RadioGroup aria-label="silence" name="silence1" value={appealType} onChange={handleTypeChange}>
                <FormControlLabel value="silence" control={<Radio />} label="Silence Appeal" />
                <FormControlLabel value="decision" control={<Radio />} label="Decision Appeal" />
            </RadioGroup>
            {!isSilence && (<RadioGroup aria-label="type" name="type" value={submitter} onChange={handleSubmitterChange}>
                <FormControlLabel value="individual" control={<GreenRadio />} label="Individual" />
                <FormControlLabel value="legalEntity" control={<GreenRadio />} label="Legal Entity" />
            </RadioGroup>)}

            </div>

            <XmlComponent ref={ref}/>
        </BaseModal>
    )
}

export default CreateAppealModal;