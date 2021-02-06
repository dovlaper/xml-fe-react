import React, { useRef, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { XmlEditor } from 'react-xml-editor';
import ContextAwareToggle from '../../shared/ContextAwareToggle';

import silenceAppealDocSpec from '../../constants/silenceAppealDocSpec';
import CreateRescriptModal from '../Rescript/CreateRescriptModal';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFromToken } from '../../utils/request';
import { useInjectSaga } from '../../utils/injectSaga';
import saga from '../Silence/saga';

import HeaderOptionsCommissioner from './HeaderOptionsCommissioner';
import HeaderOptionsCitizen from './HeaderOptionsCitizen';
import decSaga from '../Decision/saga';
import silSaga from '../Silence/saga';
import globSaga from './saga';
import { getAnswer, setAnswer } from './actions';
import { forwardAppeal as silForward } from '../Silence/actions';
import { forwardAppeal as decForward } from '../Decision/actions';
import { useLocation } from 'react-router';
import { useInjectReducer } from '../../utils/injectReducer';
import globalReducer from './reducer';
import { makeSelectAnswer } from './selectors';
import AnswerModal from './AnswerModal'

const silenceKey = 'silence';
const decisionKey = 'decision';
const globalKey = 'global';

function AccordionHeaderOptions(shouldShow, rest){
    const [showModal, setShowModal] = useState(false);
    useInjectSaga({key: silenceKey, saga:silSaga})
    useInjectSaga({key: decisionKey, saga: decSaga})
    useInjectSaga({key: globalKey, saga: globSaga})
    useInjectReducer({key: globalKey, reducer: globalReducer})

    const { role } = getUserFromToken();
    const isCitizen = role === 'ROLE_CITIZEN';
    const route = useLocation().pathname === '/silenceappeal'
    const dispatch = useDispatch()
    const handleForwardRescript = () => {
        const action =route ? silForward : decForward;
        dispatch(action(rest.id))

    }

    const handleCheckForAnswer = () => {
        dispatch(getAnswer(rest.id))
    }
    const answer = useSelector(makeSelectAnswer())
    return (
        <span style={{margin: '10px'}}>
            {shouldShow && (
                <>
                    <HeaderOptionsCitizen id={rest.id} hideAbort={!isCitizen}/>
                    {!isCitizen &&
                        <HeaderOptionsCommissioner
                            createRescriptCb={() => setShowModal(true)}
                            forwardRescriptCb={handleForwardRescript}
                            isNotified={rest.isNotified}
                            checkForAnswer={handleCheckForAnswer}
                        />
                    }
                    <CreateRescriptModal
                        show={showModal}
                        close={() => setShowModal(false)}
                        {...rest}
                    />
                    <AnswerModal show={!!answer} close={() => dispatch(setAnswer(null))} answer={answer}/>
                </>
            )}
        </span>
)}

const AppealList = ({list}) => {
    const serializer = new XMLSerializer();
    const user = getUserFromToken()

    const itemEls = useRef(new Array())
    const [ xml, setXml] = useState('')
    const [current, setCurrent] = useState(null)
    const namespace = useLocation().pathname === '/silenceappeal' ? 'zalbacutanje' : 'zalbanaodluku';
    const tag = useLocation().pathname === `/silenceappeal` ? 'podnosilac_zalbe' : 'Podnosilac';

    return (
        <div style={{width: '50%', marginLeft: '25%'}}>
            {!!list.length && (
            <Accordion onSelect={(index)=>{setCurrent(index)}} >
                {list.map((xmlNode, index) => {

                    const submitter = xmlNode?.getElementsByTagNameNS(`http://www.${namespace}.com`, tag)[0]?.getAttribute('href');
                    const cardName = xmlNode.getAttribute('id') || `Zalba-${index}`;
                    const xmlString = serializer.serializeToString(xmlNode);
                    const appealHref = xmlNode?.getAttribute('about')
                    const isNotified = xmlNode?.getAttribute('obavestio') === "true";
                    return (
                        <Card key={index}>
                            <ContextAwareToggle
                                eventKey={cardName}
                                title={cardName}
                                appealHref={appealHref}
                                id={cardName}
                                commissionerHref={`http://users/${user?.email}`}
                                submitter={submitter}
                                isNotified={isNotified}
                            >
                                {AccordionHeaderOptions}
                            </ContextAwareToggle>
                            <Accordion.Collapse eventKey={cardName}>
                                <Card.Body>
                                    <XmlEditor
                                        docSpec={ silenceAppealDocSpec }
                                        ref={(element) => itemEls.current[cardName] = element}
                                        xml={ xmlString }
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                )})
                }
            </Accordion>)}
        </div>
    )
}

export default AppealList;